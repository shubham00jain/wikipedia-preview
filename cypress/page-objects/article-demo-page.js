export class ArticleDemoPage {
    title () {
      return cy.get('div.title')
    }

    image () {
        return cy.get('div.cover')
    }    

    closeButton () {
      return cy.get('div.close-btn')
    }

    previewEnabledWordByIndex (index) {
      return cy.get('.wmf-wp-with-preview').eq(index)
    }
  }
  