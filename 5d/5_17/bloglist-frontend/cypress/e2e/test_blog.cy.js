describe('Blog app', function() {
  beforeEach(function() {
    cy.request('GET', 'http://localhost:3003/api/blogs')
    .then(response => {
    	expect(response.body).to.have.property('title', 'facem bine, cand?')
    })
    cy.visit('http://localhost:3004')
  })

  it('Login form is shown', function() {
    cy.contains('log in').click()
  })
})