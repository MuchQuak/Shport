const nbaServices = require("../models/sport/nbaServices");
let nba = new nbaServices.NbaService("https://data.nba.net");

async function getGames(req, res) {
   const offset_param = String(req.params['offset']).trim();
   try {
      const games = await nba.getGames(offset_param);
      res.send(games);
   } catch(error) {
      console.log(`ERROR nba.controllers.getGames: ${error}`);
      res.json(500)
      res.send()
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
   } catch (error) {
      console.log(`ERROR nba.controllers.getStandings: ${error}`);
      res.json(500)
      res.send()
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
   } catch (error) {
      console.log(`ERROR nba.controllers.getPlayers: ${error}`);
      res.json(500)
      res.send()
   }
}

async function getScrapedPlayers(req, res) {
   try {
      await nba.getScrapedPlayers(req.params["id"]).then((result) => {
         res.send(result);
      });
   } catch(error) {
      console.log(`ERROR nba.controllers.getScrapedPlayers: ${error}`);
      res.status(500)
      res.send();
   }
}

async function getPlayerInjuries (req, res) {
   try {
    await nba.getScrapedInjuries(req.params["id"]).then((result) => {
      res.send(result);
  });
   } catch(error) {
      res.status(500)
      res.send();
      console.log(`ERROR nba.controllers.getScrapedInjuries: ${error}`);
   }
}

async function getTopPlayers(req, res) {
   try {
    await nba.getScrapedTopPlayers(req.params["id"]).then((result) => {
      res.send(result);
  });
   }catch(error) {
      console.log(`ERROR nba.controllers.getTopPlayers: ${error}`);
      res.status(500)
      res.send();
   }
}
async function getPlayerTransactions(req, res) {
   try {
    await nba.getScrapedTransactions(req.params["id"]).then((result) => {
      res.send(result);
  });
   } catch(error) { 
      console.log(`ERROR nba.controllers.getPlayerTransactions: ${error}`);
      res.status(500)
      res.send();
   }
}

async function getHeadlines(req, res) {
   try{
  await nba.getScrapedHeadlines(req.params["id"]).then((result) => {
    res.send(result);
  });
   } catch(error) {
      console.log(`ERROR nba.controllers.getHeadlines: ${error}`);
      res.status(500)
      res.send();
   }
}

exports.getGames = getGames;
exports.getStandings = getStandings;
exports.getPlayers = getPlayers;
exports.getScrapedPlayers = getScrapedPlayers;
exports.getPlayerInjuries = getPlayerInjuries;
exports.getTopPlayers = getTopPlayers;
exports.getPlayerTransactions = getPlayerTransactions;
exports.getHeadlines = getHeadlines;
