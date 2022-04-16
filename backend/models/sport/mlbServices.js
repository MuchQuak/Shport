const axios = require("axios");

const league = require("./leagueService");
const mlbScraper = require("./mlbStandingsScrape");

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

  getStandingsScrape(){
    return mlbScraper.getMlbSportStanding().then( result => {return result} );
  }

  formatGamesData(responseData, date) {}

  formatStandingsData(responseData) {}
}

exports.MlbService = MlbService;
