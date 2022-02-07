const cors = require('cors');
const express = require('express');
const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());

const nba = require('./models/nbaServices');

app.get('/', (req, res) => {
    res.send("Backend Landing");
});

//NBA api Calls
app.get('/nba', async (req, res) =>{await nba.getGames(req, res)});
app.get('/nba/teams', async (req, res) => {await nba.getTeams(req, res)});
app.get('/nba/teams/:id', async (req, res) => {await nba.getTeams(req, res)});
app.get('/nba/standings', async (req, res) => {await nba.getStandings(req, res)});
app.get('/nba/standings/:id', async (req, res) => {await nba.getStandings(req, res)});

app.listen(port, () => {
    console.log(`Backend listening at http://localhost:${port}`);
});
