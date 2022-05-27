// npx cypress open
Cypress.Cookies.defaults({
    preserve: 'auth_token',
  })

describe('End to End Login Test', () => {
    let username = "aa";
    let password = "1";
    context('UNSUCCESSFUL login', ()=> {
        it('GIVEN I navigate to the login page', ()=>{
            cy.visit('https://shport-frontend.herokuapp.com/login');
        })
        it('WHEN I enter a valid username and password and submit the form', ()=>{
            cy.intercept({
                url: 'https://shport-backend.herokuapp.com/login',
                method: 'POST'
            }).as('loginUser');
        
            cy.get('form').within( ()=> {
                cy.get('input[type="username"]').type(username + "invalid");
                cy.get('input[type="password"]').type(password + "invalid");
                cy.contains('Login').click();
            });
            cy.wait('@loginUser');
        });
        it('THEN I am told that my login was incorrect', ()=>{
            cy.get('.btn-close.btn-close-white.closeButton').click();
        
        });
        
    });


    context('SUCCESSFUL login', ()=> {
        it('GIVEN I navigate to the login page', ()=>{
            cy.visit('https://shport-frontend.herokuapp.com/login');
        })
        it('WHEN I enter a valid username and password and submit the form', ()=>{
            cy.intercept({
                url: 'https://shport-backend.herokuapp.com/login',
                method: 'POST'
            }).as('loginUser');
        
            cy.get('form').within( ()=> {
                cy.get('input[type="username"]').type(username);
                cy.get('input[type="password"]').type(password);
                cy.contains('Login').click();
            });
            cy.wait('@loginUser');
        });
        it('THEN I am logged in and see my username', ()=>{
            cy.get('.nomargin.dropdown:last').click()
            cy.contains('Hello, aa');
        });
        it('THEN I can see my settings and add the Lakers', ()=>{
            cy.contains('Settings').click();
            cy.get('input[spellcheck=false]').type("lakers");
            cy.contains("Los Angeles Lakers").click();
        });
        it('THEN I can also remove the Lakers', ()=>{
            cy.get('.remove-button').click();
        });
        it('THEN I can save my settings and go to home page', ()=>{
            cy.contains("Save Changes").click();
            cy.contains("Done").click();

        });
        it('THEN I can Log out', ()=>{
            cy.get('.nomargin.dropdown:last').click()
            cy.contains("Sign Out").click();

        });
    })
});