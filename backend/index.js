const cors = require("cors");
const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const cron = require('node-cron');

app.use(cors(
    {
      origin: "*",
      methods: "OPTIONS,GET,HEAD,PUT,PATCH,POST,DELETE",
      preflightContinue: false,
      optionsSuccessStatus: 204
    }
));
app.use(express.json());

// Models
const nhlServices = require("./models/sport/nhlServices");
const nbaServices = require("./models/sport/nbaServices");
const mlbServices = require("./models/sport/mlbServices");
const nflServices = require("./models/sport/nflServices");
const news = require("./models/news/newsServices");
const reddit = require("./models/reddit/redditServices");
const userServices = require("./models/user/userServices");
const sportInfoServices = require("./models/sport/sportInfoServices");

function generateAccessToken(username) {
  return jwt.sign({ username: username }, process.env.TOKEN_SECRET, {
    expiresIn: "60000s",
  });
}

function decode(req) {
  try {
    const authHeader = req.headers["authorization"];
    //Getting the 2nd part of the auth header (the token)
    const token = authHeader && authHeader.split(" ")[1];

    return jwt.verify(token, process.env.TOKEN_SECRET);
  } catch (error) {
    return false;
  }
}

app.get("/", (req, res) => {
  res.send("Backend Landing");
});

/* Using this funcion as a "middleware" function for
  all the endpoints that need access control protecion */
function authenticateUser(req, res, next) {
  const authHeader = req.headers["authorization"];
  //Getting the 2nd part of the auth hearder (the token)
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    console.log("No token received");
    return res.status(401).end();
  } else {
    try {
      jwt.verify(token, process.env.TOKEN_SECRET);
      next();
    } catch (error) {
      return res.status(401).end();
    }
  }
}

// User db calls
app.post("/signup", async (req, res) => {
  const user = req.body;

  if (!user.username && !user.password && !user.email) {
    res.status(400).send("Bad Request: Invalid input data");
  } else {
    if (!(await userServices.validate(user))) {
      res.status(409).send("Username or Email mail already taken");
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

app.get("/user/:username", async (req, res) => {
  const username = req.params["username"];
  if (username) {
    const userprefs = await userServices.getUserSports(username);
    if (userprefs) {
      res.status(200).send(userprefs);
      return;
    }
    res.status(404).end("User not found");
  }
});

app.get("/username", authenticateUser, async (req, res) => {
  const decodedUser = decode(req);
  if (decodedUser) {
    res.status(200).send(decodedUser.username);
  } else {
    res.status(404).end("User not found");
  }
});

// Delete user from database
app.delete("/username", async (req, res) => {
  const decodedUser = decode(req);
  if (decodedUser) {
    const deleted = await userServices.deleteUser(decodedUser);
    if (deleted){
      res.status(200).send("Deleted User");
    } else {
      res.status(400).end("Error! User not deleted");
    }
  } else {
    res.status(404).end("User not found");
  }
});

app.patch("/username", async (req, res) => {
  const decodedUser = decode(req);
  if (decodedUser) {
    decodedUser.newUsername = req.body.username;
    const updated = await userServices.changeUsername(decodedUser);
    if (updated){
      res.status(200).send("Changed Username");
    } else {
      res.status(400).end("Error! Username not changed");
    }
  } else {
    res.status(404).end("User not found");
  }
});

app.patch("/password", async (req, res) => {
  const decodedUser = decode(req);
  if (decodedUser) {
    decodedUser.newPassword = req.body.pass;
    const updated = await userServices.changePassword(decodedUser);
    if (updated){
      res.status(200).send("Changed Password");
    } else {
      res.status(400).end("Error! Password not changed");
    }
  } else {
    res.status(404).end("User not found");
  }
});

app.get("/theme", authenticateUser, async (req, res) => {
  const decodedUser = decode(req).username;
  const theme = (await userServices.getUserPreferences(decodedUser)).prefs
    .theme;
  if (decodedUser && theme) {
    res.status(200).send(theme);
  } else {
    res.status(404).end("User not found");
  }
});

// Validating Login
app.post("/login", async (req, res) => {
  const user = req.body;
  if (user.username && user.password) {
    const result = await userServices.login(user);
    if (result) {
      const token = generateAccessToken(user.username);
      res.status(201).send(token);
    } else {
      res.status(401).end("Unauthorized");
    }
  } else {
    res.status(400).end("Bad Request");
  }
});

// gettingPreferences
app.get("/preferences", authenticateUser, async (req, res) => {
  const decodedUser = decode(req);
  if (decodedUser) {
    const username = decodedUser.username;
    const userPref = await userServices.getUserPreferences(username);
    if (userPref) {
      res.status(201).send(userPref.prefs);
    }
  }
  res.status(500).end();
});

// changing preferences
app.post("/preferences", authenticateUser, async (req, res) => {
  const decodedUser = decode(req);
  if (decodedUser) {
    const username = decodedUser.username;
    const prefs = req.body;
    const userPref = await userServices.setUserPreferences(username, prefs);
    if (userPref) {
      res.status(201).send(userPref);
    }
  }
  res.status(500).end();
});

// changing theme
app.post("/theme", authenticateUser, async (req, res) => {
  const decodedUser = decode(req);
  if (decodedUser) {
    const username = decodedUser.username;
    const theme = req.body;
    const userPref = await userServices.setUserTheme(username, theme.theme);
    if (userPref) {
      res.status(201).send(userPref);
    }
  }
  res.status(500).end();
});

// -----------  Sport API Calls   ------------

app.get("/sport", async (req, res) => {
  await sportInfoServices.getSportsRequest(req, res);
});
app.get("/sport/:sport", async (req, res) => {
  await sportInfoServices.getSportRequest(req, res);
});
app.get("/sport/:sport/teams", async (req, res) => {
  await sportInfoServices.getTeamsRequest(req, res);
});

//NBA api Calls
let nba = new nbaServices.NbaService("https://data.nba.net");
app.get("/NBA/games", async (req, res) => {
  await nba.getGames(req, res);
});
app.get("/NBA/games/:offset", async (req, res) => {
  await nba.getGames(req, res);
});
app.get("/NBA/standings", async (req, res) => {
  await nba.getStandings(req, res);
});
app.get("/NBA/standings/:id", async (req, res) => {
  await nba.getStandings(req, res);
});

app.get("/NBA/players", async (req, res) => {
  await nba.getPlayers(req, res);

});
app.get("/NBA/players/:id", async (req, res) => {
    await nba.getScrapedPlayers(req.params["id"]).then((result) => {
      res.send(result);
  });
});

app.get("/NBA/injuries/:id", async (req, res) => {
    await nba.getScrapedInjuries(req.params["id"]).then((result) => {
      res.send(result);
  });
});

app.get("/NBA/top_players/:id", async (req, res) => {
    await nba.getScrapedTopPlayers(req.params["id"]).then((result) => {
      res.send(result);
  });
});

app.get("/NBA/transactions/:id", async (req, res) => {
    await nba.getScrapedTransactions(req.params["id"]).then((result) => {
      res.send(result);
  });
});

app.get("/NBA/headlines/:id", async (req, res) => {
  await nba.getScrapedHeadlines(req.params["id"]).then((result) => {
    res.send(result);
  });
});

//NHL api Calls
let nhl = new nhlServices.NhlService("https://statsapi.web.nhl.com");

app.get("/NHL/games", async (req, res) => {
  await nhl.getGames(req, res);
});
app.get("/NHL/games/:offset", async (req, res) => {
  await nhl.getGames(req, res);
});
app.get("/NHL/standings", async (req, res) => {
  await nhl.getStandings(req, res);
});
app.get("/NHL/standings/:id", async (req, res) => {
  await nhl.getStandings(req, res);
});

app.get("/NHL/players", async (req, res) => {
  res.send({});
});

app.get("/NHL/players/:id", async (req, res) => {
    await nhl.getScrapedPlayers(req.params["id"]).then((result) => {
      res.send(result);
  });
});

app.get("/NHL/injuries/:id", async (req, res) => {
    await nhl.getScrapedInjuries(req.params["id"]).then((result) => {
      res.send(result);
  });
});

app.get("/NHL/top_players/:id", async (req, res) => {
    await nhl.getScrapedTopPlayers(req.params["id"]).then((result) => {
      res.send(result);
  });
});

app.get("/NHL/transactions/:id", async (req, res) => {
    await nhl.getScrapedTransactions(req.params["id"]).then((result) => {
      res.send(result);
  });
});

app.get("/NHL/headlines/:id", async (req, res) => {
  await nhl.getScrapedHeadlines(req.params["id"]).then((result) => {
    res.send(result);
  });
});

//MLB api Calls Currently currently pulls nothing
let mlb = new mlbServices.MlbService("");
app.get("/MLB/games", async (req, res) => {
  await mlb.getGames(req, res);
});

app.get("/MLB/games/:offset", async (req, res) => {
  await mlb.getGames(req, res);
});
app.get("/MLB/standings", async (req, res) => {
  await mlb.getStandings(req, res);
});
app.get("/MLB/standings/:id", async (req, res) => {
  await mlb.getStandings(req, res);
});

app.get("/MLB/players", async (req, res) => {
  res.send({});
});

app.get("/MLB/players/:id", async (req, res) => {
    await mlb.getScrapedPlayers(req.params["id"]).then((result) => {
      res.send(result);
  });
});

app.get("/MLB/injuries/:id", async (req, res) => {
    await mlb.getScrapedInjuries(req.params["id"]).then((result) => {
      res.send(result);
  });
});

app.get("/MLB/top_players/:id", async (req, res) => {
    await mlb.getScrapedTopPlayers(req.params["id"]).then((result) => {
      res.send(result);
  });
});

app.get("/MLB/transactions/:id", async (req, res) => {
    await mlb.getScrapedTransactions(req.params["id"]).then((result) => {
      res.send(result);
  });
});

app.get("/MLB/headlines/:id", async (req, res) => {
  await mlb.getScrapedHeadlines(req.params["id"]).then((result) => {
    res.send(result);
  });
});

//NFL api Calls Currently pulls nothing
let nfl = new nflServices.NflService("");
app.get("/NFL/games", async (req, res) => {
  await nfl.getGames(req, res);
});
app.get("/NFL/games/:offset", async (req, res) => {
  await nfl.getGames(req, res);
});
app.get("/NFL/standings", async (req, res) => {
  await nfl.getStandings(req, res);
});

app.get("/NFL/standings/:id", async (req, res) => {
  await nfl.getStandings(req, res);
});

app.get("/NFL/players", async (req, res) => {
  res.send({});
});

app.get("/NFL/players/:id", async (req, res) => {
    await nfl.getScrapedPlayers(req.params["id"]).then((result) => {
      res.send(result);
  });
});
app.get("/NFL/injuries/:id", async (req, res) => {
    await nfl.getScrapedInjuries(req.params["id"]).then((result) => {
      res.send(result);
  });
});

app.get("/NFL/top_players/:id", async (req, res) => {
    await nfl.getScrapedTopPlayers(req.params["id"]).then((result) => {
      res.send(result);
  });
});

app.get("/NFL/transactions/:id", async (req, res) => {
    await nfl.getScrapedTransactions(req.params["id"]).then((result) => {
      res.send(result);
  });
});

app.get("/NFL/headlines/:id", async (req, res) => {
  await nfl.getScrapedHeadlines(req.params["id"]).then((result) => {
    res.send(result);
  });
});

//articles api Calls
//app.get('/news', async (req, res) => {await news.getNews(req, res)});
app.get("/news/:query", async (req, res) => {
  await news.getNews(req, res);
});

app.get("/subreddit/:query", async (req, res) => {
  await reddit.getSubreddit(req, res);
});

app.get("/subreddit/:query/:num", async (req, res) => {
  await reddit.getSubreddit(req, res);
});

app.listen(process.env.PORT, () => {
  console.log(`Backend listening at http://localhost:${process.env.PORT}`);
});

//Schedule repull every minute
cron.schedule('* * * * *', () => {
  console.log("Cached All Data at: " + new Date())
  nba.cacheAllData();
  nfl.cacheAllData();
  nhl.cacheAllData();
  mlb.cacheAllData();
});

//Intial Cache
nba.cacheAllData();
nfl.cacheAllData();
nhl.cacheAllData();
mlb.cacheAllData();