const league = require("./leagueService");
const axios = require("axios");

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

  getGamesEndPoint(currentDate) {
    return this.host + "/api/v1/schedule?date=" + currentDate;
  }

  getStandingsEndPoint() {
    return this.host + "/api/v1/standings";
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
      return this.parseSpecificGameInfo(info).then(data => data);
    } catch (e) {
      console.log(e);
    }
  }

  async formatGamesData(responseData, date) {
    const data = responseData["dates"].find((element) => element.date === date);
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
      if (new_game.status === 1) {
        const specificInfo = await this.getSpecificGameInfo(game.link);
        console.log(specificInfo);
        new_game.currentQtr = specificInfo[0];
        new_game.clock = specificInfo[1];
        new_game.halftime = specificInfo[2];
      } else {
        new_game.currentQtr = 3;
        new_game.clock = "00:00";
        new_game.halftime = false;
      }
      new_games.push(new_game);
    }
    return {
      games: new_games,
    };
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

  formatStandingsData(responseData) {
    const all_data = {};
    const data = responseData["records"];
    data.forEach((division_data, index) => {
      const div_name = division_data["division"]["nameShort"];
      const records = division_data["teamRecords"];
      records.forEach((team_data, index) => {
        const new_team_data = {};
        new_team_data.code = String(team_data.team.id);
        new_team_data.name = team_data.team.name;
        new_team_data.city = "";
        new_team_data.conference = div_name;
        new_team_data.rank = String(team_data.divisionRank);
        new_team_data.wins = String(team_data.leagueRecord.wins);
        new_team_data.losses = String(team_data.leagueRecord.losses);
        all_data[new_team_data.code] = new_team_data;
      });
    });
    return {
      teams: all_data,
    };
  }
}

exports.NhlService = NhlService;
