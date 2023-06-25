describe('Note app', function() {
	beforeEach(function() {
      cy.visit('http://localhost:3000')
      cy.contains('log in').click()
      cy.get('#username').type('mluukkai2')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
	  })

    describe('and a note exists', function () {
      it('user can add a note', function () {
        cy.contains('new note').click()
        cy.get('input').type('another note cypress')
        cy.contains('save').click()
      })
    })

})