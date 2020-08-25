
import 'cypress-wait-until'
import 'cypress-localstorage-commands'


Cypress.Commands.add('navigateToHomeDemoPage', () => {
    cy.visit('/')
  })

Cypress.Commands.add('navigateToEnglishDemoPage', () => {
    cy.visit('/')
})