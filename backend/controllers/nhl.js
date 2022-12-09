const nhlServices = require("../models/sport/nhlServices");
let nhl = new nhlServices.NhlService("https://statsapi.web.nhl.com");

async function getGames(req, res) {
   const offset_param = String(req.params['offset']).trim();
   try {
      const games = await nhl.getGames(offset_param);
      res.send(games);
   } catch(error) {
      console.log(`ERROR nhl.controllers.getGames: ${error}`);
      res.json(500)
      res.send()
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
   } catch (error) {
      console.log(`ERROR nhl.controllers.getStandings: ${error}`);
      res.json(500)
      res.send()
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
   } catch (error) {
      console.log(`ERROR nba.controllers.getPlayers: ${error}`);
      res.json(500)
      res.send()
   }
}

async function getScrapedPlayers(req, res) {
   //Move this down to scraper level
   try {
      res.send({});
   } catch (error) {
      console.log(`ERROR nba.controllers.getScrapedPlayers: ${error}`);
      res.json(500)
      res.send()
   }
}

async function getPlayerInjuries (req, res) {
   try {
      await nhl.getScrapedInjuries(req.params["id"]).then((result) => {
         res.send(result);
      });
   }catch(error) {
      console.log(`ERROR nba.controllers.getPlayerInjuries: ${error}`);
      res.json(500)
      res.send()
   }
}

async function getTopPlayers(req, res) {
   try {
      await nhl.getScrapedTopPlayers(req.params["id"]).then((result) => {
         res.send(result);
      });
   }catch(error) {
      console.log(`ERROR nba.controllers.getTopPlayers: ${error}`);
      res.json(500)
      res.send()
   }
}
async function getPlayerTransactions(req, res) {
   try {
      await nhl.getScrapedTransactions(req.params["id"]).then((result) => {
         res.send(result);
      });
   }catch(error) {
      console.log(`ERROR nba.controllers.getPlayerTransactions: ${error}`);
      res.json(500)
      res.send()
   }
}

async function getHeadlines(req, res) {
   try{
      await nhl.getScrapedHeadlines(req.params["id"]).then((result) => {
         res.send(result);
      });
   }catch(error) {
      console.log(`ERROR nba.controllers.getHeadlines: ${error}`);
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
