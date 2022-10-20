const Standings = require('./standings');
const Games = require('./games');

const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

let dbConnection;

function getDbConnection() {
    if (!dbConnection) {
      dbConnection = mongoose.createConnection(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }
    return dbConnection;
  }

  function setConnection(newConn) {
    dbConnection = newConn;
    return dbConnection;
  }


async function getCachedGames(sport) {
    const gamesModel = getDbConnection().model("gameCache", Games.schema);
    
    try {
      const gameData = await gamesModel.findOne({sport: String(sport).trim().toUpperCase()});
      return gameData.games;
    } catch (error) {
      console.log(error);
      return false;
    }
}

function createGameCachingSchedule(games) {
   const today = new Date(Date.now());
   for(let g of games) {
      const game_date = new Date(Date.parse(g.startTimeUTC));
      if(g.status !== 2 && game_date.getDate() === today.getDate() 
         && game_date.getFullYear() === today.getFullYear()) {


         //console.log(g)
         console.log(new Date(g.startTimeUTC).getUTCHours() - today.getUTCHours());
         //console.log(`scheduled ${g.home_code} vs ${g.away_code} starting at ${g.startTimeUTC}`)
         //Problem:
         //scraping pages when information has't changed
         //Solution: scrape page when information is going to change
         //- Create list of games that info will change aka games playing today
         //- Order the list chronologically
         //- Schedule scraping updates at when each game starts
         //- When a game starts add it to a live scraping schedule updating
         //  more frequently until the games ends
         //
         //Research:
         //- Look into one time cron schedules or irregular scheduling
         //
         //Mini Solution:
         //- make a cron schedule for each game that starts the difference
         //  between the current time and the game start time then kill the
         //  schedule after running it once
      }
   }
}

async function cacheGames(sport, games) {
    const gamesModel = getDbConnection().model("gameCache", Games.schema);
    //createGameCachingSchedule(games);
    try {
        const SPORT = String(sport).trim().toUpperCase()
        return await gamesModel.updateOne(
            { sport: SPORT },
            { sport: SPORT, games: games }, 
            { upsert : true },);

    } catch (error) {
      console.log(error);
      return false;
    }
}

async function getCachedStandings(sport) {
  const standingsModel = getDbConnection().model("standingsCache", Standings.schema);
  try {
    const standingsData = await standingsModel
         .findOne({sport: String(sport)
         .trim().toUpperCase()});
    return standingsData.standings;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function cacheStandings(sport, standings) {
    const standingsModel = getDbConnection().model("standingsCache", Standings.schema);
    try {
        const SPORT = String(sport).trim().toUpperCase()
        return await standingsModel.updateOne(
            { sport: SPORT },
            { sport: SPORT, standings: standings }, 
            { upsert : true },);

    } catch (error) {
      console.log(error);
      return false;
    }
}
exports.cacheGames = cacheGames;
exports.getCachedGames = getCachedGames;
exports.getCachedStandings = getCachedStandings;
exports.cacheStandings = cacheStandings;
exports.setConnection = setConnection;
