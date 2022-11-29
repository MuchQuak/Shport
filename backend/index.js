const cors = require("cors");
const express = require("express");
const app = express();
const schedule = require('node-schedule');
const { authenticateUser }  = require('./utility');
const userController = require('./controllers/user');
const sportController = require('./controllers/sport');
const nbaController = require('./controllers/nba');
const nhlController = require('./controllers/nhl');
const mlbController = require('./controllers/mlb');
const nflController = require('./controllers/nfl');
const redditController = require('./controllers/reddit');
const newsController = require('./controllers/news');

var live_games = {nhl: [], nba: [], nfl: [], mlb: []}
var scheduled_games = {}

app.use(express.json());
app.use(cors());

// Models
const nhlServices = require("./models/sport/nhlServices");
const nbaServices = require("./models/sport/nbaServices");
const mlbServices = require("./models/sport/mlbServices");
const nflServices = require("./models/sport/nflServices");

app.get("/", (req, res) => {res.send("Backend Landing");});

//USER
app.post("/signup",userController.signup);
app.post("/login", userController.login);
app.get("/user/:username", userController.getUserPrefs);
app.get("/username", authenticateUser, userController.getUsername);
app.delete("/username", userController.deleteUser);
app.patch("/username", userController.patchUsername);
app.patch("/password", userController.patchPassword);
app.get("/theme", authenticateUser, userController.getTheme);
app.post("/theme", authenticateUser, userController.postTheme);
app.get("/preferences", authenticateUser, userController.getPrefs);
app.post("/preferences", authenticateUser, userController.postPrefs);

// -----------  Sport API Calls   ------------

app.get("/sport", sportController.getSports);
app.get("/sport/:sport", sportController.getSport);
app.get("/sport/:sport/teams", sportController.getTeams);

//NBA api Calls
let nba = new nbaServices.NbaService("https://data.nba.net");
app.get("/NBA/games", nbaController.getGames);
app.get("/NBA/games/:offset", nbaController.getGames);
app.get("/NBA/standings", nbaController.getStandings);
app.get("/NBA/standings/:id", nbaController.getStandings);
app.get("/NBA/players", nbaController.getPlayers);
app.get("/NBA/players/:id", nbaController.getScrapedPlayers);
app.get("/NBA/injuries/:id", nbaController.getPlayerInjuries);
app.get("/NBA/top_players/:id", nbaController.getTopPlayers);
app.get("/NBA/transactions/:id", nbaController.getPlayerTransactions);
app.get("/NBA/headlines/:id", nbaController.getHeadlines);

//NHL api Calls
let nhl = new nhlServices.NhlService("https://statsapi.web.nhl.com");
app.get("/NHL/games", nhlController.getGames);
app.get("/NHL/games/:offset", nhlController.getGames);
app.get("/NHL/standings", nhlController.getStandings);
app.get("/NHL/standings/:id", nhlController.getStandings);
//Players endpoint Nothing
app.get("/NHL/players", nhlController.getPlayers);
app.get("/NHL/players/:id", nhlController.getScrapedPlayers);
app.get("/NHL/injuries/:id", nhlController.getPlayerInjuries);
app.get("/NHL/top_players/:id", nhlController.getTopPlayers);
app.get("/NHL/transactions/:id", nhlController.getPlayerTransactions);
app.get("/NHL/headlines/:id", nhlController.getHeadlines);

//MLB api Calls Currently currently pulls nothing
let mlb = new mlbServices.MlbService("");
app.get("/MLB/games", mlbController.getGames);
app.get("/MLB/games/:offset", mlbController.getGames);
app.get("/MLB/standings", mlbController.getStandings);
app.get("/MLB/standings/:id", mlbController.getStandings);
//Sends Nothing
app.get("/MLB/players", mlbController.getPlayers);
app.get("/MLB/players/:id", mlbController.getScrapedPlayers);
app.get("/MLB/injuries/:id", mlbController.getPlayerInjuries);
app.get("/MLB/top_players/:id", mlbController.getTopPlayers);
app.get("/MLB/transactions/:id", mlbController.getPlayerTransactions);
app.get("/MLB/headlines/:id", mlbController.getHeadlines);

//NFL api Calls Currently pulls nothing
let nfl = new nflServices.NflService("");
app.get("/NFL/games", nflController.getGames);
app.get("/NFL/games/:offset", nflController.getGames);
app.get("/NFL/standings", nflController.getStandings);
app.get("/NFL/standings/:id", nflController.getStandings);
//Players endpoint Nothing
app.get("/NFL/players", nflController.getPlayers);
app.get("/NFL/players/:id", nflController.getScrapedPlayers);
app.get("/NFL/injuries/:id", nflController.getPlayerInjuries);
app.get("/NFL/top_players/:id", nflController.getTopPlayers);
app.get("/NFL/transactions/:id", nflController.getPlayerTransactions);
app.get("/NFL/headlines/:id", nflController.getHeadlines);

//articles api Calls
app.get("/news/:query", newsController.getNews);

app.get("/subreddit/:query", redditController.getSubreddit);
app.get("/subreddit/:query/:num", redditController.getSubreddit);

app.listen(process.env.PORT, () => {
  console.log(`Backend listening at http://localhost:${process.env.PORT}`);
});

//Makes new schedules
const daily_update_rule = new schedule.RecurrenceRule();
daily_update_rule.hour = 2;
daily_update_rule.minute = 0;

const schedule_games = () => {
   Promise.all([
      nba.initialize_data(live_games.nba),
      nfl.initialize_data(live_games.nfl),
      nhl.initialize_data(live_games.nhl),
      mlb.initialize_data(live_games.mlb)
   ]).then(values => {
      scheduled_games.nba = values[0];
      scheduled_games.nfl = values[1];
      scheduled_games.nhl = values[2];
      scheduled_games.mlb = values[3];
   })
}

schedule.scheduleJob(daily_update_rule, function(){
   console.log(`Made new schedules at: ${new Date()}`)
   schedule_games();
});

async function refreshLiveData(service, live_g) {
   let new_live_games = [];
   if(live_g.length > 0) { 
      for(let g of live_g) {
         const res = await service.cacheLiveUpdates(g.gId)
         if(res === true)
            new_live_games.push(g);
      }
   }

   live_g = new_live_games;
}

schedule.scheduleJob('*/2 * * * * *', function(){
   refreshLiveData(nhl, live_games.nhl);
   refreshLiveData(nba, live_games.nba);
   refreshLiveData(mlb, live_games.mlb);
   refreshLiveData(nfl, live_games.nfl);
});

schedule_games();
