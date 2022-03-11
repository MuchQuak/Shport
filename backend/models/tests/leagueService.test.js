const leagues = require('../leagueService');
const axios = require("axios");


test('TESTING: leagueServices Constructor', () => {
  let leageueConst = new leagues.LeagueService("API endpoint");

  expect(leageueConst).toStrictEqual(new leagues.LeagueService("API endpoint"));
  });

test('TESTING: leagueServices host (endpoint)', () => {
  let leageueConst = new leagues.LeagueService("API endpoint");

  expect(leageueConst.host).toStrictEqual("API endpoint");
  });

test('TESTING: leagueServices EST To UTC', () => {
    let leageueConst = new leagues.LeagueService("API endpoint");
    let testESTDate = "1:30 PM";

    let testUTCHour = 18; // Military time
    let testUTCmin = 30;
    let t = new Date();
    let testDate = new Date(Date.UTC(t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDay(), testUTCHour, testUTCmin, 0));

    expect(leageueConst.ESTtoUTC(testESTDate)).toStrictEqual(testDate);
    });
