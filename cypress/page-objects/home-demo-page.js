export class HomeDemoPage {
  title () {
    return cy.get('body > div.header')
  }

  englishArticleLink () {
    return cy.get('div > a[href="./articles/english.html"]')
  }
  
  hindiArticleLink () {
    return cy.get('div > a[href="./articles/hindi.html"]')
  }

  frenchArticleLink () {
    return cy.get('div > a[href="./articles/french.html"]')
  }

  spanishArticleLink () {
    return cy.get('div > a[href="./articles/spanish.html"]')
  }

  swahiliArticleLink () {
    return cy.get('div > a[href="./articles/swahili.html"]')
  }

  hebrewArticleLink () {
    return cy.get('div > a[href="./articles/hebrew.html"]')
  }
  
}
