const mongoose = require('mongoose');
const http = require('http');

let dbConnection;

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  wins: {
    type: Number,
    required: true,
    trim: true,
  },
  losses: {
    type: Number,
    required: true,
    trim: true,
  },
}, {collection : 'team_list'});

function getDbConnection() {
    const url = "mongodb+srv://lwilt:Austin62@cluster0.iz6fl.mongodb.net/Test?retryWrites=true&w=majority";
    if (!dbConnection) {
        dbConnection = mongoose.createConnection(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }
    return dbConnection;
}

async function getTeamStandings(team){
    const userModel = getDbConnection().model("Team", teamSchema);
    let result;
    if (team === undefined){
        result = await userModel.find();
    }
    else if (team) {
        result = await findUserByName(team);
    }
     
    return result;
}

async function getGames(req, res) {
  var today = new Date();
    var currentDate = today.getFullYear() + String(today.getMonth() + 1).padStart(2, '0') + String(today.getDate()).padStart(2, '0');
    var options = {
        host: 'data.nba.net',
        path: '/10s/prod/v1/' + currentDate + '/scoreboard.json',
        method: 'GET'
    }
    http.request(options, function (response) {
        var body = '';
        response.on('data', function (data) {
            body += data;
        });
        response.on('end', function () {
            res.send(formatGamesData(body));
        });
    }).end();
}

function formatGamesData(responseData) {
  var games = JSON.parse(responseData).games;
  var new_games = [];
  for (var i = 0; i < games.length; i++) {
      var game = games[i];
      var new_game = {}
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
      new_games.push(new_game);
  }
  return {
      games: new_games
  };
}

async function getTeams(req, res) {
  const id = req.params['id'];
  const year = (new Date().getFullYear() - 1).toString().trim()
  var options = {
      host: 'data.nba.net',
      path: '/10s/prod/v2/' + year + '/teams.json',
      method: 'GET'
  }
  http.request(options, function (response) {
      var body = '';
      response.on('data', function (data) {
          body += data;
      });
      response.on('end', function () {
        if(id === undefined)
          res.send(formatTeamsData(body));
        else {
          res.send(formatTeamsData(body)[id]);
        }
      });
  }).end();
}

  function formatTeamsData(responseData) {
    var old_teams = JSON.parse(responseData).league.standard;
    var teams = {};
    for (var i = 0; i < old_teams.length; i++) {
        var team = old_teams[i];
        var new_team = {}
        new_team.code = team.tricode
        new_team.name = team.nickname
        new_team.full_name = team.fullName
        new_team.city = team.city
        teams[team.tricode] = new_team;
    }
    return teams;
}

function formatStandingsData(responseData) {
  var east = JSON.parse(responseData).league.standard.conference.east;
  var west = JSON.parse(responseData).league.standard.conference.west;
  var new_teams = {}
  for (var i = 0; i < east.length; i++) {
      var team = east[i];
      var new_team = {}
      new_team.code = team.teamSitesOnly.teamTricode
      new_team.name = team.teamSitesOnly.teamNickname
      new_team.city = team.teamSitesOnly.teamName
      new_team.conference = 'east'
      new_team.rank = team.confRank;
      new_team.wins = team.win;
      new_team.losses = team.loss;
      new_teams[team.teamSitesOnly.teamTricode] = new_team;
  }
  for (var i = 0; i < west.length; i++) {
      var team = west[i];
      var new_team = {}
      new_team.code = team.teamSitesOnly.teamTricode
      new_team.name = team.teamSitesOnly.teamNickname
      new_team.city = team.teamSitesOnly.teamName
      new_team.conference = 'west'
      new_team.rank = team.confRank;
      new_team.wins = team.win;
      new_team.losses = team.loss;
      new_teams[team.teamSitesOnly.teamTricode] = new_team;
  }
  return new_teams;
}

async function getStandings(req, res){
  const id = req.params['id'];
    var options = {
        host: 'data.nba.net',
        path: '/10s/prod/v1/current/standings_conference.json',
        method: 'GET'
    }
    http.request(options, function (response) {
        var body = '';
        response.on('data', function (data) {
            body += data;
        });
        response.on('end', function () {
            if(id === undefined)
                res.send(formatStandingsData(body));
            else
                res.send(formatStandingsData(body)[id]);
        });
    }).end();
}

exports.getTeamStandings = getTeamStandings;
exports.getGames = getGames;
exports.getTeams = getTeams;
exports.getStandings = getStandings;