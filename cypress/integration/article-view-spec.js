/// <reference types="Cypress" />


const homeDemoPage = new HomeDemoPage()
const articleDemoPage = new ArticleDemoPage()

describe('Article view', () => {
  beforeEach(() => {
    cy.navigateToDemoHomePage()
  })

  it('change article language', () => {
    goToCatArticle()
    articlePage.selectOptionFromActionsMenu('languages')
    cy.get('input').type('português')
    cy.get('.description').should('have.text', 'Gato')
    cy.downArrow().enter()
    articlePage.title().should('have.text', 'Gato')
  })

})
