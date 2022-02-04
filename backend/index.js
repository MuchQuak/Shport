const cors = require('cors');
const express = require('express');
const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());

const http = require('http');
const nba = require('./models/nbaServices');

app.get('/', (req, res) => {
    res.send("Backend Landing");
});

app.get('/teams', async (req, res) => {
    const team = req.query.team;
    try {
        const result = await nba.getTeamStandings(team);
        console.log(result);
        res.send({team_list: result});
    } catch (error) {
        console.log(error);
        res.status(500).send('An error ocurred in the server.');
    }
});

app.get('/nba', async (req, res) =>{nba.getGames(req, res)});
app.get('/nba/teams', async (req, res) => {nba.getTeams(req, res)});
app.get('/nba/teams/:id', async (req, res) => {nba.getTeams(req, res)});
app.get('/nba/standings', async (req, res) => {nba.getStandings(req, res)});
app.get('/nba/standings/:id', async (req, res) => {nba.getStandings(req, res)});

app.listen(port, () => {
    console.log(`Backend listening at http://localhost:${port}`);
});
