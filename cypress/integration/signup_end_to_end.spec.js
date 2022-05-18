// npx cypress open

describe('End to End Signup Test', () => {
    it('Signs Up a User', () => {
      cy.visit('https://shport-frontend.herokuapp.com/signup')
          .get(".username").type("testUser123")
          .get(".email").type("testUser123@gmail.com")
          .get(".password").type("epicPassword123")
          .get(".signup-button").click();
    });
    cy.intercept({
        url: 'https://shport-backend.herokuapp.com/users/',
        method: 'POST'
    }).as('signup');
    cy.wait('@signup')
        .its('response.statusCode').should('equal', 200);
  });