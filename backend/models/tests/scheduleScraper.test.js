const axios = require("axios");
const fs = require('fs');
const scheduleScrapper = require("../../scraper/scheduleScrape");

jest.mock('axios');

test("TESTING: Games", async () => {  
  axios.get.mockResolvedValue({ data: fs.readFileSync("./models/tests/html_tests/scheduleExample.html") });

  let scrapedSchedule= await scheduleScrapper.scrapeGames("mlb", "");

  scrapedSchedule.forEach((e) => {
    expect(e).toHaveProperty("status");
    expect(e).toHaveProperty("clock");
    expect(e).toHaveProperty("halftime");
    expect(e).toHaveProperty("arena");
    expect(e).toHaveProperty("currentQtr");
    expect(e).toHaveProperty("maxQtr");
    expect(e).toHaveProperty("away");
    expect(e).toHaveProperty("away_code");
    expect(e).toHaveProperty("away_record");
    expect(e).toHaveProperty("away_score");
    expect(e).toHaveProperty("home");
    expect(e).toHaveProperty("home_code");
    expect(e).toHaveProperty("home_record");
    expect(e).toHaveProperty("home_score");
    expect(e).toHaveProperty("startTimeUTC");
    expect(e).toHaveProperty("date");
    expect(e).toHaveProperty("gId");
  })

});

test("TESTING: Live Game with GID", async () => {  
  let liveData = {
    away: "",
    home: "",
    clock: "",
    status: 1
}
  axios.get.mockResolvedValue({ data: fs.readFileSync("./models/tests/html_tests/scheduleExample.html") });

  let scrapedGame = await scheduleScrapper.scrapeLiveGameData("mlb", "401354937");
  expect(scrapedGame).toStrictEqual(liveData);

});

test("TESTING: Live Game with no GID", async () => {  
  let liveData = {
    away: "0",
    home: "0",
    clock: "",
    status: ""
}
  axios.get.mockResolvedValue({ data: fs.readFileSync("./models/tests/html_tests/scheduleExample.html") });

  let scrapedGame = await scheduleScrapper.scrapeLiveGameData("mlb");
  expect(scrapedGame).toStrictEqual(liveData);

});
test("TESTING: GameId Parsing", async () => {  
  let parsedGameId = "401354937";

  let functionGameId = await scheduleScrapper.parsingGameId("/mlb/game?gameId=401354937");
  expect(parsedGameId).toStrictEqual(functionGameId);

});
