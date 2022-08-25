Cypress.Commands.add('login', ({ username, password }) => {
    cy.request('POST', 'http://localhost:3003/api/login', {
        username, password
    }).then(({ body }) => {
        localStorage.setItem('LoggedUser', JSON.stringify(body))
        cy.visit('http://localhost:3000')
    })
})

Cypress.Commands.add('createBlog', ({ title, author, url, likes }) => {
    cy.request({
        url: 'http://localhost:3003/api/blogs',
        method: 'POST',
        body: { title, author, url, likes },
        headers: {
            'Authorization': `bearer ${JSON.parse(localStorage.getItem('LoggedUser')).token}`
        }
    })

    cy.visit('http://localhost:3000')
})

Cypress.Commands.add('createUser', ({ name, username, password }) => {
    cy.request('POST', 'http://localhost:3003/api/users', { name, username, password })
})
