const nflServices = require("../models/sport/nflServices");
let nfl = new nflServices.NflService("");

async function getGames(req, res) {
   const offset_param = String(req.params['offset']).trim();
   try {
      const games = await nfl.getGames(offset_param);
      res.send(games);
   } catch(error) {
      console.log(`ERROR nfl.controllers.getGames: ${error}`);
      res.json(500)
      res.send()
   }
}

async function getStandings(req, res) {
   await nfl.getStandings(req, res);
   const id = req.params["id"];
   try {
      const standings = await nfl.getStandings(req, res); 
      if (id === undefined) {
         res.send(standings);
      } else {
         res.send(standings[id]);
      }
   } catch (error) {
      console.log(`ERROR nfl.controllers.getStandings: ${error}`);
      res.json(500)
      res.send()
   }
}

async function getPlayers(req, res) {
   const id = req.params["id"];
   try {
      const players = await nfl.getPlayers(req, res);
      if (id === undefined) {
         res.send(players);
      } else {
         res.send(players.find((player) => player["personId"] === id));
      }
   } catch (error) {
      console.log(`ERROR nfl.controllers.getPlayers: ${error}`);
      res.json(500)
      res.send()
   }
}

async function getScrapedPlayers(req, res) {
   try {
   res.send({});
   } catch(error) {
      console.log(`ERROR nfl.controllers.getScrapedPlayers: ${error}`);
      res.json(500)
      res.send()
   }
}

async function getPlayerInjuries (req, res) {
   try {
   await nfl.getScrapedInjuries(req.params["id"]).then((result) => {
      res.send(result);
   });
   }catch(error) {
      console.log(`ERROR nfl.controllers.getPlayerInjuries: ${error}`);
      res.json(500)
      res.send()
   }
}

async function getTopPlayers(req, res) {
   try {
   await nfl.getScrapedTopPlayers(req.params["id"]).then((result) => {
      res.send(result);
   });
   }catch(error) {
      console.log(`ERROR nfl.controllers.getTopPlayers: ${error}`);
      res.json(500)
      res.send()
   }
}
async function getPlayerTransactions(req, res) {
   try {
   await nfl.getScrapedTransactions(req.params["id"]).then((result) => {
      res.send(result);
   });
   } catch(error) {
      console.log(`ERROR nfl.controllers.getScrapedTransactions: ${error}`);
      res.json(500)
      res.send()
   }
}

async function getHeadlines(req, res) {
   try {
   await nfl.getScrapedHeadlines(req.params["id"]).then((result) => {
      res.send(result);
   });
   }catch(error) {
      console.log(`ERROR nfl.controllers.getHeadlines: ${error}`);
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
