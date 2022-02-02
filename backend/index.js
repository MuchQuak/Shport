const cors = require('cors');
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
const port = 5000;
const http = require('http');

app.use(cors());

const nbaServices = require('./models/nbaServices');

app.get('/', (req, res) => {
    res.send("Backend Landing");
});

app.get('/teams', async (req, res) => {
    const team = req.query.team;

    try {
        const result = await nbaServices.getTeams(team);
        res.send({team_list: result});         
    } catch (error) {
        console.log(error);
        res.status(500).send('An error ocurred in the server.');
    }
});

function formatData(responseData) {
    var games = JSON.parse(responseData).games;
    var new_games = [];
    for (var i = 0; i < games.length; i++) {
        var game = games[i];
        var new_game = {}
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
            res.send(formatData(body));
        });
    }).end();
});

app.listen(port, () => {
    console.log(`Backend listening at http://localhost:${port}`);
});