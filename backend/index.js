const cors = require('cors');
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());

// Models
const nhlServices = require('./models/sport/nhlServices');
const nbaServices = require('./models/sport/nbaServices');
const mlbServices = require('./models/sport/mlbServices');
const nflServices = require('./models/sport/nflServices');
const news = require('./models/news/newsServices');
const userServices = require('./models/user/userServices');
const sportInfoServices = require("./models/sport/sportInfoServices");
const leagueServices = require('./models/sport/leagueService');

function generateAccessToken(username) {
    return jwt.sign({"username": username}, process.env.TOKEN_SECRET, { expiresIn: "60s" });
}

app.get('/', (req, res) => {
    res.send("Backend Landing");
});


/* Using this funcion as a "middleware" function for
  all the endpoints that need access control protecion */
function authenticateUser(req, res, next) {
    const authHeader = req.headers["authorization"];
    //Getting the 2nd part of the auth hearder (the token)
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) {
      console.log("No token received");
      return res.status(401).end();
    } else {
      // If a callback is supplied, verify() runs async
      // If a callback isn't supplied, verify() runs synchronously
      // verify() throws an error if the token is invalid
      try {
        // verify() returns the decoded obj which includes whatever objs
        // we use to code/sign the token
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET)   
        // in our case, we used the username to sign the token
        console.log(decoded);
        next()
      } catch (error) {
        console.log(error);
        return res.status(401).end();  
      }
    }
  }

// User db calls
app.post('/signup', async (req, res) => {
    const user = req.body;

    if(!user.username && !user.password && !user.email) {
        res.status(400).send("Bad Request: Invalid input data")
    } else {
        if(!(await userServices.validate(user))) {
            res.status(409).send('Username or Email mail already taken')
        } else {
            const savedUser = await userServices.signUpUser(user);

            if (savedUser) {
                const token = generateAccessToken(user.username);
                res.status(201).send(token);
            } else {
                res.status(500).end("Server Error");
            }
        }
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


// Validating Login
app.post('/login', async(req, res) => {
    const user = req.body;

    if(user.username && user.password){
        let result = await userServices.login(user);

        if (result){
            const token = generateAccessToken(user.username);
            res.status(201).send(token);
        } else {
            res.status(401).end("Unauthorized");
        }
    }
    else{
        res.status(400).end("Bad Request");
    }
});

// gettingPreferences
app.get('/preferences', async(req, res) => {
    const username = req.headers["username"];
    const userPref = await userServices.getUserPreferences(username);
    
    if (userPref){
        res.status(201).send(userPref);
    } else {
        res.status(500).end();
    }
});


// changing preferences
app.patch('/preferences', async(req, res) => {
    const user = req.body;
    const userPref = await userServices.setUserPreferences(user.username, user.prefs);
    if (userPref){
        res.status(201).send(userPref);
    } else {
        res.status(500).end();
    }
});

// -----------  Sport API Calls   ------------

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