const axios = require("axios");

const league = require("./leagueService");
const standingsScraper = require("../../scraper/standingsScrape");
const teamScraper = require("../../scraper/teamExpansionScrape");
class NflService extends league.LeagueService {
  constructor(host) {
    super(host);
  }

  /*
  formatDate(date) {
    //Function for formatting date if different from standard format in leagueServices
  }
  */

  async getGamesEndPoint(currentDate) {
    //example: return this.host + '/api/v1/schedule?date=' + currentDate;
  }
  async getStandingsEndPoint() {
    return await standingsScraper.getNflSportStanding();
  }

  getStandingsScrape() {
    return standingsScraper.getNflSportStanding().then((result) => {
      return result;
    });
  }

  getScrapedPlayers(code){
    return teamScraper.getRoster("nfl", code).then((result) => {
      return result;
    });
  }
  getScrapedInjuries(code){
    return teamScraper.getInjuries("nfl", code).then((result) => {
      return result;
    });
  }

getScrapedTopPlayers(code){
  return teamScraper.getTopPlayers("nfl", code).then((result) => {
    return result;
  });
}

getScrapedTransactions(code){
  return teamScraper.getTransactions("nfl", code).then((result) => {
    return result;
  });
}

  formatGamesData(responseData, date) {}

  formatStandingsData(responseData) {}
}

exports.NflService = NflService;
