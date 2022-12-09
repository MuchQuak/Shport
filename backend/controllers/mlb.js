const mlbServices = require("../models/sport/mlbServices");
let mlb = new mlbServices.MlbService("");

async function getGames(req, res) {
   const offset_param = String(req.params['offset']).trim();
   try {
      const games = await mlb.getGames(offset_param);
      res.send(games);
   } catch(error) {
      console.log(`ERROR mlb.controllers.getGames: ${error}`);
      res.json(500)
      res.send()
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
   } catch (error) {
      console.log(`ERROR mlb.controllers.getStandings: ${error}`);
      res.json(500)
      res.send()
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
   } catch (error) {
      console.log(`ERROR mlb.controllers.getPlayers: ${error}`);
      res.json(500)
      res.send()
   }
}

async function getScrapedPlayers(req, res) {
   //Move this down to scraper level
   try {
      res.send({});
   } catch(error) {
      console.log(`ERROR mlb.controllers.getScrapedPlayers: ${error}`);
      res.json(500)
      res.send()
   }
}

async function getPlayerInjuries (req, res) {
   try {
      await mlb.getScrapedInjuries(req.params["id"]).then((result) => {
         res.send(result);
      });
   }catch(error) { 
      console.log(`ERROR mlb.controllers.getPlayerInjuries: ${error}`);
      res.json(500)
      res.send()
   }
}

async function getTopPlayers(req, res) {
   try {
      await mlb.getScrapedTopPlayers(req.params["id"]).then((result) => {
         res.send(result);
      });
   }catch(error) {
      console.log(`ERROR mlb.controllers.getTopPlayers: ${error}`);
      res.json(500)
      res.send()
   }
}
async function getPlayerTransactions(req, res) {
   try {
      await mlb.getScrapedTransactions(req.params["id"]).then((result) => {
         res.send(result);
      });
   }catch(error) {
      console.log(`ERROR mlb.controllers.getPlayerTransactions: ${error}`);
      res.json(500)
      res.send()
   }
}

async function getHeadlines(req, res) {
   try {
      await mlb.getScrapedHeadlines(req.params["id"]).then((result) => {
         res.send(result);
      });
   }catch(error) {
      console.log(`ERROR mlb.controllers.getHeadlines: ${error}`);
      res.json(500)
      res.send()
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
