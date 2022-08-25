describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.createUser({ name:'test', username: 'test', password: 'test' })
        cy.visit('http://localhost:3000')
    })


    it('Login form is shown', function() {
        cy.get('#loginForm').should('contain','username').and('contain','password')
    })

    describe('Login',function() {

        it('succeeds with correct credentials', function() {
            cy.login({ username: 'test', password: 'test' })
            cy.get('html').should('contain', 'User test logged in')
        })

        it('fails with wrong credentials', function() {
            cy.get('#username').type('test')
            cy.get('#password').type('wrong')
            cy.get('#loginForm').get('button').click()
            cy.get('html').should('not.contain', 'User test logged in')
            //bonus ex
            cy.get('.error-not').should('contain', 'invalid username or password')
                .and('have.css', 'color', 'rgb(255, 0, 0)')
                .and('have.css', 'border-style', 'solid')
        })
    })

    describe('When logged in', function() {
        beforeEach(function() {
            cy.login({ username: 'test', password: 'test' })
        })

        it('A blog can be created', function() {
            cy.get('#create-button').click()
            cy.get('#input-title').type('title test')
            cy.get('#input-author').type('author test')
            cy.get('#input-url').type('url test')
            cy.get('#add-blog').click()

            cy.get('body').should('contain','title test author test')

        })
        describe('And there is 1 blog', function() {
            beforeEach(function () {
                cy.createBlog({ title: 'title', author:'author', url:'url' })
            })
            it('A user can like a blog', function() {
                cy.get('body').should('contain','title author')
                cy.contains('title author').parent().find('button').contains('info').click()
                cy.contains('Likes').should('contain','0')
                cy.contains('Likes').parent().find('input').click()
                cy.contains('Likes').should('contain','1')

            })

            it('The creator of the blog can delete it', function(){
                cy.get('body').should('contain','title author')
                cy.contains('title author').parent().find('button').contains('info').click()
                cy.contains('title author').parent().find('#deleteButton').click()
                cy.get('body').should('not.contain','title author')

            })

            it('Remove button shows disabled to other users', function(){
                cy.createUser({ name:'test_remove', username:'test_remove', password: 'test_remove' })
                cy.contains('User test').parent().find('#logout-button').click()
                cy.login({ username:'test_remove', password:'test_remove' })
                cy.get('body').should('contain','title author')
                cy.contains('title author').parent().find('button').contains('info').click()
                cy.contains('title author').parent().find('#deleteButton').should('be.disabled')
            })
        })

        describe.only('And a there are 3 blog', function() {
            beforeEach(function () {
                cy.createBlog({ title: 'title', author:'author', url:'url', likes:99 })
                cy.createBlog({ title: 'title2', author:'author2', url:'url2', likes:10  })
                cy.createBlog({ title: 'title3', author:'author3', url:'url3', likes:100  })
            })

            it('Blogs are ordered from most liked to least liked', function() {
                cy.get('.Blog').eq(0).should('contain', 'Likes 100')
                cy.get('.Blog').eq(1).should('contain', 'Likes 99')
                cy.get('.Blog').eq(2).should('contain', 'Likes 10')
            })
        })

    })

})