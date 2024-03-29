const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer-core');
const games = require('../models/caching/games');
const util = require("../utility")

function PSTtoUTC(time) {
    const timeParts = time.split(' ');

    if(timeParts.length < 2) {
        return time;
    }

    const pmAm = timeParts[1];
    const newtime = timeParts[0].split(':');
    const offset = pmAm[0] === 'A' ? 0 : 12;
    const hour = parseInt(newtime[0]) + 8 + offset;
    const min = parseInt(newtime[1]);
    const t = new Date();
    return new Date(Date.UTC(t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDay(), hour, min, 0));
}

function isDateToday(date) {
    const otherDate = new Date(date);
    const todayDate = new Date();
  
    if (
      otherDate.getDate() === todayDate.getDate() &&
      otherDate.getMonth() === todayDate.getMonth() &&
      otherDate.getYear() === todayDate.getYear()
    ) {
      return true;
    } else {
      return false;
    }
  }

function parseTeam(hrefString) {
    if(hrefString === undefined) {
        return "";
    }

    //Gets City TeamName out of Href
    let delimited = hrefString.split('/');
    let teamCode = delimited[5];

    delimited = (delimited[delimited.length -1]).split('-');

    //Join and Capatilize team name
    let result = "";
    for(let i = 0; i < delimited.length; i++) {
        delimited[i] = capatilize(delimited[i]);

        if(i === 0)
            result = delimited[i];
        else
            result += " " + delimited[i];
    }
    return { name: result, code: teamCode };
}

function parseFinalScore(scoreText) {
    //Format: HomeTag HomeScore, AwayTag AwayScore
    //Example MIL 4, PIT 2

    let gameScore = {
        away: '0',
        home: '0'
    }

    if(scoreText === "Postponed") {
        return gameScore;
    }

    const home = 0, away = 1, score = 1;
    let delimited = scoreText.split(', ');

    if(delimited.length < 2 || delimited === '') {
        return gameScore;
    }

    gameScore.home = delimited[home].split(' ')[score];
    gameScore.away = delimited[away].split(' ')[score];

    return gameScore;
}

function parsingGameId(hrefString) {
    if(hrefString === undefined) {
        return "";
    }

    let delimited = hrefString.split('=');

    if(delimited.length > 1) {
        return delimited[1];
    }

    delimited = hrefString.split('/');

    if(delimited.length > 1) {

        return delimited[delimited.length - 1];
    }

    return "";
}

function capatilize(str) {
    if(str.length > 1) {
        return str[0].toUpperCase() + str.slice(1);
    }
    return str.toUpperCase();
}

function splitTimeParts(time_string) {
   if(time_string === undefined)
      return time_string;

   const time_parts = time_string.split('-');

   if(time_parts.length <= 1) {
      return time_string;
   }

   return {
      clock: time_parts[0].trim(),
      qtr: time_parts[1].trim()[0]
   }
}

//Causes Memory leak from listeners need to have one browser with multiple
//pages
async function getLiveGameHTML(game_url) {
   const browser = await puppeteer.launch();

   try {
      const page = await browser.newPage();

      await page.goto(game_url, {
         waitUntil: "load",
      });

      const html = await page.evaluate(() => {
         return document.documentElement.innerHTML
      })

      return html;

   } catch(error) {
      console.log(`ERROR scraper.scheduleScrape.getLiveGameHTML ${error}`)
      return false;

   } finally {
      browser.close();
   }
}

async function scrapeLiveGameData(sportCode, gId) {

   let liveData = {
      away: "0",
      home: "0",
      clock: "0",
      status: "",
      qtr: 0,
   }

   if(gId === undefined) {
      console.log('gId undefined');
      return liveData;
   }


   const game_url = `https://www.espn.com/${sportCode}/game/_/gameId/${gId}`;

   //const game_html = await getLiveGameHTML(game_url);

   let response = await axios.get(`https://www.espn.com/${sportCode}/game/_/gameId/${gId}`)

   let $ = cheerio.load(response.data);

   let teams = $('div.competitors');

   var away_score = teams.find('.team.away').find('.score.icon-font-after').text().trim();
   var home_score = teams.find('.team.home').find('.score.icon-font-before').text().trim();
   var clock = "";
   var qtr = 0;

   if(away_score === '' || home_score === '') {
      teams = $('.Gamestrip__Competitors');

      away_score = teams.find('.Gamestrip__Team--away .Gamestrip__Score').text().trim();
      home_score = teams.find('.Gamestrip__Team--home .Gamestrip__Score').text().trim();

      const game_time = splitTimeParts(
         teams.find('div.Gamestrip__Overview').find('div:first').text());

      clock = game_time.clock !== undefined ? game_time.clock: "0";
      qtr = parseInt(game_time.qtr !== undefined ? game_time.qtr: 0);
   }

   liveData.status = 1;    
   liveData.away = away_score;
   liveData.home = home_score;
   liveData.clock = clock;
   liveData.qtr = qtr;

   return liveData;
}

async function scrapeGames(sportCode, dateString) {
   //dateString expects YYYYMMDD

   //var response = await axios.get(`https://www.espn.com/${sportCode}/schedule`);
   var response = (dateString === "" ? 
      await axios.get(`https://www.espn.com/${sportCode}/schedule`) : 
      await axios.get(`https://www.espn.com/${sportCode}/schedule/_/date/${dateString}`));

   let $ = cheerio.load(response.data);
   var games = [];

   //Scrapes schedule Infromation
   var schedContainer = $(`.mt3 .ScheduleTables.mb5.ScheduleTables--${sportCode}`);

   if(schedContainer.length === 0) {
      schedContainer = $('#sched-container');
   }

   schedContainer.each((i, schedule) => {
      var date = new Date($(schedule).find('.Table__Title').text().trim());

      $(schedule).find('table tbody').find('tr').each((j, tr) => {
         let game = {
            status: 0,
            clock: "",
            halftime: "",
            arena: "",
            currentQtr: 0,
            maxQtr: "",
            away: "",
            away_code: "",
            away_score: "0",
            away_record: "",
            home: "",
            home_code: "",
            home_score: "0",
            home_record: "",
            startTimeUTC: "",
            date: "",
            gId: "",
         }

         game.date = date;

         //let aTeam = $(tr).find('.events__col.Table__TD').find('a');
         let aTeam = $(tr).find('td:first').find('a');

         //let hTeam = $(tr).find('.colspan__col.Table__TD').find('a');
         let hTeam = $(tr).find('td:nth-child(2)').find('a');

         if (aTeam.attr() === undefined) {
            game.away = 'TBA';
         } else {
            let team = parseTeam(aTeam.attr().href);
            game.away = team.name;
            game.away_code = team.code;
         }

         if (aTeam.attr() === undefined) {
            game.home = 'TBA';
         } else {
            let team = parseTeam(hTeam.attr().href);
            game.home = team.name;
            game.home_code = team.code;
         }

         //let dateElem = $(tr).find('.date__col.Table__TD');
         let dateElem = $(tr).find('td:nth-child(3)');
         let dateText = dateElem.find('a').text()

         //If game is finished get score
         if(dateElem !== undefined && dateText.split(" ").length > 2) {
            game.startTimeUTC = "Ended";

            let finalScore = parseFinalScore(dateText.trim());

            game.away_score = finalScore.away;
            game.home_score = finalScore.home;
            game.status = 2;

         } else {
            const startDate = dateElem.attr('data-date');

            if(startDate !== undefined) {
               game.startTimeUTC = new Date(startDate);
               game.date = new Date(startDate)
            }
            else {
               //Scrape Time is always in EST
               let startTime = util.ESTtoUTC(dateText.trim());

               if(startTime instanceof Date) {
                  startTime.setFullYear(date.getFullYear())
                  startTime.setMonth(date.getMonth())
                  startTime.setDate(date.getDate())
               }

               game.startTimeUTC = startTime;
            }
         }
         game.gId = parsingGameId(dateElem.find('a').attr('href'));
         
         games.push(game); 
      });
   });

   //Update game scores if game is live
   for(let i = 0; i < games.length; i++) {
      if(games[i].startTimeUTC === 'LIVE' || games[i].startTimeUTC === 'FT') {
         const liveData = await scrapeLiveGameData(sportCode, games[i].gId);
         games[i].away_score = liveData.away;
         games[i].home_score = liveData.home;
         games[i].clock = liveData.clock;
         games[i].status = liveData.status;
         games[i].date = new Date();
         games[i].currentQtr = liveData.qtr; 

      }
   }
   return games;
}

exports.scrapeGames = scrapeGames;
exports.scrapeLiveGameData = scrapeLiveGameData;
exports.parsingGameId = parsingGameId;
exports.PSTtoUTC = PSTtoUTC;
