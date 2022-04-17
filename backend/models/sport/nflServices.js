const axios = require("axios");

const league = require("./leagueService");
const sportScraper = require("../../scraper/standingsScrape");

class NflService extends league.LeagueService {
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

  getStandingsScrape(){
    return sportScraper.getNflSportStanding().then( result => {return result} );
  }

  formatGamesData(responseData, date) {}

  formatStandingsData(responseData) {}
}

exports.NflService = NflService;
