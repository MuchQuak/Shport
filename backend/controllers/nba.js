const nbaServices = require("../models/sport/nbaServices");
let nba = new nbaServices.NbaService("https://data.nba.net");

async function getGames(req, res) {
   const offset_param = String(req.params['offset']).trim();
   try {
      const games = await nba.getGames(offset_param);
      res.send(games);
   } catch(e) {
      res.json(500)
      res.send()
      console.error(e);
   }
}

async function getStandings(req, res) {
   await nba.getStandings(req, res);
   const id = req.params["id"];
   try {
      const standings = await nba.getStandings(req, res); 
      if (id === undefined) {
         res.send(standings);
      } else {
         res.send(standings[id]);
      }
   } catch (e) {
      res.json(500)
      res.send()
      console.error(e);
   }
}

async function getPlayers(req, res) {
   const id = req.params["id"];
   try {
      const players = await nba.getPlayers(req, res);
      if (id === undefined) {
         res.send(players);
      } else {
         res.send(players.find((player) => player["personId"] === id));
      }
   } catch (e) {
      res.json(500)
      res.send()
      console.error(e);
   }
}

async function getScrapedPlayers(req, res) {
   await nba.getScrapedPlayers(req.params["id"]).then((result) => {
      res.send(result);
   });
}

async function getPlayerInjuries (req, res) {
    await nba.getScrapedInjuries(req.params["id"]).then((result) => {
      res.send(result);
  });
}

async function getTopPlayers(req, res) {
    await nba.getScrapedTopPlayers(req.params["id"]).then((result) => {
      res.send(result);
  });
}
async function getPlayerTransactions(req, res) {
    await nba.getScrapedTransactions(req.params["id"]).then((result) => {
      res.send(result);
  });
}

async function getHeadlines(req, res) {
  await nba.getScrapedHeadlines(req.params["id"]).then((result) => {
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
