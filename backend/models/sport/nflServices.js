const axios = require("axios");

const league = require("./leagueService");
const standingsScraper = require("../../scraper/standingsScrape");
const gameScraper = require("../../scraper/scheduleScrape");
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

  async getGamesData() {
    return await gameScraper.scrapeGames('nfl', '');
  }
  async getStandingsData() {
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

getScrapedHeadlines(code){
  return teamScraper.getHeadlines("nfl", code).then((result) => {
    return result;
  });
}

sportCode() {
  return "NFL";
}

}

exports.NflService = NflService;
