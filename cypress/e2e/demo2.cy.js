import 'cypress-iframe';

describe('Automated Test for Vulnerable Web App', () => {
  beforeEach(() => {
    // Step 1: Visit the site
    cy.visit('https://app-web-berlin42-50e7ace7d4d7.herokuapp.com/');

    // Step 2: Click on the first button
    cy.get(':nth-child(1) > a').click();

    // Step 3: Change "Hello world!" to "Reflected" in the URL
    cy.url().then((url) => {
      const modifiedURL = url.replace('Hello%20world!', 'Reflected');
      cy.visit(modifiedURL);
    });

    // Step 4: Verify that "test" is shown on the page
    cy.contains('Reflected').should('be.visible');
  });

  it('should execute a Reflected XSS payload', () => {
    // Step 5: Defining the payload and URL
    const payload = '<script>alert("XSS Vulnerability!");</script>';
    const vulnerableURL = 'https://app-web-berlin42-50e7ace7d4d7.herokuapp.com/reflected_xss';
    const encodedPayload = encodeURIComponent(payload);

    // Intercept the "window:message" event to log the alert message and perform the assertion
    cy.on('window:message', (e) => {
      if (e.data) {
        cy.log(`Alert message: ${e.data}`);
        cy.contains('XSS Vulnerability!').should('be.visible');
      }
    });

    // Step 6: Visit the vulnerable URL with the encoded payload
    cy.visit(`${vulnerableURL}?foobar=${encodedPayload}`);
  });
});
