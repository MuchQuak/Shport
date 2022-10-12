const mlbServices = require("../models/sport/mlbServices");
let mlb = new mlbServices.MlbService("");

async function getGames(req, res) {
      const offset_param = String(req.params['offset']).trim();
      try {
         const games = await mlb.getGames(offset_param);
        res.send(games);
      } catch(e) {
        console.error(e);
    }
}

async function getStandings(req, res) {
   await mlb.getStandings(req, res);
   const id = req.params["id"];
   try {
      const standings = await mlb.getStandings(req, res); 
      if (id === undefined) {
         res.send(standings);
      } else {
         res.send(standings[id]);
      }
   } catch (e) {
      console.error(e);
   }
}

async function getPlayers(req, res) {
   const id = req.params["id"];
    try {
      const players = await mlb.getPlayers(req, res);
      if (id === undefined) {
        res.send(players);
      } else {
        res.send(players.find((player) => player["personId"] === id));
      }
    } catch (e) {
      console.error(e);
    }
}

async function getScrapedPlayers(req, res) {
   //Move this down to scraper level
  res.send({});
}

async function getPlayerInjuries (req, res) {
    await mlb.getScrapedInjuries(req.params["id"]).then((result) => {
      res.send(result);
  });
}

async function getTopPlayers(req, res) {
    await mlb.getScrapedTopPlayers(req.params["id"]).then((result) => {
      res.send(result);
  });
}
async function getPlayerTransactions(req, res) {
    await mlb.getScrapedTransactions(req.params["id"]).then((result) => {
      res.send(result);
  });
}

async function getHeadlines(req, res) {
  await mlb.getScrapedHeadlines(req.params["id"]).then((result) => {
    res.send(result);
  });
}

exports.getGames = getGames;
exports.getStandings = getStandings;
exports.getPlayers = getPlayers;
exports.getScrapedPlayers = getScrapedPlayers;
exports.getPlayerInjuries = getPlayerInjuries;
exports.getTopPlayers = getTopPlayers;
exports.getPlayerTransactions = getPlayerTransactions;
exports.getHeadlines = getHeadlines;
