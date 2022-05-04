const axios = require("axios");

const league = require("./leagueService");
const standingsScraper = require("../../scraper/standingsScrape");
const gameScraper = require("../../scraper/scheduleScrape");
const teamScraper = require("../../scraper/teamExpansionScrape");

class MlbService extends league.LeagueService {
  constructor(host) {
    super(host);
  }

  formatDate(date) {
    //Function for formatting date if different from standard format in leagueServices
  }

  async getGamesEndPoint(currentDate) {
    //Alter to user currentDate
    return await gameScraper.scrapeGames('mlb');
  }

  async getStandingsEndPoint() {
    return await standingsScraper.getMlbSportStanding();
  }

  async getStandingsScrape() {
    return standingsScraper.getMlbSportStanding().then((result) => {
      return result;
    });
  }

  getScrapedPlayers(code){
    return teamScraper.getRoster("mlb", code).then((result) => {
      return result;
    });
  }

  getScrapedInjuries(code){
    return teamScraper.getInjuries("mlb", code).then((result) => {
      return result;
    });
  }

  getScrapedTopPlayers(code){
    return teamScraper.getTopPlayers("mlb", code).then((result) => {
      return result;
    });
  }
  
  getScrapedTransactions(code){
    return teamScraper.getTransactions("mlb", code).then((result) => {
      return result;
    });
  }
}

exports.MlbService = MlbService;