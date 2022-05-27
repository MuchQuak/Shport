const axios = require("axios");

const league = require("./leagueService");
const standingsScraper = require("../../scraper/standingsScrape");
const gameScraper = require("../../scraper/scheduleScrape");
const teamScraper = require("../../scraper/teamExpansionScrape");

class MlbService extends league.LeagueService {
  constructor(host) {
    super(host);
  }

  async getGamesData() {
    //YYYYMMDD
    const previous = new Date();
    previous.setDate(previous.getDate() - 1);
    
    return await gameScraper.scrapeGames('mlb', this.formatDate(previous));
  }

  async getStandingsData() {
    return await standingsScraper.getMlbSportStanding();
  }

  async getStandingsScrape() {
    return await standingsScraper.getMlbSportStanding().then((result) => {
      return result;
    });
  }

  formatGameData(games) {
    for(let i = 0; i < games.length; i++) {
      games[i].startTimeUTC
    }
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

  getScrapedHeadlines(code){
    return teamScraper.getHeadlines("mlb", code).then((result) => {
      return result;
    });
  }
  sportCode() {
    return "MLB";
  }
}

exports.MlbService = MlbService;