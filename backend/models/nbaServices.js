const axios = require("axios");
const host = 'https://data.nba.net'

function ESTtoUTC(time) {
    const timeParts = time.split(' ');
    const pmAm = timeParts[1];
    const newtime = timeParts[0].split(':');
    const offset = pmAm[0] === 'A' ? 0: 12;
    const hour = parseInt(newtime[0]) + 5 + offset;
    const min = parseInt(newtime[1]);
    const t = new Date();
    return new Date(Date.UTC(t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDay(), hour, min, 0));
}

async function getGames(req, res) {
  const offset_param = String(req.params['offset']).trim();
  const offset_num = offset_param === undefined ? 0 : parseInt(offset_param);
  const offset = isNaN(offset_num) ? 0 : offset_num;
  const today = new Date();
  today.setDate(today.getDate() + offset);
  const currentDate = today.getFullYear() + String(today.getMonth() + 1).padStart(2, '0') + String(today.getDate()).padStart(2, '0');
    try {
        const games = await axios.get(host + '/10s/prod/v1/' + currentDate + '/scoreboard.json');
        res.send(formatGamesData(games.data));
    } catch (e) {
        console.error(e);
    }
}

function getStatus(game) {
    const state = parseInt(game.statusNum);
    const LIVE = 2;
    const FINAL = 3;
    if (state >= FINAL) {
        return 2;
    } else if (state >= LIVE || game.isGameActivated) {
        return 1;
    } else {
        return 0;
    }
}

function formatGamesData(responseData) {
  const games = responseData["games"];
  const new_games = [];
  for (let i = 0; i < games.length; i++) {
      const game = games[i];
      const new_game = {}
      new_game.status = getStatus(game);
      new_game.clock = game.clock;
      new_game.halftime = game.period.isHalftime;
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
      new_game.startTimeUTC = ESTtoUTC(game.startTimeEastern);
      new_games.push(new_game);
  }
  return {
      games: new_games
  };
}

function formatStandingsData(responseData) {
    const all_data = {};
    const object_data = responseData['league']['standard']['conference'];
    for (const conf of Object.keys(object_data)) {
        const data = object_data[conf];
        data.forEach((division_data, index) => {
            const div_name = String(conf);
            const new_team_data = {};
            const code = String(division_data['teamSitesOnly']['teamTricode']);
            new_team_data.code = code;
            new_team_data.name = division_data['teamSitesOnly']['teamNickname'];
            new_team_data.city = division_data['teamSitesOnly']['teamName'];
            new_team_data.conference = div_name;
            new_team_data.rank = String(division_data['confRank']);
            new_team_data.wins = String(division_data['win']);
            new_team_data.losses = String(division_data['loss']);
            all_data[code] = new_team_data;
        });
    }
    return {
        teams: all_data
    };
}

async function getStandings(req, res){
    const id = req.params['id'];
    try {
        const standings = await axios.get(host + '/10s/prod/v1/current/standings_conference.json');
        if (id === undefined) {
            res.send(formatStandingsData(standings.data));
        } else {
            res.send(formatStandingsData(standings.data).teams[id]);
        }
    } catch (e) {
        console.error(e);
    }
}

exports.getGames = getGames;
exports.getStandings = getStandings;

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