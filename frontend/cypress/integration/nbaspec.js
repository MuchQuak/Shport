

// nbaspec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test


const cy = require("cypress");

describe('NBA have all teams', () => {
    it('Check that the NBA have all teams', () => {
        let teams = 25;
        cy.visit("https://shport-backend.herokuapp.com/sport/NBA");
    });
})