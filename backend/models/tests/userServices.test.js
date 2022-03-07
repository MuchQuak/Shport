/* -- Testing userServices */
const mongoose = require("mongoose");
const UserSchema = require("../userSchema");
const userServices = require("../userServices");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;
let conn;
let userModel;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  conn = await mongoose.createConnection(uri, mongooseOpts);

  userModel = conn.model("user", UserSchema.schema);

  userServices.setConnection(conn);
});

afterAll(async () => {
  await conn.dropDatabase();
  await conn.close();
  await mongoServer.stop();
});


beforeEach(async () => {
  let dummyUser = {
    username: "Chuck Norris",
    email: "chuck@gmail.com",
    prefs: {"NBA": [],
            "NHL": []}
  };
  let result = new userModel(dummyUser);
  result.setPassword("Sample$aa");
  await result.save();

  dummyUser = {
    username: "Ted Lasso",
    email: "ted@email.com",
    prefs: {"NBA": [],
    "NHL": []}
  };
  result = new userModel(dummyUser);
  result.setPassword("Sample$415aa");
  await result.save();

  dummyUser = {
    username: "Larry Fare",
    email: "fare@yahoo.com",
    prefs: {"NBA": [],
    "NHL": []}
  };
  result = new userModel(dummyUser);
  result.setPassword("Sap$Rw11aa");
  await result.save();

  dummyUser = {
    username: "Pepe Guardiola",
    email: "pepe@gmail.com",
    prefs: {"NBA": [],
    "NHL": []}
  };
  result = new userModel(dummyUser);
  result.setPassword("Sample$bc14a");
  await result.save();
});

afterEach(async () => {
  await userModel.deleteMany();
});


test("Fetching all users", async () => {
  const users = await userServices.TESTGetUsers();
  expect(users).toBeDefined();
  expect(users.length).toBeGreaterThan(0);
});

test("Fetching users by name", async () => {
  const userName = "Ted Lasso";
  const users = await userServices.TESTGetUsers(userName);
  expect(users).toBeDefined();
  expect(users.length).toBeGreaterThan(0);
  users.forEach((user) => expect(user.username).toBe(userName));
});


test("Fetching users by email", async () => {
  const email = "ted@email.com";
  const users = await userServices.TESTGetUsers(undefined, email);
  expect(users).toBeDefined();
  expect(users.length).toBeGreaterThan(0);
  users.forEach((user) => expect(user.email).toBe(email));
});