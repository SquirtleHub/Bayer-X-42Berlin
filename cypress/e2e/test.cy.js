/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   test.cy.js                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sazzeddi <sazzeddi@student.42berlin.de>    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/07/26 13:38:07 by sazzeddi          #+#    #+#             */
/*   Updated: 2023/07/26 13:40:10 by sazzeddi         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

//to test the google search functionality
describe('Google Search', () => {
    it('can find search results', () => {
      cy.visit('https://google.com') //visit google.com
      cy.get('#L2AGLb > .QS5gu').click(); //accept cookies
      cy.get('#APjFqb').type('42berlin.de{enter}') //search for 42berlin.de
      cy.get('[href="https://42berlin.de/"] > .LC20lb').click() //click on the first result
    })
  }
    )