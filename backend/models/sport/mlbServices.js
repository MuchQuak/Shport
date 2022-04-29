const axios = require("axios");

const league = require("./leagueService");
const sportScraper = require("../../scraper/standingsScrape");
const teamScraper = require("../../scraper/teamExpansionScrape");

class MlbService extends league.LeagueService {
  constructor(host) {
    super(host);
  }

  formatDate(date) {
    //Function for formatting date if different from standard format in leagueServices
  }

  getGamesEndPoint(currentDate) {
    //example: return this.host + '/api/v1/schedule?date=' + currentDate;
  }
  getStandingsEndPoint() {
    //example: return this.host + '/api/v1/standings';
  }

  getStandingsScrape() {
    return sportScraper.getMlbSportStanding().then((result) => {
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

  formatGamesData(responseData, date) {}

  formatStandingsData(responseData) {}
}

exports.MlbService = MlbService;
