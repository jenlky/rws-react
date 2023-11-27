describe('Localhost search NPM registry component', () => {
  // by right one e2e flow is enough but currently i'm doing progressive testing for greater clarity
  it('should be able to visit the page', () => {
    cy.visit('http://localhost:3000/')
  })

  it('clicks submit button and error message should pop up', () => {
    cy.visit('http://localhost:3000/')
    cy.get('#submit-btn').click()
    cy.get('div').contains("No npm packages were found!")
    cy.get('a').should('not.exist')
    cy.get('#pagination').should('not.exist')
  })

  it('types in valid text, clicks submit, results and pages should show up', () => {
    cy.visit('http://localhost:3000/')
    cy.get('input').type('axios')
    cy.get('#submit-btn').click()
    cy.get('a').contains('axios')
    cy.get('#pagination')
  })

  // provided one page has 10 results
  it('types in valid text, clicks submit, goes to page 2', () => {
    cy.visit('http://localhost:3000/')
    cy.get('input').type('axios')
    cy.get('#submit-btn').click()
    cy.get(`[aria-label='Go to page 2']`).click()
    cy.get('a').contains('vue-axios')
  })

  it('searches for valid npm and routes to next page for simple package', () => {
    cy.visit('http://localhost:3000/')
    cy.get('input').type('axios')
    cy.get('#submit-btn').click()
    cy.get('a').contains('axios').click()
    cy.url().should('eq', 'http://localhost:3000/package/axios')
    cy.get('.package-name').should('have.text', 'axios')
  })

  it('searches for valid npm and routes to next page for special character name package' , () => {
    cy.visit('http://localhost:3000/')
    cy.get('input').type('axios')
    cy.get('#submit-btn').click()
    cy.get('a').contains('@nestjs/axios').click()
    cy.url().should('eq', 'http://localhost:3000/package/@nestjs/axios')
    cy.get('.package-name').should('have.text', '@nestjs/axios')
  })
})