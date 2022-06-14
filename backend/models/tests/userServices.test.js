/* -- Testing userServices */
const mongoose = require("mongoose");
const UserSchema = require("../user/userSchema");
const PrefSchema = require("../user/prefSchema");
const userServices = require("../user/userServices");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;
let conn;
let userModel;
let prefModel;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  conn = await mongoose.createConnection(uri, mongooseOpts);

  userModel = conn.model("user", UserSchema.schema);
  prefModel = conn.model("pref", PrefSchema.schema);

  userServices.setConnection(conn);
});

afterAll(async () => {
  await conn.dropDatabase();
  await conn.close();
  await mongoServer.stop();
});

beforeEach(async () => {
  // USER -- 1
  let user = {
    username: "ChuckNorris",
    email: "chuck@gmail.com",
  };

  let userToAdd = new userModel(user);

  let userPrefs = new prefModel({
    user: userToAdd._id,
    sports: {
      following: true,
    },
  });

  userToAdd.prefId = userPrefs._id;
  await userPrefs.save();

  userToAdd.setPassword("Sample$aa");
  await userToAdd.save();

  // USER -- 2
  user = {
    username: "Ted Lasso",
    email: "ted@email.com",
  };

  userToAdd = new userModel(user);

  userPrefs = new prefModel({
    user: userToAdd._id,
    sports: {
      following: true,
    },
  });

  userToAdd.prefId = userPrefs._id;
  await userPrefs.save();

  userToAdd.setPassword("Sampff2%f3le$aa");
  await userToAdd.save();

  // USER -- 3
  user = {
    username: "Larry Fare",
    email: "fare@yahoo.com",
  };

  userToAdd = new userModel(user);

  userPrefs = new prefModel({
    user: userToAdd._id,
    sports: {
      following: true,
    },
  });

  userToAdd.prefId = userPrefs._id;
  await userPrefs.save();

  userToAdd.setPassword("Samaffee@@ple$aa");
  await userToAdd.save();

  // USER -- 4
  user = {
    username: "Pepe Guardiola",
    email: "pepe@gmail.com",
  };

  userToAdd = new userModel(user);

  userPrefs = new prefModel({
    user: userToAdd._id,
    sports: {
      following: true,
    },
  });

  userToAdd.prefId = userPrefs._id;
  await userPrefs.save();

  userToAdd.setPassword("rwftg88ff2%f3le$aa");
  await userToAdd.save();
});

afterEach(async () => {
  await userModel.deleteMany();
});

test("Fetching all users -- Success", async () => {
  const users = await userServices.getUsers();
  expect(users).toBeDefined();
  expect(users.length).toBe(4);
});

test("Fetching users by username -- Success", async () => {
  const userName = "Ted Lasso";
  const users = await userServices.getUsers(userName);
  expect(users).toBeDefined();
  expect(users.length).toBeGreaterThan(0);
  users.forEach((user) => expect(user.username).toBe(userName));
});

test("Fetching users by username -- Failure", async () => {
  const userName = "Tommy Someone";
  const users = await userServices.getUsers(userName);
  expect(users).toBeDefined();
  expect(users.length).toBe(0);
});

test("Fetching users by email -- Success", async () => {
  const email = "ted@email.com";
  const users = await userServices.getUsers(undefined, email);
  expect(users).toBeDefined();
  expect(users.length).toBeGreaterThan(0);
  users.forEach((user) => expect(user.email).toBe(email));
});

test("Fetching users by email -- Failure", async () => {
  const email = "tommy@email.com";
  const users = await userServices.getUsers(undefined, email);
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
  let user = {
    username: "HarryPotter",
    email: "youngWizard@gmail.com",
    password: "Sample%%44*5",
  };

  let userToAdd = new userModel(user);

  userToAdd.setPassword("Sample%%44*5");
  const addedUser = await userToAdd.save();

  const foundUser = await userServices.findUserById(addedUser._id);
  expect(foundUser[0]).toBeDefined();
  expect(foundUser[0]._id).toStrictEqual(addedUser._id);
  expect(foundUser[0].username).toStrictEqual(addedUser.username);
  expect(foundUser[0].email).toStrictEqual(addedUser.email);
  expect(foundUser[0].validPassword("Sample%%44*5")).toBeTruthy();
  expect(foundUser[0].prefs).toBe(addedUser.prefs);
});

test("Deleting a user by Id -- successful path", async () => {
  let user = {
    username: "HarryPotter",
    email: "youngWizard@gmail.com",
    password: "Sample%%44*5",
  };

  let userToAdd = new userModel(user);

  userToAdd.setPassword("Sample$aa");
  const addedUser = await userToAdd.save();

  const deleteResult = await userModel.findOneAndDelete({ _id: addedUser.id });
  expect(deleteResult).toBeTruthy();
});

test("Deleting a user by Id -- inexisting id", async () => {
  const anyId = "6132b9d47cefd0cc1916b6a9";
  const deleteResult = await userModel.findOneAndDelete({ _id: anyId });
  expect(deleteResult).toBeNull();
});

test("Adding user w/o validation-- successful path", async () => {
  let user = {
    username: "HarryPotter",
    email: "youngWizard@gmail.com",
    password: "Srr$pffle%%44*5",
  };

  const result = await userServices.signUpUser(user);

  expect(result).toBeTruthy();
  expect(result.username).toBe(user.username);
  expect(result.email).toBe(user.email);
  expect(result.validPassword("Srr$pffle%%44*5")).toBeTruthy();
  expect(result).toHaveProperty("_id");
});

test("Adding user w/o validation -- success path with valid id", async () => {
  let user = {
    _id: "6132b9d47cefd0cc1916b6a9",
    username: "HarryPotter",
    email: "youngWizard@gmail.com",
    password: "dderr$pffle%%44*5",
  };

  const result = await userServices.signUpUser(user);
  expect(result).toBeTruthy();
});

test("Adding user w/o validation -- failure path with invalid id", async () => {
  let user = {
    _id: "123",
    username: "HarryPotter",
    email: "youngWizard@gmail.com",
    password: "dderr$pffle%%44*5",
  };

  const result = await userServices.signUpUser(user);
  expect(result).toBeFalsy();
});

test("Adding user w/o validation -- failure path with already taken id", async () => {
  let user = {
    username: "HarryPotter",
    email: "youngWizard@gmail.com",
    password: "dderr$pffle%%44*5",
  };
  const addedUser = await userServices.signUpUser(user);

  const anotheruser = {
    _id: addedUser.id,
    username: "Ron",
    email: "youngWizard2@gmail.com",
    password: "Sample%%44*5",
    prefs: { sports: {} },
  };
  const result = await userServices.signUpUser(anotheruser);
  expect(result).toBeFalsy();
});

test("Adding user  w/o validation-- success path with already taken username", async () => {
  const user = {
    username: "Harry Potter",
    email: "youngWizard@gmail.com",
    password: "Sample%%44*5",
  };
  const addedUser = await userServices.signUpUser(user);

  const anotheruser = {
    username: addedUser.username,
    email: "youngWizard2@gmail.com",
    password: "Sample%%44*5",
  };
  const result = await userServices.signUpUser(anotheruser);
  expect(result.username).toBe(user.username);
  expect(result.email).toBe(anotheruser.email);
  expect(result.validPassword(anotheruser.password));
});

test("Adding user w/o validation -- success path with already taken email", async () => {
  const user = {
    username: "Harry Potter",
    email: "youngWizard@gmail.com",
    password: "Sample%%44*5",
  };
  const addedUser = await userServices.signUpUser(user);

  const anotherUser = {
    username: "Ron",
    email: addedUser.email,
    password: "Sample%%44*5",
  };

  const result = await userServices.signUpUser(anotherUser);
  expect(result.username).toBe(anotherUser.username);
  expect(result.email).toBe(user.email);
  expect(result.validPassword(anotherUser.password));
});

test("Adding user w/o validation -- failure path with no username", async () => {
  const user = {
    email: "youngWizard@gmail.com",
    password: "Sample%%44*5",
  };

  const result = await userServices.signUpUser(user);
  expect(result).toBeFalsy();
});

test("Adding user w/o validation -- failure path with no email", async () => {
  const user = {
    username: "Harry Potter",
    password: "Sample%%44*5",
  };
  const result = await userServices.signUpUser(user);
  expect(result).toBeFalsy();
});

test("Logging in user -- Success", async () => {
  const user = {
    username: "Harry Potter",
    email: "youngWizard@gmail.com",
    password: "Sample%%44*5",
  };
  const result = await userServices.signUpUser(user);

  const loginResult = await userServices.login(user);

  expect(loginResult).toBeTruthy();
});

test("Logging in user -- Password Failure", async () => {
  const user = {
    username: "Harry Potter",
    email: "youngWizard@gmail.com",
    password: "Sample%%44*5",
  };
  const result = await userServices.signUpUser(user);
  user.password = "Differentpass55$";

  const loginResult = await userServices.login(user);

  expect(loginResult).toBeFalsy();
});

test("Logging in user -- Username Failure", async () => {
  const user = {
    username: "Harry Potter",
    email: "youngWizard@gmail.com",
    password: "Sample%%44*5",
  };
  const result = await userServices.signUpUser(user);
  user.username = "Ron";

  const loginResult = await userServices.login(user);

  expect(loginResult).toBeFalsy();
});

test("Logging in user -- no username Failure", async () => {
  const user = {
    email: "youngWizard@gmail.com",
    password: "Sample%%44*5",
  };
  const result = await userServices.signUpUser(user);

  const loginResult = await userServices.login(user);

  expect(loginResult).toBeFalsy();
});

test("Logging in user -- no email Failure", async () => {
  const user = {
    username: "Harry Potter",
    password: "Sample%%44*5",
  };
  const result = await userServices.signUpUser(user);

  const loginResult = await userServices.login(user);

  expect(loginResult).toBeFalsy();
});

test("Adding user w/o validation -- successful path", async () => {
  const user = {
    username: "Harry Potter",
    email: "youngWizard@gmail.com",
    password: "Sample%%44*5",
  };
  const result = await userServices.signUpUser(user);

  expect(result).toBeTruthy();
  expect(result.username).toBe(user.username);
  expect(result.email).toBe(user.email);
  expect(result.validPassword("Sample%%44*5")).toBeTruthy();
  expect(result).toHaveProperty("_id");
});

test("Adding user w/o validation -- failure path with invalid id", async () => {
  const user = {
    _id: "123",
    username: "Harry Potter",
    email: "youngWizard@gmail.com",
    password: "Sample%%44*5",
  };

  const result = await userServices.signUpUser(user);
  expect(result).toBeFalsy();
});

test("Adding user w/o validation -- failure path with already taken id", async () => {
  const user = {
    username: "Harry Potter",
    email: "youngWizard@gmail.com",
    password: "Sample%%44*5",
  };
  const addedUser = await userServices.signUpUser(user);

  const anotherUser = {
    _id: addedUser.id,
    username: "Ron",
    email: "youngWizard2@gmail.com",
    password: "Sample%%44*5",
  };
  const result = await userServices.signUpUser(anotherUser);
  expect(result).toBeFalsy();
});

test("Adding user  w/o validation -- success path with already taken username", async () => {
  const user = {
    username: "Harry Potter",
    email: "youngWizard@gmail.com",
    password: "Sample%%44*5",
  };
  const addedUser = await userServices.signUpUser(user);

  const anotherUser = {
    username: addedUser.username,
    email: "youngWizard2@gmail.com",
    password: "Sample%%44*5",
  };
  const result = await userServices.signUpUser(anotherUser);
  expect(result).toBeTruthy();
});

test("Adding user w/ validation -- success path with already taken email", async () => {
  const user = {
    username: "Harry Potter",
    email: "youngWizard@gmail.com",
    password: "Sample%%44*5",
  };
  const addedUser = await userServices.signUpUser(user);

  const anotherUser = {
    username: "Ron",
    email: addedUser.email,
    password: "Sample%%44*5",
  };

  const result = await userServices.signUpUser(anotherUser);
  expect(result).toBeTruthy();
});

test("Adding user w/o validation -- failure path with no username", async () => {
  const user = {
    email: "youngWizard@gmail.com",
    password: "Sample%%44*5",
  };

  const result = await userServices.signUpUser(user);
  expect(result).toBeFalsy();
});

test("Adding user w/o validation -- failure path with no email", async () => {
  const user = {
    username: "Harry Potter",
    password: "Sample%%44*5",
  };
  const result = await userServices.signUpUser(user);
  expect(result).toBeFalsy();
});

test("Getting user Preferences -- successful path", async () => {
  let user = {
    username: "HarryPotter",
    email: "youngWizard@gmail.com",
    password: "Srr$pffle%%44*5",
  };

  const resultUser = await userServices.signUpUser(user);
  const resultPref = await userServices.getUserPreferences(resultUser.username);

  expect(resultUser.prefs).toStrictEqual(resultPref.prefs._id);
  expect(resultUser._id).toStrictEqual(resultPref.prefs.user);
});

test("Getting user Preferences -- Failure path", async () => {
  let user = {
    username: "HarryPotter",
    email: "youngWizard@gmail.com",
    password: "Srr$pffle%%44*5",
  };

  const resultUser = await userServices.signUpUser(user);
  resultUser.username = "Ron";
  const resultPref = await userServices.getUserPreferences(resultUser.username);
  expect(resultPref).toBeNull();
});

test("Setting user Preferences -- Success path", async () => {
  let user = {
    username: "HarryPotter",
    email: "youngWizard@gmail.com",
    password: "Srr$pffle%%44*5",
  };

  let newPrefs = {
    sports: {
      NBA: {
        teams: [],
        following: true,
      },
      NHL: {
        teams: ["55"],
        following: true,
      },
    },
  };

  const resultUser = await userServices.signUpUser(user);
  const orginalPrefs = await userServices.getUserPreferences(
    resultUser.username
  );
  await userServices.setUserPreferences(resultUser.username, newPrefs);
  const newPref = await userServices.getUserPreferences(resultUser.username);

  console.log(orginalPrefs);
  expect(orginalPrefs.prefs.user).toStrictEqual(newPref.prefs.user);
  expect(orginalPrefs.prefs._id).toStrictEqual(newPref.prefs._id);
  expect(orginalPrefs.prefs.sports).not.toStrictEqual(newPref.prefs.sports);
});



test("Delete User -- Success path", async () => {
  const user = {
    username: "Harry Potter",
    email: "youngWizard@gmail.com",
    password: "Sample%%44*5",
  };
  const result = await userServices.signUpUser(user);

  let loginResult = await userServices.login(user);
  expect(loginResult).toBeTruthy();

  const deleteResult = await userServices.deleteUser(result);
  expect(deleteResult).toBeTruthy();

  loginResult = await userServices.login(user);
  expect(loginResult).toBeFalsy();

});

test("Delete User -- Failure path", async () => {
  const user = {
    username: "Harry Potter",
    email: "youngWizard@gmail.com",
    password: "Sample%%44*5",
  };
  const result = await userServices.signUpUser(user);

  let loginResult = await userServices.login(user);
  expect(loginResult).toBeTruthy();

  result.username = "Invalid";
  const deleteResult = await userServices.deleteUser(result);
  expect(deleteResult).toBeFalsy();

  loginResult = await userServices.login(user);
  expect(loginResult).toBeTruthy();

});

test("Validate User -- Success Path", async () => {
  const user = {
    username: "Harry Potter",
    email: "youngWizard@gmail.com",
    password: "Sample%%44*5",
  };
  //const result = await userServices.signUpUser(user);

  let validateResult = await userServices.validate(user);
  expect(validateResult).toBeTruthy();

});

test("Validate User -- Failure User Exists", async () => {
  const user = {
    username: "Harry Potter",
    email: "youngWizard@gmail.com",
    password: "Sample%%44*5",
  };
  const result = await userServices.signUpUser(user);

  let validateResult = await userServices.validate(user);
  expect(validateResult).toBeFalsy();

});



test("Validate User -- Failure Path", async () => {
  const user = {
    username: "Harry Potter",
    email: "youngWizard@gmail.com",
    password: "Sample%%44*5",
  };
  const result = await userServices.signUpUser(user);

  user.email = "notYoungwizard@gmail.com";
  let validateResult = await userServices.validate(user);
  expect(validateResult).toBeFalsy();

});

test("Get User Sports", async () => {
  const user = {
    username: "Harry Potter",
    email: "youngWizard@gmail.com",
    password: "Sample%%44*5",
  };
  let newPrefs = {
    sports: {
      NBA: {
        teams: [],
        following: true,
      },
      NHL: {
        teams: ["55"],
        following: true,
      },
    },
  };

  let userSportsReturn = {"MLB": {"teams": []}, "NBA": {"following": true, "teams": []}, "NFL": {"teams": []}, "NHL": {"following": true, "teams": ["55"]}};

  const resultUser = await userServices.signUpUser(user);
  await userServices.setUserPreferences(resultUser.username, newPrefs);

  const result = await userServices.signUpUser(user);

  let userSports = await userServices.getUserSports(user.username);
  expect(userSports.toJSON()).toStrictEqual(userSportsReturn);

});

test("Change Username -- Success Path", async () => {
  const user = {
    username: "Harry Potter",
    email: "youngWizard@gmail.com",
    password: "Sample%%44*5",
  };
  await userServices.signUpUser(user);

  user.newUsername = "Harry NotPotter";
  let newUsernameResult = await userServices.changeUsername(user);
  expect(newUsernameResult).toBeTruthy();

});
test("Change User name -- Failure Path", async () => {
  const user1  = {
    username: "Harry Potter",
    email: "youngWizard@gmail.com",
    password: "Sample%%44*5",
  };
  const user2 = {
    username: "Harry NotPotter",
    email: "youngWizard2@gmail.com",
    password: "Sample%%44*5",
  };
  await userServices.signUpUser(user1);
  await userServices.signUpUser(user2);

  user1.newUsername = "Harry NotPotter";
  let newUsernameResult = await userServices.changeUsername(user1);
  expect(newUsernameResult).toBeFalsy();

});

test("Change password -- Success", async () => {
  const user  = {
    username: "Harry Potter",
    email: "youngWizard@gmail.com",
    password: "Sample%%44*5",
  };

  let result = await userServices.signUpUser(user);

  user.newPassword = "SomethingffElse44";
  let newPasswordResult = await userServices.changePassword(user);
  
  let newResult = await userServices.findUserByUsername(user.username);
  expect(newPasswordResult).toBeTruthy();
  expect(newResult[0].username).toStrictEqual(result.username);
  expect(newResult[0].hash).not.toStrictEqual(result.hash);
  expect(newResult[0].salt).not.toStrictEqual(result.salt);
});

test("Change password -- Failure", async () => {
  const user  = {
    username: "Harry Potter",
    email: "youngWizard@gmail.com",
    password: "Sample%%44*5",
  };

  let result = await userServices.signUpUser(user);

  user.newPassword = "SomethingffElse44";
  user.username = "Harry NotPotter"
  let newPasswordResult = await userServices.changePassword(user);
  
  expect(newPasswordResult).toBeFalsy();
});
