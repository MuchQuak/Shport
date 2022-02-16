const cors = require('cors');
const express = require('express');
const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());

const nhl = require('./models/nhlServices');
const nba = require('./models/nbaServices');
const userServices = require('./models/userServices');
const sportInfoServices = require("./models/sportInfoServices");

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


// Getting username and password from user
app.get('/users', async (req, res) => {
    const username = req.query.username;
    const password = req.query.password;

    if (username != undefined && password == undefined){
        let result = await userServices.findUserByUsername(username)
        res.status(200).send(result);
    } else if (username != undefined && password != undefined){ // Used by login screen
        let result = await userServices.findUserByUsername(username);
        if (result[0] !== undefined && password === result[0]["password"]){
            res.status(200).send(result);
        } else {
            res.status(500).end();
        }
    } else {
        const allUsers = await userServices.TESTGetUsers();
        res.status(200).send(allUsers);
    }
});


/*
//FOR TESTING ONLY
app.get('/users', async (req, res) => {
    const pref = await userServices.TESTGetUsers();
    if (pref)
        res.status(201).send(pref);
    else
        res.status(500).end();
});*/

// Sport Calls
app.get('/sport', async (req, res) => {await sportInfoServices.getSportsRequest(req, res)});
app.get('/sport/:sport', async (req, res) => {await sportInfoServices.getSportRequest(req, res)});
app.get('/sport/:sport/teams', async (req, res) => {await sportInfoServices.getTeamsRequest(req, res)});

//NBA api Calls
app.get('/NBA', async (req, res) => {await nba.getGames(req, res, 0)});
app.get('/NBA/yesterday', async (req, res) => {await nba.getGames(req, res, -1)});
app.get('/NBA/tomorrow', async (req, res) => {await nba.getGames(req, res, 1)});
app.get('/NBA/teams', async (req, res) => {await nba.getTeams(req, res)});
app.get('/NBA/teams/:id', async (req, res) => {await nba.getTeams(req, res)});
app.get('/NBA/standings', async (req, res) => {await nba.getStandings(req, res)});
app.get('/NBA/standings/:id', async (req, res) => {await nba.getStandings(req, res)});

//NHL api Calls
app.get('/NHL', async (req, res) => {await nhl.getGames(req, res, 0)});

app.listen(port, () => {
    console.log(`Backend listening at http://localhost:${port}`);
});