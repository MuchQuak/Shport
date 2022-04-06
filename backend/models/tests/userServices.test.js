/* -- Testing userServices */
const mongoose = require("mongoose");
const mockingoose = require("mockingoose");

const UserSchema = require("../user/userSchema");
const PrefSchema = require("../user/prefSchema");
const userServices = require("../user/userServices");

let userModel;
let prefModel;

beforeAll(async () => {
  userModel = mongoose.model("user", UserSchema.schema);
  prefModel = mongoose.model("pref", PrefSchema.schema);
});

afterAll(async () => {

});

beforeEach(async () => {
  jest.clearAllMocks();
  mockingoose.resetAll();
});

afterEach(async () => {

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
    "username": "HarryPotter",
    "email": "youngWizard@gmail.com",
    "password": "Sample%%44*5",
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

test("Adding user w/o validation-- successful path", async () => {
  let user = {
    "username": "HarryPotter",
    "email": "youngWizard@gmail.com",
    "password": "Srr$pffle%%44*5"
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
    "_id":"6132b9d47cefd0cc1916b6a9",
    "username": "HarryPotter",
    "email": "youngWizard@gmail.com",
    "password": "dderr$pffle%%44*5",
  };

  const result = await userServices.signUpUser(user);
  expect(result).toBeTruthy();
});

test("Adding user w/o validation -- failure path with invalid id", async () => {
  let user = {
    "_id":"123",
    "username": "HarryPotter",
    "email": "youngWizard@gmail.com",
    "password": "dderr$pffle%%44*5",
  };

  const result = await userServices.signUpUser(user);
  expect(result).toBeFalsy();
});

test("Adding user w/o validation -- failure path with already taken id", async () => {
  let user = {
    "username": "HarryPotter",
    "email": "youngWizard@gmail.com",
    "password": "dderr$pffle%%44*5",
  };
  const addedUser = await userServices.signUpUser(user);

  const anotheruser = {
    "_id": addedUser.id,
    "username": "Ron",
    "email": "youngWizard2@gmail.com",
    "password": "Sample%%44*5",
    "prefs" : {"sports" : {}}

  };
  const result = await userServices.signUpUser(anotheruser);
  expect(result).toBeFalsy();
});


test("Adding user  w/o validation-- success path with already taken username", async () => {
  const user = {
    "username": "Harry Potter",
    "email": "youngWizard@gmail.com",
    "password": "Sample%%44*5"
  };
  const addedUser = await userServices.signUpUser(user);

  const anotheruser = {
    "username": addedUser.username,
    "email": "youngWizard2@gmail.com",
    "password": "Sample%%44*5"
  };
  const result = await userServices.signUpUser(anotheruser);
  expect(result.username).toBe(user.username);
  expect(result.email).toBe(anotheruser.email);
  expect(result.validPassword(anotheruser.password));
});

test("Adding user w/o validation -- success path with already taken email", async () => {
  const user = {
    "username": "Harry Potter",
    "email": "youngWizard@gmail.com",
    "password": "Sample%%44*5"
  };
  const addedUser = await userServices.signUpUser(user);

  const anotherUser = {
    "username": "Ron",
    "email": addedUser.email,
    "password": "Sample%%44*5"
  };

  const result = await userServices.signUpUser(anotherUser);
  expect(result.username).toBe(anotherUser.username);
  expect(result.email).toBe(user.email);
  expect(result.validPassword(anotherUser.password));});


test("Adding user w/o validation -- failure path with no username", async () => {
  const user = {
    "email": "youngWizard@gmail.com",
    "password": "Sample%%44*5",
  }

  const result = await userServices.signUpUser(user);
  expect(result).toBeFalsy();
});

test("Adding user w/o validation -- failure path with no email", async () => {
  const user = {
    "username": "Harry Potter",
    "password": "Sample%%44*5",
    };
  const result = await userServices.signUpUser(user);
  expect(result).toBeFalsy();
});

test("Logging in user -- Success", async () => {
  const user = {
    "username": "Harry Potter",
    "email": "youngWizard@gmail.com",
    "password": "Sample%%44*5",
  };
  const result = await userServices.signUpUser(user);

  const loginResult = await userServices.login(user);

  expect(loginResult).toBeTruthy();
});

test("Logging in user -- Password Failure", async () => {
  const user = {
    "username": "Harry Potter",
    "email": "youngWizard@gmail.com",
    "password": "Sample%%44*5",
  };
  const result = await userServices.signUpUser(user);
  user.password = "Differentpass55$";

  const loginResult = await userServices.login(user);

  expect(loginResult).toBeFalsy();
});

test("Logging in user -- Username Failure", async () => {
  const user = {
    "username": "Harry Potter",
    "email": "youngWizard@gmail.com",
    "password": "Sample%%44*5",
  };
  const result = await userServices.signUpUser(user);
  user.username = "Ron";

  const loginResult = await userServices.login(user);

  expect(loginResult).toBeFalsy();
});

test("Logging in user -- no username Failure", async () => {
  const user = {
    "email": "youngWizard@gmail.com",
    "password": "Sample%%44*5",
  };
  const result = await userServices.signUpUser(user);

  const loginResult = await userServices.login(user);

  expect(loginResult).toBeFalsy();
});

test("Logging in user -- no email Failure", async () => {
  const user = {
    "username": "Harry Potter",
    "password": "Sample%%44*5",
  };
  const result = await userServices.signUpUser(user);

  const loginResult = await userServices.login(user);

  expect(loginResult).toBeFalsy();
});


test("Adding user w/o validation -- successful path", async () => {
  const user = {
    "username": "Harry Potter",
    "email": "youngWizard@gmail.com",
    "password": "Sample%%44*5",
  };
  const result = await userServices.signUpUser(user);

  expect(result).toBeTruthy();
  expect(result.username).toBe(user.username);
  expect(result.email).toBe(user.email);
  expect(result.validPassword("Sample%%44*5")).toBeTruthy();
  expect(result).toHaveProperty("_id");
});
//-----------------------------
test("Adding user w/o validation -- failure path with invalid id", async () => {
  const user = {
    "_id": "123",
    "username": "Harry Potter",
    "email": "youngWizard@gmail.com",
    "password": "Sample%%44*5",
  };

  const result = await userServices.signUpUser(user);
  expect(result).toBeFalsy();
});

test("Adding user w/o validation -- failure path with already taken id", async () => {
  const user = {
    "username": "Harry Potter",
    "email": "youngWizard@gmail.com",
    "password": "Sample%%44*5",
  };
  const addedUser = await userServices.signUpUser(user);

  const anotherUser = {
    "_id": addedUser.id,
    "username": "Ron",
    "email": "youngWizard2@gmail.com",
    "password": "Sample%%44*5",
  };
  const result = await userServices.signUpUser(anotherUser);
  expect(result).toBeFalsy();
});


test("Adding user  w/o validation -- success path with already taken username", async () => {
  const user = {
    "username": "Harry Potter",
    "email": "youngWizard@gmail.com",
    "password": "Sample%%44*5",
  };
  const addedUser = await userServices.signUpUser(user);

  const anotherUser = {
    "username": addedUser.username,
    "email": "youngWizard2@gmail.com",
    "password": "Sample%%44*5",
  };
  const result = await userServices.signUpUser(anotherUser);
  expect(result).toBeTruthy();
});

test("Adding user w/ validation -- success path with already taken email", async () => {
  const user = {
    "username": "Harry Potter",
    "email": "youngWizard@gmail.com",
    "password": "Sample%%44*5",
  };
  const addedUser = await userServices.signUpUser(user);

  const anotherUser = {
    "username": "Ron",
    "email": addedUser.email,
    "password": "Sample%%44*5",
  };

  const result = await userServices.signUpUser(anotherUser);
  expect(result).toBeTruthy();
});


test("Adding user w/o validation -- failure path with no username", async () => {
  const user = {
    "email": "youngWizard@gmail.com",
    "password": "Sample%%44*5",
  }

  const result = await userServices.signUpUser(user);
  expect(result).toBeFalsy();
});

test("Adding user w/o validation -- failure path with no email", async () => {
  const user = {
    "username": "Harry Potter",
    "password": "Sample%%44*5",
    };
  const result = await userServices.signUpUser(user);
  expect(result).toBeFalsy();
});

test("Getting user Preferences -- successful path", async () => {
  let user = {
    "username": "HarryPotter",
    "email": "youngWizard@gmail.com",
    "password": "Srr$pffle%%44*5"
  };

  const resultUser = await userServices.signUpUser(user);
  const resultPref = await userServices.getUserPreferences(resultUser.username);

  expect(resultUser.prefs).toStrictEqual(resultPref[0].prefs._id);
  expect(resultUser._id).toStrictEqual(resultPref[0].prefs.user);

});

test("Getting user Preferences -- Failure path", async () => {
  let user = {
    "username": "HarryPotter",
    "email": "youngWizard@gmail.com",
    "password": "Srr$pffle%%44*5"
  };

  const resultUser = await userServices.signUpUser(user);
  resultUser.username = "Ron";
  const resultPref = await userServices.getUserPreferences(resultUser.username);
  expect(resultPref.length).toBe(0);
});

test("Setting user Preferences -- Success path", async () => {
  let resultUser = {
    username: 'HarryPotter',
    email: 'youngWizard@gmail.com',
    _id: new mongoose.ObjectId("624ddbd7f9bbb3ab16c362ee"),
    prefs: new mongoose.ObjectId("624ddbd7f9bbb3ab16c362ef"),
    salt: '6d473c07369d5bec999d91c8182afe43',
    hash: '998f340af637d182d4f7f11675f0a331d1a92cdb73841dc4aa4684c0845b228d55318e613dff2a9302d1e5525bc12e403123bf0c6b4dabe538e6d9e64e74c217'
  };

  let originalPrefs = {
    sport: {

    },
    following:true,
    user: new mongoose.ObjectId("624ddbd7f9bbb3ab16c362ee"),
    _id: new mongoose.ObjectId("624ddbd7f9bbb3ab16c362ef")

  }

  let newPrefs = {
    "sports": {
        "NBA": {
          "teams": [],
          "following":true
        },
        "NHL": {
          "teams": ["55"],
          "following":true
        }, 
    }
  };

  mockingoose(userModel).toReturn(resultUser, 'findUserByUsername');
  mockingoose(userModel).toReturn(newPrefs, 'findOneAndUpdate');
  mockingoose(userModel).toReturn(originalPrefs, 'findOne');


  const oPrefs = await userServices.getUserPreferences(resultUser.username);
  await userServices.setUserPreferences(resultUser.username, newPrefs );
  const newPref = await userServices.getUserPreferences(resultUser.username);

  expect(oPrefs[0].prefs.user).toStrictEqual(newPref[0].prefs.user);
  expect(oPrefs[0].prefs._id).toStrictEqual(newPref[0].prefs._id);
  expect(oPrefs[0].prefs.sports).not.toStrictEqual(newPref[0].prefs.sports)

});
