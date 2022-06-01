const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const Games = require('../caching/games');
const Standings = require('../caching/standings');
const cacheServices = require('../caching/cachingServices');

let mongoServer;
let conn;
let standingsModel;
let gamesModel;

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
                currentQtr:"",
                maxQtr:"",
                away:"Minnesota Twins",
                away_code:"min",
                away_score:"2",
                away_record:"",
                home:"Detroit Tigers",
                home_code:"det",
                home_score:"8",
                home_record:"",
                startTimeUTC:"Ended",
                "date":new Date("2022-05-31T00:00:00.000+00:00"),
                "gId":"401355636"
            },
            {
                status:2,
                clock:"",
                halftime:"",
                arena:"",
                currentQtr:"",
                maxQtr:"",
                away:"Minnesota Twins",
                away_code:"min",
                away_score:"2",
                away_record:"",
                home:"New York Mets",
                home_code:"nyy",
                home_score:"4",
                home_record:"",
                startTimeUTC:"Started",
                "date":new Date("202-05-31T00:00:00.000+00:00"),
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


test("TESTING: Cached Games", async () => {
    let f = await cacheServices.getCachedGames("MLB");
    //console.log(f);
});

test("TESTING: Cached Standings", async () => {
    let f = await cacheServices.getCachedStandings("NFL");
    //console.log(f);
});