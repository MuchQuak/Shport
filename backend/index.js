const cors = require('cors');
const express = require('express');
const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());

const nba = require('./models/nbaServices');
const userServices = require('./models/userServices');


app.get('/', (req, res) => {
    res.send("Backend Landing");
});

//User db calls
app.post('/users', async (req, res) => {
    const user = req.body;
    const savedUser = await userServices.signUpUser(user);
    if (savedUser)
        res.status(201).send();
    else
        res.status(500).end();
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
