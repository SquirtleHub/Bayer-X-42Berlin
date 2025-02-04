import 'cypress-iframe';

describe('Automated Test for Vulnerable Web App', () => {
  beforeEach(() => {
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

    // Visit the vulnerable URL with the encoded payload
    cy.visit(`${vulnerableURL}?foobar=${encodedPayload}`);
  });

  it('should execute a Reflected XSS payload', () => {
    // The actual test is empty, as the assertion is handled by the window:message event
  });
});
