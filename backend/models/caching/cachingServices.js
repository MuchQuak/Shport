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

function createGameCachingSchedule(games, sport_service, live_games) {
   const today = new Date(Date.now());
   const LIVE = 1;
   const ENDED = 2;

   var scheduled_games = [];
   for(let g of games) {
      const game_date = new Date(Date.parse(g.startTimeUTC));
      if(g.status === LIVE) {
         live_games.push(g);
      }
      else if(g.status !== ENDED && game_date.getDate() === today.getDate() 
         && game_date.getFullYear() === today.getFullYear()) {

         const rule = new schedule.RecurrenceRule();
         scheduled_games.push(g);
         rule.second = 0;         
         rule.hour = game_date.getHours();
         rule.minute = game_date.getMinutes();
         rule.month = game_date.getMonth();
         rule.year = game_date.getFullYear();
         rule.date = game_date.getDate();

         console.log(`Scheduled ${sport_service.sportCode()} ${g.away} @ ${g.home} for ${game_date.getHours()}:${game_date.getMinutes()}`)

         schedule.scheduleJob(rule, function(){
            console.log(`Cached ${sport_service.sportCode()} ${g.away} @ ${g.home} Data at: ${new Date()}`)
            sport_service.cacheAllData(live_games);
         });
      }
   }

   return scheduled_games;
}

async function updateLiveGame(game) {
   const gamesModel = getDbConnection().model("gameCache", Games.schema);

   try {
      gamesModel.updateOne({sport: 'nhl'})
   } catch (err) {
      console.log(error);
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
