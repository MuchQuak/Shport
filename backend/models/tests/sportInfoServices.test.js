/* -- Testing sportInfoServices */
const mongoose = require("mongoose");
const axios = require('axios');
const sportSchema = require("../sportSchema");
const sportsInfoServices = require("../sportInfoServices");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;
let conn;
let sportModel;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  conn = await mongoose.createConnection(uri, mongooseOpts);

  sportModel = conn.model("sports", sportSchema.schema);

  sportsInfoServices.setConnection(conn);
});

afterAll(async () => {
  await conn.dropDatabase();
  await conn.close();
  await mongoServer.stop();
});


beforeEach(async () => {
  let dummySport = {
    sport:"NBA",
    teams: []
  };
  let result = new sportModel(dummySport);
  await result.save();
  
  dummySport = {
    sport:"NHL",
    teams: ["l"]
  };
  result = new sportModel(dummySport);
  await result.save();

});

afterEach(async () => {
  await sportModel.deleteMany();
});

test("Fetch all sports", async () => {
  let allSports = await sportsInfoServices.getSports();
  expect(allSports.length).toBeGreaterThan(0);
});


test("Fetch One Sport -- Success", async () => {
  let sport = "NBA";
  let sportFetched = await sportsInfoServices.getSport(sport);
 
  expect(sportFetched).toBeDefined();
  expect(sportFetched.sport).toBe(sport);
});


test("Fetch One Sport -- Failure", async () => {
  let sport = "FIFA";
  let sportFetched = await sportsInfoServices.getSport(sport);
  expect(sportFetched).toBeFalsy();
});
/*
test("Fetch Teams By Sport -- Success", async () => {
  let sport = "NHL";
  let sportFetched = await sportsInfoServices.getTeams(sport);
  expect(sportFetched.teams.length).toBeGreaterThan(0);
});

test("Fetch Teams By Sport -- Failure", async () => {
  let sport = "FIFA";
  let sportFetched = await sportsInfoServices.getTeams(sport);
  expect(sportFetched).toBeFalsy();
});

/*
// Can't test the endpoints
test("Fetch Teams By SportRequest", async () => {
  let res = new Response();
  let sportsRequest = await sportsInfoServices.getSportsRequest("",res);
  expect(sportsRequest).toBeFalsy();
});*/