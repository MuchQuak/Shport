/* -- Testing sportInfoServices */
const mongoose = require("mongoose");
const axios = require("axios");
const sportSchema = require("../sport/sportSchema");
const sportsInfoServices = require("../sport/sportInfoServices");
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
    sport: "NBA",
    teams: [
      {
        code: "ATL",
        city: "Atlanta",
        name: "Hawks",
      },
      {
        code: "GSW",
        city: "Golden State",
        name: "Warriors",
      },
      {
        code: "LAL",
        city: "Los Angeles",
        name: "Lakers",
      },
    ],
  };
  let result = new sportModel(dummySport);
  await result.save();

  dummySport = {
    sport: "NHL",
    teams: [
      {
        code: "13",
        city: "Florida",
        name: "Panthers",
      },
      {
        code: "7",
        city: "Buffalo",
        name: "Sabres",
      },
      {
        code: "28",
        city: "San Jose",
        name: "Sharks",
      },
    ],
  };
  result = new sportModel(dummySport);
  await result.save();
});

afterEach(async () => {
  await sportModel.deleteMany();
});

test("Fetch all sports", async () => {
  let allSports = await sportsInfoServices.getSports();
  expect(allSports.length).toBe(2);
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

test("Fetch Teams By Sport -- Success", async () => {
  let sport = "NHL";
  let sportFetched = await sportsInfoServices.getTeams(sport);
  expect(sportFetched.length).toBe(3);
});

test("Fetch Teams By Sport -- Failure", async () => {
  let sport = "FIFA";
  let sportFetched = await sportsInfoServices.getTeams(sport);
  expect(sportFetched).toBeFalsy();
});