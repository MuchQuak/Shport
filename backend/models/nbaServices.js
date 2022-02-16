const http = require('http');
const { off } = require('process');
const host = 'data.nba.net'

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

function timeToUtc(time) {
  var timeParts = time.split(' ');
  var pmAm = timeParts[1];
  var time = timeParts[0].split(':');
  
  offset = pmAm[0] === 'A' ? 0: 12;
  
  const hour = parseInt(time[0]) + 5 + offset;
  const min = parseInt(time[1]);
  
  var t = new Date();
  
  return new Date(Date.UTC(t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDay(), hour, min, 0));
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
      new_game.startTimeEST = game.startTimeEastern;
      new_game.currentQtr = game.period.current;
      new_game.maxQtr = game.period.maxRegular;
      new_game.home = game.hTeam.triCode;
      new_game.home_score = game.hTeam.score;
      new_game.home_record = game.hTeam.win + "-" + game.hTeam.loss;
      new_game.away = game.vTeam.triCode;
      new_game.away_score = game.vTeam.score;
      new_game.away_record = game.vTeam.win + "-" + game.vTeam.loss;
      //Made new time cause don't know what you want to do with it but this is proof it works (Logan)
      new_game.startTimeUTC = timeToUtc(game.startTimeEastern);
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
    const east = JSON.parse(responseData)['league']['standard']['conference']['east'];
    const west = JSON.parse(responseData)['league']['standard']['conference']['west'];
    const new_teams = {};
    for (let i = 0; i < east.length; i++) {
        const team = east[i];
        const new_team = {};
        const code = team['teamSitesOnly']['teamTricode'];
        new_team.code = code;
        new_team.name = team['teamSitesOnly']['teamNickname'];
        new_team.city = team['teamSitesOnly']['teamName'];
        new_team.conference = 'east';
        new_team.rank = team['confRank'];
        new_team.wins = team['win'];
        new_team.losses = team['loss'];
        new_teams[code] = new_team;
    }
    for (let i = 0; i < west.length; i++) {
        const team = west[i];
        const new_team = {};
        const code = team['teamSitesOnly']['teamTricode'];
        new_team.code = code;
        new_team.name = team['teamSitesOnly']['teamNickname'];
        new_team.city = team['teamSitesOnly']['teamName'];
        new_team.conference = 'west';
        new_team.rank = team['confRank'];
        new_team.wins = team['win'];
        new_team.losses = team['loss'];
        new_team.win
        new_teams[code] = new_team;
    }
    return {teams: new_teams};
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