Cypress.Cookies.defaults({
    preserve: 'auth_token',
  })
  
describe('End to End Login Test', () => {
    let username = "dd";
    let password = "44";
    let email = "dd@gmail.com";
    context('SUCCESSFUL Signup', ()=> {
        it('GIVEN I navigate to the signup page', ()=>{
            cy.visit('https://shport-frontend.herokuapp.com/signup');
        })
        it('WHEN I enter a valid username, valid email and valid password and submit the sign up form', ()=>{
            cy.intercept({
                url: 'https://shport-backend.herokuapp.com/signup',
                method: 'POST'
            }).as('signUpUser');
        
            cy.get('form').within( ()=> {
                cy.get('input[type="text"]').type(username);
                cy.get('input[type="email"]').type(email);
                cy.get('input[type="password"]').type(password);
                cy.contains('Sign Up').click();
            });
            cy.wait('@signUpUser');
        });
        it('THEN I can login with that username and password from the form', ()=>{
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

            cy.getCookie('auth_token').should('exist');
        });
    });
});