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
    "username": "Chuck Norris",
    "email": "chuck@gmail.com",
    "prefs": {"sports":{}}
  };
  let result = new userModel(dummyUser);
  result.setPassword("Sample$aa");
  await result.save();

  dummyUser = {
    "username": "Ted Lasso",
    "email": "ted@email.com",
    "prefs": {"sports":{}}
  };
  result = new userModel(dummyUser);
  result.setPassword("Sample$415aa");
  await result.save();

  dummyUser = {
    "username": "Larry Fare",
    "email": "fare@yahoo.com",
    "prefs": {"sports":{}}
  };
  result = new userModel(dummyUser);
  result.setPassword("Sap$Rw11aa");
  await result.save();

  dummyUser = {
    "username": "Pepe Guardiola",
    "email": "pepe@gmail.com",
    "prefs": {"sports":{}}
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

test("Fetching users by username -- Success", async () => {
  const userName = "Ted Lasso";
  const users = await userServices.TESTGetUsers(userName);
  expect(users).toBeDefined();
  expect(users.length).toBeGreaterThan(0);
  users.forEach((user) => expect(user.username).toBe(userName));
});

test("Fetching users by username -- Failure", async () => {
  const userName = "Tommy Someone";
  const users = await userServices.TESTGetUsers(userName);
  expect(users).toBeDefined();
  expect(users.length).toBe(0);
});

test("Fetching users by email -- Success", async () => {
  const email = "ted@email.com";
  const users = await userServices.TESTGetUsers(undefined, email);
  expect(users).toBeDefined();
  expect(users.length).toBeGreaterThan(0);
  users.forEach((user) => expect(user.email).toBe(email));
});

test("Fetching users by email -- Failure", async () => {
  const email = "tommy@email.com";
  const users = await userServices.TESTGetUsers(undefined, email);
  expect(users).toBeDefined();
  expect(users.length).toBe(0);
});

test("Fetching by invalid id format", async () => {
  const anyId = "123";
  const user = await userServices.findUserById(anyId);
  expect(user).toBeUndefined();
});


test("Fetching by valid id and not finding", async () => {
  const anyId = "6132b9d47cefd0cc1916b6a9";
  const user = await userServices.findUserById(anyId);
  expect(user.length).toBe(0);
});

test("Fetching by valid id and finding", async () => {
  const dummyUser = {
    "username": "Harry Potter",
    "email": "youngWizard@gmail.com",
    "password": "Sample%%44*5",
    "prefs" : {"sports" : {}}

  };
  
  const result = await userServices.validateAndSignUp(dummyUser);
  const addedUser = await result.save();

  const foundUser = await userServices.findUserById(addedUser._id);
  expect(foundUser[0]).toBeDefined();
  expect(foundUser[0]._id).toStrictEqual(addedUser._id);
  expect(foundUser[0].username).toStrictEqual(addedUser.username);
  expect(foundUser[0].email).toStrictEqual(addedUser.email);
  expect(foundUser[0].validPassword("Sample%%44*5")).toBeTruthy();
  //expect(foundUser[0].prefs).toBe(addedUser.prefs);
});

test("Deleting a user by Id -- successful path", async () => {
  const dummyUser = {
    "username": "Harry Potter",
    "email": "youngWizard@gmail.com",
    "password": "Sample%%44*5",
    "prefs" : {"sports" : {}}

  };
  const result = new userModel(dummyUser);
  const addedUser = await result.save();
  const deleteResult = await userModel.findOneAndDelete({ _id: addedUser.id });
  expect(deleteResult).toBeTruthy();
});

test("Deleting a user by Id -- inexisting id", async () => {
  const anyId = "6132b9d47cefd0cc1916b6a9";
  const deleteResult = await userModel.findOneAndDelete({ _id: anyId });
  expect(deleteResult).toBeNull();
});


test("Adding user w/ validation-- successful path", async () => {
  const dummyUser = {
    "username": "Harry Potter",
    "email": "youngWizard@gmail.com",
    "password": "Sample%%44*5",
    "prefs" : {"sports" : {}}

  };
  const result = await userServices.validateAndSignUp(dummyUser);

  expect(result).toBeTruthy();
  expect(result.username).toBe(dummyUser.username);
  expect(result.email).toBe(dummyUser.email);
  expect(result.validPassword("Sample%%44*5")).toBeTruthy();
  expect(result).toHaveProperty("_id");
});

test("Adding user w/ validation -- failure path with invalid id", async () => {
  const dummyUser = {
    "_id": "123",
    "username": "Harry Potter",
    "email": "youngWizard@gmail.com",
    "password": "Sample%%44*5",
    "prefs" : {"sports" : {}}
  };
  const result = await userServices.validateAndSignUp(dummyUser);
  expect(result).toBeFalsy();
});

test("Adding user w/ validation -- failure path with already taken id", async () => {
  const dummyUser = {
    "username": "Harry Potter",
    "email": "youngWizard@gmail.com",
    "password": "Sample%%44*5",
    "prefs" : {"sports" : {}}

  };
  const addedUser = await userServices.validateAndSignUp(dummyUser);

  const anotherDummyUser = {
    "_id": addedUser.id,
    "username": "Ron",
    "email": "youngWizard2@gmail.com",
    "password": "Sample%%44*5",
    "prefs" : {"sports" : {}}

  };
  const result = await userServices.validateAndSignUp(anotherDummyUser);
  expect(result).toBeFalsy();
});


test("Adding user  w/ validation-- failure path with already taken username", async () => {
  const dummyUser = {
    "username": "Harry Potter",
    "email": "youngWizard@gmail.com",
    "password": "Sample%%44*5",
    "prefs" : {"sports" : {}}
  };
  const addedUser = await userServices.validateAndSignUp(dummyUser);

  const anotherDummyUser = {
    "username": addedUser.username,
    "email": "youngWizard2@gmail.com",
    "password": "Sample%%44*5",
    "prefs" : {"sports" : {}}
  };
  const result = await userServices.validateAndSignUp(anotherDummyUser);
  expect(result).toBeFalsy();
});

test("Adding user w/ validation -- failure path with already taken email", async () => {
  const dummyUser = {
    "username": "Harry Potter",
    "email": "youngWizard@gmail.com",
    "password": "Sample%%44*5",
    "prefs" : {"sports" : {}}
  };
  const addedUser = await userServices.validateAndSignUp(dummyUser);

  const anotherDummyUser = {
    "username": "Ron",
    "email": addedUser.email,
    "password": "Sample%%44*5",
    "prefs" : {"sports" : {}}
  };

  const result = await userServices.validateAndSignUp(anotherDummyUser);
  expect(result).toBeFalsy();
});


test("Adding user w/ validation -- failure path with no username", async () => {
  const dummyUser = {
    "email": "youngWizard@gmail.com",
    "password": "Sample%%44*5",
    "prefs" : {"sports" : {}}
  }

  const result = await userServices.validateAndSignUp(dummyUser);
  expect(result).toBeFalsy();
});

test("Adding user w/ validation -- failure path with no email", async () => {
  const dummyUser = {
    "username": "Harry Potter",
    "password": "Sample%%44*5",
    "prefs" : {"sports" : {}}
    };
  const result = await userServices.validateAndSignUp(dummyUser);
  expect(result).toBeFalsy();
});

test("Adding user w/ validation-- failure path with no prefs", async () => {
  const dummyUser = {
    "username": "Harry Potter",
    "email": "youngWizard@gmail.com",
    "password": "Sample%%44*5"

  }
  const result = await userServices.validateAndSignUp(dummyUser);
  expect(result).toBeFalsy();
});

test("Logging in user -- Success", async () => {
  const dummyUser = {
    "username": "Harry Potter",
    "email": "youngWizard@gmail.com",
    "password": "Sample%%44*5",
    "prefs" : {"sports" : {}}
  };
  const result = await userServices.validateAndSignUp(dummyUser);

  const loginResult = await userServices.login(dummyUser);

  expect(loginResult).toBeTruthy();
});

test("Logging in user -- Password Failure", async () => {
  const dummyUser = {
    "username": "Harry Potter",
    "email": "youngWizard@gmail.com",
    "password": "Sample%%44*5",
    "prefs" : {"sports" : {}}
  };
  const result = await userServices.validateAndSignUp(dummyUser);
  dummyUser.password = "Differentpass55$";

  const loginResult = await userServices.login(dummyUser);

  expect(loginResult).toBeFalsy();
});

test("Logging in user -- Username Failure", async () => {
  const dummyUser = {
    "username": "Harry Potter",
    "email": "youngWizard@gmail.com",
    "password": "Sample%%44*5",
    "prefs" : {"sports" : {}}
  };
  const result = await userServices.validateAndSignUp(dummyUser);
  dummyUser.username = "Ron";

  const loginResult = await userServices.login(dummyUser);

  expect(loginResult).toBeFalsy();
});

test("Logging in user -- no username Failure", async () => {
  const dummyUser = {
    "email": "youngWizard@gmail.com",
    "password": "Sample%%44*5",
    "prefs" : {"sports" : {}}
  };
  const result = await userServices.validateAndSignUp(dummyUser);

  const loginResult = await userServices.login(dummyUser);

  expect(loginResult).toBeFalsy();
});

test("Logging in user -- no email Failure", async () => {
  const dummyUser = {
    "username": "Harry Potter",
    "password": "Sample%%44*5",
    "prefs" : {"sports" : {}}
  };
  const result = await userServices.validateAndSignUp(dummyUser);
  

  const loginResult = await userServices.login(dummyUser);

  expect(loginResult).toBeFalsy();
});


test("Adding user w/o validation -- successful path", async () => {
  const dummyUser = {
    "username": "Harry Potter",
    "email": "youngWizard@gmail.com",
    "password": "Sample%%44*5",
    "prefs" : {"sports" : {}}

  };
  const result = await userServices.signUpUser(dummyUser);

  expect(result).toBeTruthy();
  expect(result.username).toBe(dummyUser.username);
  expect(result.email).toBe(dummyUser.email);
  expect(result.validPassword("Sample%%44*5")).toBeTruthy();
  expect(result).toHaveProperty("_id");
});

test("Adding user w/o validation -- failure path with invalid id", async () => {
  const dummyUser = {
    "_id": "123",
    "username": "Harry Potter",
    "email": "youngWizard@gmail.com",
    "password": "Sample%%44*5",
    "prefs" : {"sports" : {}}

  };
  const result = await userServices.signUpUser(dummyUser);
  expect(result).toBeFalsy();
});

test("Adding user w/o validation -- failure path with already taken id", async () => {
  const dummyUser = {
    "username": "Harry Potter",
    "email": "youngWizard@gmail.com",
    "password": "Sample%%44*5",
    "prefs" : {"sports" : {}}

  };
  const addedUser = await userServices.signUpUser(dummyUser);

  const anotherDummyUser = {
    "_id": addedUser.id,
    "username": "Ron",
    "email": "youngWizard2@gmail.com",
    "password": "Sample%%44*5",
    "prefs" : {"sports" : {}}

  };
  const result = await userServices.signUpUser(anotherDummyUser);
  expect(result).toBeFalsy();
});


test("Adding user  w/o validation -- success path with already taken username", async () => {
  const dummyUser = {
    "username": "Harry Potter",
    "email": "youngWizard@gmail.com",
    "password": "Sample%%44*5",
    "prefs" : {"sports" : {}}
  };
  const addedUser = await userServices.signUpUser(dummyUser);

  const anotherDummyUser = {
    "username": addedUser.username,
    "email": "youngWizard2@gmail.com",
    "password": "Sample%%44*5",
    "prefs" : {"sports" : {}}
  };
  const result = await userServices.signUpUser(anotherDummyUser);
  expect(result).toBeTruthy();
});

test("Adding user w/ validation -- success path with already taken email", async () => {
  const dummyUser = {
    "username": "Harry Potter",
    "email": "youngWizard@gmail.com",
    "password": "Sample%%44*5",
    "prefs" : {"sports" : {}}
  };
  const addedUser = await userServices.signUpUser(dummyUser);

  const anotherDummyUser = {
    "username": "Ron",
    "email": addedUser.email,
    "password": "Sample%%44*5",
    "prefs" : {"sports" : {}}
  };

  const result = await userServices.signUpUser(anotherDummyUser);
  expect(result).toBeTruthy();
});


test("Adding user w/o validation -- failure path with no username", async () => {
  const dummyUser = {
    "email": "youngWizard@gmail.com",
    "password": "Sample%%44*5",
    "prefs" : {"sports" : {}}
  }

  const result = await userServices.signUpUser(dummyUser);
  expect(result).toBeFalsy();
});

test("Adding user w/o validation -- failure path with no email", async () => {
  const dummyUser = {
    "username": "Harry Potter",
    "password": "Sample%%44*5",
    "prefs" : {"sports" : {}}
    };
  const result = await userServices.signUpUser(dummyUser);
  expect(result).toBeFalsy();
});

test("Adding user w/o validation-- failure path with no prefs", async () => {
  const dummyUser = {
    "username": "Harry Potter",
    "email": "youngWizard@gmail.com",
    "password": "Sample%%44*5"

  }
  const result = await userServices.signUpUser(dummyUser);
  expect(result).toBeFalsy();
});