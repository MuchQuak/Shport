// npx cypress open


describe('Visit Sport Information backend', () => {
    let teamLength = 30;
    
    it('Testing NBA teams with a GET', () => {
      cy.request({
        url: 'https://shport-backend.herokuapp.com/sport/NBA',
        followRedirect: false, // turn off following redirects
      }).then((resp) => {
        expect(resp.status).to.eq(200);
        expect(resp.body.sport).to.eq("NBA");
        expect(resp.body.teams.length).to.eq(teamLength);

        resp.body.teams.forEach(element => {
            expect(element).to.have.property("code")
            expect(element).to.have.property("city")
            expect(element).to.have.property("name")
            expect(element).to.have.property("espn")
            expect(element).to.have.property("subreddit")
        });

    });
})

    it('Testing NFL teams with a GET', () => {
        cy.request({
          url: 'https://shport-backend.herokuapp.com/sport/NFL',
          followRedirect: false, // turn off following redirects
        }).then((resp) => {
          expect(resp.status).to.eq(200)
          expect(resp.body.sport).to.eq("NFL");
          expect(resp.body.teams.length).to.eq(32);

          resp.body.teams.forEach(element => {
            expect(element).to.have.property("code")
            expect(element).to.have.property("city")
            expect(element).to.have.property("name")
            expect(element).to.have.property("espn")
        });

        });
    });

      it('Testing MLB teams with a GET', () => {
        cy.request({
          url: 'https://shport-backend.herokuapp.com/sport/MLB',
          followRedirect: false, // turn off following redirects
        }).then((resp) => {
          expect(resp.status).to.eq(200)
          expect(resp.body.sport).to.eq("MLB");
          expect(resp.body.teams.length).to.eq(teamLength);

          resp.body.teams.forEach(element => {
            expect(element).to.have.property("code")
            expect(element).to.have.property("city")
            expect(element).to.have.property("name")
            expect(element).to.have.property("espn")
        });
        });
    });

    it('Testing NHL teams with a GET', () => {
        cy.request({
          url: 'https://shport-backend.herokuapp.com/sport/NHL',
          followRedirect: false, // turn off following redirects
        }).then((resp) => {
          expect(resp.status).to.eq(200);
          expect(resp.body.sport).to.eq("NHL");
          expect(resp.body.teams.length).to.eq(32);

          resp.body.teams.forEach(element => {
            expect(element).to.have.property("code")
            expect(element).to.have.property("city")
            expect(element).to.have.property("name")
            expect(element).to.have.property("espn")
        });
        });
})
});

describe('Visit Sport Information backend', () => {
  it('Testing SUCCESS Login POST call', () => {
    cy.request({
      method: "POST", 
      url: 'https://shport-backend.herokuapp.com/login', 
      body:  {username: "aa" , password: "1" }}, 
   ).then((resp) => {
      expect(resp.status).to.eq(201);
    });
  });

  it('Testing FAILURE Login POST call', () => {
    cy.request({
      method: "POST", 
      url: 'https://shport-backend.herokuapp.com/login', 
      failOnStatusCode: false,
      body:  {username: "aa" , password: "123" }}, 
   ).then((resp) => {
      expect(resp.status).to.eq(401);
    });
  });
});