const nhlServices = require("../models/sport/nhlServices");
let nhl = new nhlServices.NhlService("https://statsapi.web.nhl.com");

async function getGames(req, res) {
      const offset_param = String(req.params['offset']).trim();
      try {
         const games = await nhl.getGames(offset_param);
        res.send(games);
      } catch(e) {
        console.error(e);
    }
}

async function getStandings(req, res) {
   await nhl.getStandings(req, res);
   const id = req.params["id"];
   try {
      const standings = await nhl.getStandings(req, res); 
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
      const players = await nhl.getPlayers(req, res);
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
    await nhl.getScrapedInjuries(req.params["id"]).then((result) => {
      res.send(result);
  });
}

async function getTopPlayers(req, res) {
    await nhl.getScrapedTopPlayers(req.params["id"]).then((result) => {
      res.send(result);
  });
}
async function getPlayerTransactions(req, res) {
    await nhl.getScrapedTransactions(req.params["id"]).then((result) => {
      res.send(result);
  });
}

async function getHeadlines(req, res) {
  await nhl.getScrapedHeadlines(req.params["id"]).then((result) => {
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
