const http = require('http');
const host = 'data.nba.net'

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

async function getGames(req, res, dayOffset) {
  const today = new Date();
  const currentDate = today.getFullYear() + String(today.getMonth() + 1).padStart(2, '0') + String(parseInt(today.getDate()) + dayOffset).padStart(2, '0');
  const options = {
    host: host,
    path: '/10s/prod/v1/' + currentDate + '/scoreboard.json',
    method: 'GET'
  }
  http.request(options, function (response) {
    let body = '';
    response.on('data', function (data) {
        body += data;
    });
    response.on('end', function () {
        res.send(formatGamesData(body));
    });
  }).end();
}

function formatGamesData(responseData) {
  const games = JSON.parse(responseData).games;
  const new_games = [];
  for (let i = 0; i < games.length; i++) {
      const game = games[i];
      const new_game = {}
      new_game.status = game.statusNum;
      new_game.activated = game.isGameActivated;
      new_game.endPeriod = game.period.isEndOfPeriod;
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

async function getTeams(req, res) {
  const id = req.params['id'];
  const year = (new Date().getFullYear() - 1).toString().trim()
  let options = {
      host: host,
      path: '/10s/prod/v2/' + year + '/teams.json',
      method: 'GET'
  }
  http.request(options, function (response) {
      let body = '';
      response.on('data', function (data) {
          body += data;
      });
      response.on('end', function () {
        if (id === undefined)
          res.send(formatTeamsData(body));
        else {
          res.send(formatTeamsData(body)[id]);
        }
      });
  }).end();
}

function formatTeamsData(responseData) {
    const old_teams = JSON.parse(responseData)['league']['standard'];
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

function formatStandingsData(responseData) {
    const all_data = {};
    const object_data = JSON.parse(responseData)['league']['standard']['conference'];
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
  const options = {
    host: host,
    path: '/10s/prod/v1/current/standings_conference.json',
    method: 'GET'
  }
  http.request(options, function (response) {
    let body = '';
    response.on('data', function (data) {
        body += data;
    });
    response.on('end', function () {
        if (id === undefined)
            res.send(formatStandingsData(body));
        else
            res.send(formatStandingsData(body)['teams'][id]);
    });
  }).end();
}

exports.getGames = getGames;
exports.getTeams = getTeams;
exports.getStandings = getStandings;