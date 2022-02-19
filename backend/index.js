const cors = require('cors');
const express = require('express');
const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());

const nhl = require('./models/nhlServices');
const nba = require('./models/nbaServices');
const news = require('./models/newsServices');
const userServices = require('./models/userServices');
const sportInfoServices = require("./models/sportInfoServices");

const User = require('./models/userServices');

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

//Test user sign up call
    app.post('/testusers', async (req, res) => {
    const user = req.body;
    const savedUser = await userServices.signUpTestUser(user);
    if (savedUser)
        res.status(201).send();
    else
        res.status(500).end();
});

//Currently just uses name to look up but would like to change this
app.get('/users/:name/pref', async (req, res) => {
    const name = req.params.name;
    const pref = await userServices.getUserPreferences(name);
    if (pref)
        res.status(200).send(pref);
    else
        res.status(500).end();
});

//FOR TESTING ONLY
app.get('/users', async (req, res) => {
    const username = req.query.username;

    if (username != undefined){
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

    if(result[0] != undefined){
        res.status(201).send();
    }
    else{
        res.status(500).end();
    }
});

// Validating Sign Up email
app.post('/signup/email', async(req, res) => {
    const user = req.body;
    let result = await userServices.findUserByEmail(user.email);

    if(result[0] != undefined && result[0].email === user.email){
        res.status(201).send();
    }
    else{
        res.status(500).end();
    }
});

// Validating Login
app.post('/login', async(req, res) => {
    const user = req.body;
    let result = await userServices.findUserByUsername(user.username);

    if(result[0] != undefined && result[0].validPassword(user.password)){
        res.status(201).send();
    }
    else{
        res.status(500).end();
    }
});

// gettingPreferences
app.post('/preferences', async(req, res) => {
    const user = req.body;
    let userPref = await userServices.getUserPreferences(user.username);

    if(userPref){
        res.status(201).send(userPref);
    }
    else{
        res.status(500).end();
    }
});



// Sport Calls
app.get('/sport', async (req, res) => {await sportInfoServices.getSportsRequest(req, res)});
app.get('/sport/:sport', async (req, res) => {await sportInfoServices.getSportRequest(req, res)});
app.get('/sport/:sport/teams', async (req, res) => {await sportInfoServices.getTeamsRequest(req, res)});

//NBA api Calls
app.get('/NBA/games', async (req, res) => {await nba.getGames(req, res)});
app.get('/NBA/games/:offset', async (req, res) => {await nba.getGames(req, res)});
app.get('/NBA/standings', async (req, res) => {await nba.getStandings(req, res)});
app.get('/NBA/standings/:id', async (req, res) => {await nba.getStandings(req, res)});

//NHL api Calls
app.get('/NHL/games', async (req, res) => {await nhl.getGames(req, res)});
app.get('/NHL/games/:offset', async (req, res) => {await nhl.getGames(req, res)});
app.get('/NHL/standings', async (req, res) => {await nhl.getStandings(req, res)});
app.get('/NHL/standings/:id', async (req, res) => {await nhl.getStandings(req, res)});

//articles api Calls
app.get('/news', async (req, res) => {await news.getNews(req, res)});
app.get('/news/:id', async (req, res) => {await news.getNews(req, res)});

app.listen(port, () => {
    console.log(`Backend listening at http://localhost:${port}`);
});