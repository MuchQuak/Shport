const leagues = require("../sport/leagueService");
const axios = require("axios");

test("TESTING: leagueServices Constructor", () => {
  let leageueConst = new leagues.LeagueService("API endpoint");

  expect(leageueConst).toStrictEqual(new leagues.LeagueService("API endpoint"));
});

test("TESTING: leagueServices host (endpoint)", () => {
  let leageueConst = new leagues.LeagueService("API endpoint");

  expect(leageueConst.host).toStrictEqual("API endpoint");
});

test("TESTING: leagueServices EST To UTC", () => {
  let leageueConst = new leagues.LeagueService("API endpoint");
  let testESTDate = "1:30 PM";

  let testUTCHour = 18; // Military time
  let testUTCmin = 30;
  let t = new Date();
  let testDate = new Date(
    Date.UTC(
      t.getUTCFullYear(),
      t.getUTCMonth(),
      t.getUTCDay(),
      testUTCHour,
      testUTCmin,
      0
    )
  );

  expect(leageueConst.ESTtoUTC(testESTDate)).toStrictEqual(testDate);
});

test("TESTING: getGamesData --- ERROR", async () => {
  let leageueConst = new leagues.LeagueService("API endpoint");
  const date = new Date("December 17, 1995 03:24:00");

  await expect(async () => {
    await leageueConst.getGamesData();
  }).rejects.toThrow(/Abstract Method has no implementation/);
});

test("TESTING: getStandingsData --- ERROR", async () => {
  let leageueConst = new leagues.LeagueService("API endpoint");

  await expect(async () => {
    await leageueConst.getStandingsData();
  }).rejects.toThrow(/Abstract Method has no implementation/);
});

test("TESTING: formatDate", async () => {
  let leageueConst = new leagues.LeagueService("API endpoint");
  const date = new Date("December 25, 2015 07:28:00");

  const dateString = "20151225";

  const formattedDate = leageueConst.formatDate(date);
  expect(formattedDate).toStrictEqual(dateString);
});

test("TESTING: getPlayersEndPoint --- ERROR", async () => {
  let leageueConst = new leagues.LeagueService("API endpoint");

  await expect(async () => {
    await leageueConst.getPlayersEndPoint();
  }).rejects.toThrow(/Abstract Method has no implementation/);
});

test("TESTING: sportCode --- ERROR", async () => {
  let leageueConst = new leagues.LeagueService("API endpoint");

  await expect(async () => {
    await leageueConst.sportCode();
  }).rejects.toThrow(/Abstract Method has no implementation/);
});