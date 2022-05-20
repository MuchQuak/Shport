// npx cypress open
import 'cypress-react-selector';

describe('End to End Login Test', () => {
    context('SUCCESSFUL login', ()=> {
        it('GIVEN I navigate to the login page', ()=>{
            cy.visit('https://shport-frontend.herokuapp.com/login');
            cy.waitForReact(1000,'#root');
        })
        it('WHEN I enter a valid username and password and submit the form', ()=>{
            cy.intercept({
                url: 'https://shport-backend.herokuapp.com/login',
                method: 'POST'
            }).as('loginUser');
        
            cy.get('form').within( ()=> {
                cy.get('input[type="username"]').type("aa");
                cy.get('input[type="password"]').type("1");
                cy.contains('Login').click();
            });
            cy.wait('@loginUser');
            cy.getCookie('auth_token').should('have.property', 'value');
        });
        it('THEN I am logged in and see my username', ()=>{
            cy.get('.nomargin.dropdown:last').click()
            cy.contains('Hello, aa');
        });
    })
  });