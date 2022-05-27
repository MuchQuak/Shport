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


const gamesSchema = new mongoose.Schema(
    {
      sport: {
        type: String,
        required: true,
        trim: true,
      },
      games: [],
    },
    {
      collection: "gameCache",
    }
);

const standingsSchema = new mongoose.Schema(
    {
      sport: {
        type: String,
        required: true,
        trim: true,
      },
      standings: {},
    },
    {
      collection: "standingsCache",
    }
  );

async function getCachedGames(sport) {
    const gamesModel = getDbConnection().model("gameCache", gamesSchema);
    try {
      const gameData = await gamesModel.findOne({sport: String(sport).trim().toUpperCase()});
      return gameData.games;
    } catch (error) {
      console.log(error);
      return false;
    }
}

async function cacheGames(sport, games) {
    const gamesModel = getDbConnection().model("gameCache", gamesSchema);
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
  const standingsModel = getDbConnection().model("standingsCache", standingsSchema);
  try {
    const standingsData = await standingsModel.findOne({sport: String(sport).trim().toUpperCase()});
    return standingsData.standings;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function cacheStandings(sport, standings) {
    const standingsModel = getDbConnection().model("standingsCache", standingsSchema);
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