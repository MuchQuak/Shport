const league = require("./leagueService");
const axios = require("axios");
const teamScraper = require("../../scraper/teamExpansionScrape");
const sportInfoServices = require("./sportInfoServices");

class NhlService extends league.LeagueService {
  constructor(host) {
    super(host);
  }

  formatDate(date) {
    return (
      String(date.getFullYear()) +
      "-" +
      String(date.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(date.getDate()).padStart(2, "0")
    );
  }

  async getGamesData() {

    var currentDate = new Date;
    var previousDate = new Date;
    var nextDate = new Date;
    previousDate.setDate(currentDate.getDate() - 1);
    nextDate.setDate(currentDate.getDate() + 1);

    var prev = await this.formatGamesData(
      await axios.get(this.host + "/api/v1/schedule?date=" + this.formatDate(previousDate)),
      previousDate);
    var current = await this.formatGamesData(
      await axios.get(this.host + "/api/v1/schedule?date=" + this.formatDate(currentDate)),
      currentDate);
    var next = await this.formatGamesData(
      await axios.get(this.host + "/api/v1/schedule?date=" + this.formatDate(nextDate)),
      nextDate);

    var result = new Array();

    if(prev !== undefined)
      result = result.concat(prev)

    if(current !== undefined)
      result = result.concat(current)

    if(next !== undefined)
      result = result.concat(next)

    return result;
  }

  async getStandingsData() {
    return this.formatStandingsData(
      await axios.get(this.host + "/api/v1/standings"));
  }

  getScrapedPlayers(code){
    return teamScraper.getRoster("nhl", code).then((result) => {
      return result;
    });
  }

getScrapedInjuries(code){
    return teamScraper.getInjuries("nhl", code).then((result) => {
      return result;
    });
  }

getScrapedTopPlayers(code){
  return teamScraper.getTopPlayers("nhl", code).then((result) => {
    return result;
  });
}

getScrapedTransactions(code){
  return teamScraper.getTransactions("nhl", code).then((result) => {
    return result;
  });
}

getScrapedHeadlines(code){
  return teamScraper.getHeadlines("nhl", code).then((result) => {
    return result;
  });
}


  async parseSpecificGameInfo(jsonData) {
    const line = jsonData["liveData"]["linescore"];
    const intermission =
      String(line["intermissionInfo"]["inIntermission"]).toLowerCase() ===
      "true";
    return [
      line["currentPeriod"],
      line["currentPeriodTimeRemaining"],
      intermission,
    ];
  }

  async getSpecificGameInfo(link) {
    try {
      const info = await (await axios.get(this.host + link)).data;
      return this.parseSpecificGameInfo(info).then((data) => data);
    } catch (e) {
      console.log(e);
    }
  }

  async formatGamesData(responseData, date) {
    const data = responseData.data["dates"][0];

    if (data === undefined) {
      return;
    }

    const games = data["games"];
    const new_games = [];
    for (let i = 0; i < games.length; i++) {
      const game = games[i];
      const new_game = {};
      new_game.status = this.getStatus(game.status.codedGameState);
      new_game.arena = game.venue.name;
      new_game.maxQtr = 3;
      new_game.home = game.teams.home.team.name;
      new_game.home_score = game.teams.home.score;
      new_game.home_record =
        game.teams.home.leagueRecord.wins +
        "-" +
        game.teams.home.leagueRecord.losses;
      new_game.home_code = String(game.teams.home.team.id);
      new_game.away = game.teams.away.team.name;
      new_game.away_score = game.teams.away.score;
      new_game.away_record =
        game.teams.away.leagueRecord.wins +
        "-" +
        game.teams.away.leagueRecord.losses;
      new_game.away_code = String(game.teams.away.team.id);
      new_game.startTimeUTC = game.gameDate;
      new_game.date = date;
      new_game.break_string = "Intermission";
      if (new_game.status === 1) {
        const specificInfo = await this.getSpecificGameInfo(game.link);
        new_game.currentQtr = specificInfo[0];
        new_game.clock = specificInfo[1];
        new_game.break = specificInfo[2];
      } else {
        new_game.currentQtr = 3;
        new_game.clock = "00:00";
        new_game.break = false;
      }
      new_game.numInSeries = 0;
      new_game.homePlayoffs = false;
      new_game.awayPlayoffs = false;
      new_games.push(new_game);
    }
    return new_games;
  }

  getStatus(codedGameState) {
    const state = parseInt(codedGameState);
    const LIVE = 3;
    const FINAL = 6;
    if (state >= FINAL) {
      return 2;
    } else if (state >= LIVE) {
      return 1;
    } else {
      return 0;
    }
  }

  async translateApiToEspn(code){
  return await sportInfoServices.getTeams("nhl").then( result => {
    const teamPicked = result.filter(team => team.code === code);
    return teamPicked[0];
  })
}

  formatStandingsData(responseData) {
    const all_data = {};
    const data = responseData.data["records"];
    data.forEach((division_data) => {
      const div_name = division_data["division"]["nameShort"];
      const records = division_data["teamRecords"];
      records.forEach((team_data) => {
        let code = String(team_data["team"]["id"]);
        const new_team_data = {};
        new_team_data.code =  String(team_data["team"]["id"]); // get espn code a
        new_team_data.espn = this.translateApiToEspn(code);
        new_team_data.name = team_data["team"]["name"];
        new_team_data.city = "";
        new_team_data.conference = div_name;
        new_team_data.rank = String(team_data["divisionRank"]);
        new_team_data.wins = String(team_data["leagueRecord"]["wins"]);
        new_team_data.losses = String(team_data["leagueRecord"]["losses"]);
        all_data[new_team_data.code] = new_team_data;
      });
    });
    return all_data;
  }

  sportCode() {
    return "NHL";
  }
}

exports.NhlService = NhlService;
