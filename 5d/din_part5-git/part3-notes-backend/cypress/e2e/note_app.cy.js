describe('Note app', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000')
  })
  it('front page can be opened', function() {
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2023')
  })

  it('login form can be opened', function() {
    cy.contains('log in').click()
  })
 it('login form can be opened', function() {
    cy.visit('http://localhost:3000')
    cy.contains('log in').click()
  })
 it('user can login', function () {
	  cy.contains('log in').click()
	  cy.get('input:first').type('mluukkai2')
	  cy.get('input:last').type('salainen')
  })  

 it('user can log in', function() {
    cy.contains('log in').click()
    cy.get('#username').type('mluukkai2')
    cy.get('#password').type('salainen')
    cy.get('#login-button').click()

    cy.contains('Matti Luukkainen logged in')
  })

 describe('when logged in', function() {
    // beforeEach(function() {
    //   cy.contains('log in').click()
    //   cy.get('input:first').type('mluukkai2')
    //   cy.get('input:last').type('salainen')
    //   cy.get('#login-button').click()
    // })

    // it('a new note can be created', function() {
    //   cy.contains('new note').click()
    //   cy.get('input').type('a note created by cypress')
    //   cy.contains('save').click()
    //   cy.contains('a note created by cypress')
    // })


    it('login fails with wrong password', function() {
	  cy.contains('log in').click()
	  cy.get('#username').type('mluukkai')
	  cy.get('#password').type('wrong')
	  cy.get('#login-button').click()

	  cy.get('.error')
	    .should('contain', 'wrong credentials')
	    .and('have.css', 'color', 'rgb(255, 0, 0)')
	    .and('have.css', 'border-style', 'solid')

	  cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
	})
  })
})

