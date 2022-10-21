const Standings = require('./standings');
const Games = require('./games');
const schedule = require('node-schedule');

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

function createGameCachingSchedule(games, sport_service) {
   const today = new Date(Date.now());
   for(let g of games) {
      const game_date = new Date(Date.parse(g.startTimeUTC));
      if(g.status !== 2 && game_date.getDate() === today.getDate() 
         && game_date.getFullYear() === today.getFullYear()) {

         const game_date = new Date(g.startTimeUTC);
         const rule = new schedule.RecurrenceRule();
         rule.recurs = false;
         rule.hour = game_date.getUTCHours();
         rule.minute = game_date.getUTCMinutes();
         rule.month = game_date.getUTCMonth();
         rule.year = game_date.getUTCFullYear();
         rule.date = game_date.getUTCDate();
         rule.tz = 'Etc/UTC';

         console.log(`Scheduled ${sport_service.sportCode()} ${g.away} @ ${g.home} for ${game_date.getHours()}:${game_date.getMinutes()}`)

         schedule.scheduleJob(rule, function(){
            console.log(`Cached ${sport_service.sportCode()} ${g.away} @ ${g.home} Data at: ${new Date()}`)
            sport_service.cacheAllData();
         });
      }
   }
}

async function cacheGames(sport, games) {
    const gamesModel = getDbConnection().model("gameCache", Games.schema);
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

exports.createGameCachingSchedule = createGameCachingSchedule;
exports.cacheGames = cacheGames;
exports.getCachedGames = getCachedGames;
exports.getCachedStandings = getCachedStandings;
exports.cacheStandings = cacheStandings;
exports.setConnection = setConnection;
