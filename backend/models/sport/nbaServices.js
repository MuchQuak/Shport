const league = require("./leagueService");
const teamScraper = require("../../scraper/teamExpansionScrape");

class NbaService extends league.LeagueService {
  constructor(host) {
    super(host);
  }

  getGamesEndPoint(currentDate) {
    return this.host + "/10s/prod/v1/" + currentDate + "/scoreboard.json";
  }
  getStandingsEndPoint() {
    return this.host + "/10s/prod/v1/current/standings_conference.json";
  }
  getPlayersEndPoint(currentYear) {
    return this.host + "/10s/prod/v1/" + currentYear + "/players.json";
  }

  getScrapedPlayers(code){
    return teamScraper.getRoster("nba", code).then((result) => {
      return result;
    });
  }

  formatGamesData(responseData, date) {
    const games = responseData["games"];
    const new_games = [];
    for (let i = 0; i < games.length; i++) {
      const game = games[i];
      const new_game = {};
      new_game.status = this.getStatus(game.statusNum);
      new_game.clock = game.clock;
      new_game.break = game.period.isHalftime;
      new_game.break_string = "Halftime";
      new_game.arena = game.arena.name;
      new_game.currentQtr = game.period.current;
      new_game.maxQtr = game.period.maxRegular;
      new_game.home = "";
      new_game.home_code = game.hTeam.triCode;
      new_game.home_score = game.hTeam.score;
      new_game.home_record = game.hTeam.win + "-" + game.hTeam.loss;
      new_game.away = "";
      new_game.away_code = game.vTeam.triCode;
      new_game.away_score = game.vTeam.score;
      new_game.away_record = game.vTeam.win + "-" + game.vTeam.loss;
      new_game.startTimeUTC = this.ESTtoUTC(game.startTimeEastern);
      if (game.playoffs) {
        new_game.numInSeries = game.playoffs.gameNumInSeries;
        new_game.homePlayoffs =
          game.playoffs.hTeam.seriesWin + "-" + game.playoffs.vTeam.seriesWin;
        new_game.awayPlayoffs =
          game.playoffs.vTeam.seriesWin + "-" + game.playoffs.hTeam.seriesWin;
      } else {
        new_game.numInSeries = 0;
        new_game.homePlayoffs = false;
        new_game.awayPlayoffs = false;
      }
      new_games.push(new_game);
    }
    return new_games;
  }

  getStatus(codedGameState) {
    const state = parseInt(codedGameState);
    const LIVE = 1;
    const FINAL = 3;
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
    const object_data = responseData["league"]["standard"]["conference"];
    for (const conf of Object.keys(object_data)) {
      const data = object_data[conf];
      data.forEach((division_data) => {
        const div_name = String(conf);
        const new_team_data = {};
        const code = String(division_data["teamSitesOnly"]["teamTricode"]);
        new_team_data.code = code;
        new_team_data.name = division_data["teamSitesOnly"]["teamNickname"];
        new_team_data.city = division_data["teamSitesOnly"]["teamName"];
        new_team_data.conference = div_name;
        new_team_data.rank = String(division_data["confRank"]);
        new_team_data.wins = String(division_data["win"]);
        new_team_data.losses = String(division_data["loss"]);
        new_team_data.api_code = String(division_data["teamId"]);
        all_data[code] = new_team_data;
      });
    }
    return all_data;
  }

  formatPlayersData(responseData) {
    return responseData["league"]["standard"];
  }
}

exports.NbaService = NbaService;

//exports.getTeams = getTeams;
/*
async function getTeams(req, res) {
  const id = req.params['id'];
  const year = (new Date().getFullYear() - 1).toString().trim()
    try {
        const teams = await axios.get(host + '/10s/prod/v2/' + year + '/teams.json');
        if (id === undefined) {
            res.send(formatTeamsData(teams.data));
        } else {
            res.send(formatTeamsData(teams.data)[id]);
        }
    } catch (e) {
        console.error(e);
    }
}

function formatTeamsData(responseData) {
    const old_teams = responseData['league']['standard'];
    const teams = {};
    for (let i = 0; i < old_teams.length; i++) {
        const team = old_teams[i];
        const new_team = {};
        const code = team['tricode'];
        new_team.code = code;
        new_team.name = team['nickname'];
        new_team.full_name = team['fullName'];
        new_team.city = team['city'];
        teams[code] = new_team;
    }
    return {teams: teams};
}
 */
