const cors = require('cors');
const express = require('express');
const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());

// Models
const nhlServices = require('./models/nhlServices');
const nbaServices = require('./models/nbaServices');
const mlbServices = require('./models/mlbServices');
const nflServices = require('./models/nflServices');
const news = require('./models/newsServices');
const userServices = require('./models/userServices');
const sportInfoServices = require("./models/sportInfoServices");
const leagueServices = require('./models/leagueService');

app.get('/', (req, res) => {
    res.send("Backend Landing");
});

// User db calls
app.post('/users', async (req, res) => {
    const user = req.body;
    const savedUser = await userServices.validateAndSignUp(user);

    if (savedUser) {
        res.status(201).send();
    } else {
        res.status(500).end();
    }
});

// Currently just uses name to look up but would like to change this
app.get('/users/:name/pref', async (req, res) => {
    const name = req.params.name;
    const pref = await userServices.getUserPreferences(name);
    if (pref) {
        res.status(200).send(pref);
    } else {
        res.status(500).end();
    }
});

// Currently just uses name to look up but would like to change this
app.put('/users/:name/pref', async (req, res) => {
    const name = req.params.name;
    const prefs = req.body;
    const pref = await userServices.setUserPreferences(name, prefs);
    if (pref) {
        res.status(200).end();
    } else {
        res.status(500).end();
    }
});

// FOR TESTING ONLY
app.get('/users', async (req, res) => {
    const username = req.query.username;

    if (username !== undefined){
        let result = await userServices.findUserByUsername(username)
        res.status(200).send(result);
    } else {
        const allUsers = await userServices.TESTGetUsers();
        res.status(200).send(allUsers);
    }
});

// Validating Sign Up username
app.post('/signup/username', async(req, res) => {
    const user = req.body;
    let result = await userServices.findUserByUsername(user.username);

    if (result[0] !== undefined){
        res.status(201).send();
    } else {
        res.status(500).end();
    }
});

// Validating Sign Up email
app.post('/signup/email', async(req, res) => {
    const user = req.body;
    let result = await userServices.findUserByEmail(user.email);

    if (result[0] !== undefined && result[0].email === user.email){
        res.status(201).send();
    } else {
        res.status(500).end();
    }
});

// Validating Login
app.post('/login', async(req, res) => {
    const user = req.body;
    let result = await userServices.login(user);

    if (result){
        res.status(201).send();
    } else {
        res.status(500).end();
    }
});

// gettingPreferences
app.post('/preferences', async(req, res) => {
    const user = req.body;
    let userPref = await userServices.getUserPreferences(user.username);

    if (userPref){
        res.status(201).send(userPref);
    } else {
        res.status(500).end();
    }
});


// changing preferences
app.patch('/preferences', async(req, res) => {
    const user = req.body;
    let userPref = await userServices.setUserPreferences(user.username, user.prefs);

    if (userPref){
        res.status(201).send(userPref);
    } else {
        res.status(500).end();
    }
});

// Do we have to test the API calls

// Sport Calls
app.get('/sport', async (req, res) => {await sportInfoServices.getSportsRequest(req, res)});
app.get('/sport/:sport', async (req, res) => {await sportInfoServices.getSportRequest(req, res)});
app.get('/sport/:sport/teams', async (req, res) => {await sportInfoServices.getTeamsRequest(req, res)});

//NBA api Calls
let nba = new nbaServices.NbaService('https://data.nba.net');
app.get('/NBA/games', async (req, res) => {await nba.getGames(req, res)});
app.get('/NBA/games/:offset', async (req, res) => {await nba.getGames(req, res)});
app.get('/NBA/standings', async (req, res) => {await nba.getStandings(req, res)});
app.get('/NBA/standings/:id', async (req, res) => {await nba.getStandings(req, res)});

//NHL api Calls
let nhl = new nhlServices.NhlService('https://statsapi.web.nhl.com');
app.get('/NHL/games', async (req, res) => {await nhl.getGames(req, res)});
app.get('/NHL/games/:offset', async (req, res) => {await nhl.getGames(req, res)});
app.get('/NHL/standings', async (req, res) => {await nhl.getStandings(req, res)});
app.get('/NHL/standings/:id', async (req, res) => {await nhl.getStandings(req, res)});

//MLB api Calls Currently currently pulls nothing
let mlb = new mlbServices.MlbService('https://lookup-service-prod.mlb.com/json');
app.get('/MLB/games', async (req, res) => {await mlb.getGames(req, res)});
app.get('/MLB/games/:offset', async (req, res) => {await mlb.getGames(req, res)});
app.get('/MLB/standings', async (req, res) => {await mlb.getStandings(req, res)});
app.get('/MLB/standings/:id', async (req, res) => {await mlb.getStandings(req, res)});

//NFL api Calls Currently pulls nothing
let nfl = new nflServices.NflService('');
app.get('/NFL/games', async (req, res) => {await nfl.getGames(req, res)});
app.get('/NFL/games/:offset', async (req, res) => {await nfl.getGames(req, res)});
app.get('/NFL/standings', async (req, res) => {await nfl.getStandings(req, res)});
app.get('/NFL/standings/:id', async (req, res) => {await nfl.getStandings(req, res)});

//articles api Calls
//app.get('/news', async (req, res) => {await news.getNews(req, res)});
app.get('/news/:id', async (req, res) => {await news.getNews(req, res)});

app.listen(port, () => {
    console.log(`Backend listening at http://localhost:${port}`);
});