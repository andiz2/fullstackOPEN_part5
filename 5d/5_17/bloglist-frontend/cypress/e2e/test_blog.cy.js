describe('Blog app', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3004')
  })
  //5.17
  it('Login form is shown', function() {
    cy.contains('log in')
  })
  //5.18
  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('log in').click()
      cy.get('input:first').type('')
      cy.get('input:last').type('')
      cy.contains('login').click()
    })

    it('fails with wrong credentials', function() {
      cy.contains('log in').click()
      cy.get('input:first').type('')
      cy.get('input:last').type('')
    })
  })
  //5.19
  describe('When logged in', function() {
    beforeEach(function() {
      cy.contains('log in').click()
      cy.get('input:first').type('')
      cy.get('input:last').type('')
      cy.contains('login').click()
    })

    it('A blog can be created', function() {
      cy.contains('new blog')
      cy.contains('new blog').click()
      cy.get('form>div>input').eq(0).type('zumba blo')
      cy.get('form>div>input').eq(1).type('bs')
      cy.get('form>div>input').eq(2).type('www.com')
      cy.contains('create').click()
    })
  })
  //cypress commands
  describe('when logged in cypress commands', function() {
  beforeEach(function() {

    cy.login({ username: '', password: '' })
  })

  it('a new note can be created', function() {
    cy.createBlog({title: 'harsi command', author: 'cuine', url: "cubul"})
  })

  // ...
})
})

