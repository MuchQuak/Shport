const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mlbServices = require("../sport/mlbServices");
const Games = require('../caching/games');
const Standings = require('../caching/standings');
const cacheServices = require('../caching/cachingServices');

let mongoServer;
let conn;
let standingsModel;
let gamesModel;
let mlb;
let spy;

const today = new Date(Date.now());
const utc_today = new Date(Date.UTC(
   today.getUTCFullYear(), 
   today.getUTCMonth(), 
   today.getUTCDate(), 
   today.getUTCHours(), 
   today.getUTCMinutes(), 0))

let games =  [
   {
      status:1,
      clock:"",
      halftime:"",
      arena:"",
      currentQtr:"",
      maxQtr:"",
      away:"San Diego Padres",
      away_code:"min",
      away_score:"2",
      away_record:"",
      home:"Detroit Tigers",
      home_code:"det",
      home_score:"5",
      home_record:"",
      startTimeUTC: today,
      date:today,
      gId:"4221355636"
   },
   {
      status:1,
      clock:"",
      halftime:"",
      arena:"",
      currentQtr:"",
      maxQtr:"",
      away:"Boston Red Fox",
      away_code:"min",
      away_score:"2",
      away_record:"",
      home:"New York Mets",
      home_code:"nyy",
      home_score:"4",
      home_record:"",
      startTimeUTC: today,
      date:today,
      gId:"4335636"
   },
   {
      status:0,
      clock:"",
      halftime:"",
      arena:"",
      currentQtr:"",
      maxQtr:"",
      away:"Boston Red Fox",
      away_code:"min",
      away_score:"2",
      away_record:"",
      home:"New York Mets",
      home_code:"nyy",
      home_score:"4",
      home_record:"",
      startTimeUTC: today,
      date:today,
      gId:"4335636"
   }
];

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  conn = await mongoose.createConnection(uri, mongooseOpts);

  standingsModel = conn.model("standingsCache", Standings.schema);
  gamesModel = conn.model("gamesCache", Games.schema);

  cacheServices.setConnection(conn)
  mlb = new mlbServices.MlbService('');
  spy = jest.spyOn(mlb, 'cacheAllData').mockImplementation(() => 'Hello');
});

afterAll(async () => {
  await conn.dropDatabase();
  await conn.close();
  await mongoServer.stop();
});

beforeEach(async () => {
    let gamesData = {
        "sport":"MLB",
        "games": [
            {
                status:2,
                clock:"",
                halftime:"",
                arena:"",
                currentQtr:0,
                maxQtr:4,
                away:"Minnesota Twins",
                away_code:"min",
                away_score:"2",
                away_record:"",
                home:"Detroit Tigers",
                home_code:"det",
                home_score:"8",
                home_record:"",
                startTimeUTC:"Ended",
                "date":today,
                "gId":"401355636"
            },
            {
                status:1,
                clock:"",
                halftime:"",
                arena:"",
                currentQtr:1,
                maxQtr:4,
                away:"Minnesota Twins",
                away_code:"min",
                away_score:"2",
                away_record:"",
                home:"New York Mets",
                home_code:"nyy",
                home_score:"4",
                home_record:"",
                startTimeUTC:utc_today.toString(),
                "date":today,
                "gId":"4055636"
                }
            ]
        };
    let games = new gamesModel(gamesData); 
    await games.save();
        
    let standingsData = {
        "sport":"NFL",
        "__v":0,
        standings:{
            "teams":{},
            "BUF":{
                "name":"Buffalo Bills",
                "city":"",
                "code":"BUF",
                "espn":"BUF",
                "rank":"1",
                "wins":"11",
                "losses":"6",
                "conference":"AFC East",
            },
            "NE":{
                "name":"New England Patriots",
                "city":"",
                "code":"NE",
                "espn":"NE",
                "rank":"2",
                "wins":"10",
                "losses":"7",
                "conference":"AFC East"
            }
        }
    }

    let standings = new standingsModel(standingsData);
    await standings.save();

});  


test("TESTING: Cached Games Length", async () => {
    let sport = "MLB"
    let cachedGames = await cacheServices.getCachedGames(sport);
    expect(cachedGames.length).toBe(2)

});

test("TESTING: Cached Games", async () => {
    let sport = "MLB"
    let cachedGames = await cacheServices.getCachedGames(sport);

    let game = cachedGames[0];

    expect(game)
    expect(game.status).toBe(2);
    expect(game.clock).toBe("");
    expect(game.halftime).toBe("");
    expect(game.arena).toBe("");
    expect(game.currentQtr).toBe(0);
    expect(game.maxQtr).toBe(4);
    expect(game.away).toStrictEqual("Minnesota Twins");
    expect(game.away_code).toBe("min");
    expect(game.away_score).toBe(2);
    expect(game.away_record).toBe("");
    expect(game.home).toStrictEqual("Detroit Tigers");
    expect(game.home_code).toBe("det");
    expect(game.home_score).toBe(8);
    expect(game.home_record).toBe("");
    expect(game.startTimeUTC).toBe("Ended");
    expect(game.date).toStrictEqual(today);
    expect(game.gId).toStrictEqual(401355636);
});

test("TESTING: Cached Standings", async () => {
    let sport = "NFL";
    let standings = await cacheServices.getCachedStandings(sport);

    let buf = standings.BUF;
    
    expect(buf.name).toStrictEqual("Buffalo Bills");
    expect(buf.city).toStrictEqual("");
    expect(buf.code).toStrictEqual("BUF");
    expect(buf.espn).toStrictEqual("BUF")
    expect(buf.rank).toStrictEqual("1");
    expect(buf.wins).toStrictEqual("11");
    expect(buf.losses).toStrictEqual("6");
    expect(buf.conference).toStrictEqual("AFC East");

});

test("TESTING: Cached Standings", async () => {
    let sport = "NFL";
    let newStandings = {
        "NYG":{
            "name":"New York Giants",
            "city":"",
            "code":"NYG",
            "espn":"NYG",
            "rank":"5",
            "wins":"2",
            "losses":"2",
            "conference":"AFC West",
        },
        "SH":{
            "name":"Seattle Seahawks",
            "city":"",
            "code":"SH",
            "espn":"SH",
            "rank":"1",
            "wins":"5",
            "losses":"2",
            "conference":"AFC North"
        }
    }
    
    let newStandingsInfo = await cacheServices.cacheStandings(sport, newStandings);
    expect(newStandingsInfo.acknowledged).toBeTruthy();

    let standingsFromDB = await cacheServices.getCachedStandings(sport);

    let nyg = standingsFromDB.NYG;
    
    expect(nyg.name).toStrictEqual("New York Giants");
    expect(nyg.city).toStrictEqual("");
    expect(nyg.code).toStrictEqual("NYG");
    expect(nyg.espn).toStrictEqual("NYG")
    expect(nyg.rank).toStrictEqual("5");
    expect(nyg.wins).toStrictEqual("2");
    expect(nyg.losses).toStrictEqual("2");
    expect(nyg.conference).toStrictEqual("AFC West");

});

test("TESTING: createGameCachingSchedule", async () => {
   let live_games = []
   let res = cacheServices.createGameCachingSchedule(games, mlb, live_games);
   expect(Array.isArray(live_games)).toBeTruthy();
   expect(live_games.length).toBe(2);
   expect(res.length).toBe(1);
})


test("TESTING: Cached Games", async () => {
    let sport = "MLB";
    let newGames =  [
        {
            status:2,
            clock:"",
            halftime:"",
            arena:"",
            currentQtr:0,
            maxQtr:4,
            away:"San Diego Padres",
            away_code:"min",
            away_score:"2",
            away_record:"",
            home:"Detroit Tigers",
            home_code:"det",
            home_score:"5",
            home_record:"",
            startTimeUTC:"Started",
            "date":today,
            "gId":"4221355636"
        },
        {
            status:1,
            clock:"",
            halftime:"",
            arena:"",
            currentQtr:3,
            maxQtr:4,
            away:"Boston Red Fox",
            away_code:"min",
            away_score:"2",
            away_record:"",
            home:"New York Mets",
            home_code:"nyy",
            home_score:"4",
            home_record:"",
            startTimeUTC:"Middle",
            "date": today,
            "gId":"4335636"
            }
        ];

    let newGamesInfo = await cacheServices.cacheGames(sport, newGames);
   console.log(newGamesInfo)
    expect(newGamesInfo.acknowledged).toBeTruthy();

    let gamesFromDB = await cacheServices.getCachedGames(sport);     
    
    let game1 = gamesFromDB[0];

    expect(game1)
    expect(game1.status).toBe(2);
    expect(game1.clock).toBe("");
    expect(game1.halftime).toBe("");
    expect(game1.arena).toBe("");
    expect(game1.currentQtr).toBe(0);
    expect(game1.maxQtr).toBe(4);
    expect(game1.away).toStrictEqual("San Diego Padres");
    expect(game1.away_code).toBe("min");
    expect(game1.away_score).toBe(2);
    expect(game1.away_record).toBe("");
    expect(game1.home).toStrictEqual("Detroit Tigers");
    expect(game1.home_code).toBe("det");
    expect(game1.home_score).toBe(5);
    expect(game1.home_record).toBe("");
    expect(game1.startTimeUTC).toBe("Started");
    expect(game1.date).toStrictEqual(today);
    expect(game1.gId).toStrictEqual(4221355636);

});
