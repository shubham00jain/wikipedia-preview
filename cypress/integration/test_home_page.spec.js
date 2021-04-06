/// <reference types="cypress" />

describe('Test home page', () => {
    beforeEach(() => {

        cy.navigateToDemoHomePage()
        // or use this to test locally => cy.visit('http://0.0.0.0:8080/')
    })
  
    // checks the heading of the demo home page
    it('check heading', () => {
      cy.contains('.header', 'Wikipedia Preview demo')
    })

    // checks the body of the demo home page
    it('check body', ()=>{
          
      cy.get('.listview').each( (item) =>{

        cy
          .wrap(item)
          .get('.item')
          .should('have.class', 'item')
          .get('a')
          .should('have.attr', 'href')
          .get('.image')
          .get('.title')
          .get('.subtitle')
          .get('.content')
      } )
          
    })

    // checks the footer of the demo home page
    it('check footer', () => {
        cy.contains('.footer', 'Articles on this list are from Wikipedia, which is released under the Creative Commons Attribution-Share-Alike License 3.0. ')

       cy.contains('View Source')
        .should('have.attr', 'href')
        .and('include', 'https://github.com/wikimedia/wikipedia-preview')
      })

})