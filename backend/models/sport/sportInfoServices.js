const mongoose = require("mongoose");
const sports = require("./sportSchema");
const dotenv = require("dotenv");
dotenv.config();
let dbConnection;

function getDbConnection() {
  const url = process.env.MONGODB_URI;
  if (!dbConnection) {
    dbConnection = mongoose.createConnection(url, {
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

async function getSports() {
  const sportModel = getDbConnection().model("sport", sports.schema);
  try {
    return sportModel.find();
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function getSport(sport) {
  const sportModel = getDbConnection().model("sport", sports.schema);
  try {
    return sportModel.findOne({ sport: String(sport).trim().toUpperCase() });
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function getTeams(sport) {
  try {
    const sportModel = await getSport(sport);

    if (sportModel) {
      return sportModel.teams;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

exports.getSports = getSports;
exports.getSport = getSport;
exports.getTeams = getTeams;
exports.setConnection = setConnection;
