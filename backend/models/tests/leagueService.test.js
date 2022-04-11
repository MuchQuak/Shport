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

test("TESTING: getGamesEndPoint --- ERROR", async () => {
  let leageueConst = new leagues.LeagueService("API endpoint");
  const date = new Date("December 17, 1995 03:24:00");

  await expect(async () => {
    await leageueConst.getGamesEndPoint(date);
  }).rejects.toThrow(/Abstract Method has no implementation/);
});

test("TESTING: getStandingsEndPoint --- ERROR", async () => {
  let leageueConst = new leagues.LeagueService("API endpoint");

  await expect(async () => {
    await leageueConst.getStandingsEndPoint();
  }).rejects.toThrow(/Abstract Method has no implementation/);
});

test("TESTING: formatDate", async () => {
  let leageueConst = new leagues.LeagueService("API endpoint");
  const date = new Date("December 25, 2015 07:28:00");

  const dateString = "20151225";

  const formattedDate = leageueConst.formatDate(date);
  expect(formattedDate).toStrictEqual(dateString);
});

test("TESTING: formatGameData", async () => {
  let leageueConst = new leagues.LeagueService("API endpoint");
  const date = new Date("December 25, 2015 07:28:00");
  let responseData = {
    game: 1,
  };

  expect(() => {
    leageueConst.formatGamesData(responseData, date);
  }).toThrow(/Abstract Method has no implementation/);
});

test("TESTING: formatStandingsData", async () => {
  let leageueConst = new leagues.LeagueService("API endpoint");
  let responseData = {
    game: 5,
  };

  expect(() => {
    leageueConst.formatStandingsData(responseData);
  }).toThrow(/Abstract Method has no implementation/);
});
