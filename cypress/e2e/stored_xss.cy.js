/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   stored_xss.cy.js                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sazzeddi <sazzeddi@student.42berlin.de>    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/07/26 13:38:03 by sazzeddi          #+#    #+#             */
/*   Updated: 2023/08/27 13:08:19 by sazzeddi         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

describe('Automated Test for Vulnerable Web App', () => {
    beforeEach(() => {
      // Step 1: Visit the site
      cy.visit('https://app-web-berlin42-50e7ace7d4d7.herokuapp.com/');
  
      // Step 2: Click on the 4th link
      cy.get(':nth-child(4) > a').click();
  
      // Step 3: Interact with the input field and type text
      const inputText = 'i can hook the browser :)';
      cy.get('[name="stored_payload"]').type(inputText); // Replace "blabla" with the correct inputText
      cy.get('[type="submit"]').click();
  
      // Step 4: Verify that "test" is shown on the page
      cy.contains('i can hook the browser :)').should('be.visible');
    });
  
    it('should execute a Reflected XSS payload', () => {
    });
  });
  