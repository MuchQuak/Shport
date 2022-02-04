const cors = require('cors');
const express = require('express');
const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());

const http = require('http');
const nbaServices = require('./models/nbaServices');

app.get('/', (req, res) => {
    res.send("Backend Landing");
});

app.get('/teams', async (req, res) => {
    const team = req.query.team;
    try {
        const result = await nbaServices.getTeams(team);
        console.log(result);
        res.send({team_list: result});
    } catch (error) {
        console.log(error);
        res.status(500).send('An error ocurred in the server.');
    }
});

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

app.get('/nba', async (req, res) => {
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
});

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

app.get('/nba/teams', (req, res) => {
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
            res.send(formatTeamsData(body));
        });
    }).end();
});

app.get('/nba/teams/:id', (req, res) => {
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
            res.send(formatTeamsData(body)[id]);
        });
    }).end();
});

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

app.get('/nba/standings', (req, res) => {
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
            res.send(formatStandingsData(body));
        });
    }).end();
});

app.get('/nba/standings/:id', (req, res) => {
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
            res.send(formatStandingsData(body)[id]);
        });
    }).end();
});

app.listen(port, () => {
    console.log(`Backend listening at http://localhost:${port}`);
});
