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
   async getLiveGame(gId) {
      try {
         return await gameScraper.scrapeLiveGameData('nfl', gId);
      } catch(err) {
         console.log(err)
         return { away: "0", home: "0", clock: "", status: ""}
      }
   }

  async getGamesData(live_games) {
    return await gameScraper.scrapeGames('nfl', '', live_games);
  }
  async getStandingsData() {
    return await standingsScraper.getNflSportStanding();
  }

   async getPlayersEndPoint(currentYear) {
      return [];
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
