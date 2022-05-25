describe('End to End Login Test', () => {
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
                cy.get('input[type="text"]').type("aa");
                cy.get('input[type="email"]').type("aa@gmail.com");
                cy.get('input[type="password"]').type("1");
                cy.contains('Sign Up').click();
            });

            cy.wait('@signUpUser');
        });
    })
  });