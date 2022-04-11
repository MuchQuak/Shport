var mongoose = require("mongoose");
const User = require("./userSchema");
const Pref = require("./prefSchema");
const dotenv = require("dotenv");
const axios = require("axios");

//dotenv.config({ path: __dirname + `/.env` });
dotenv.config();

let dbConnection;

const userModel = getDbConnection().model("user", User.schema);
const prefModel = getDbConnection().model("pref", Pref.schema);

function getDbConnection() {
  if (!dbConnection) {
    dbConnection = mongoose.createConnection(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
  return dbConnection;
}

function setConnection(newConn) {
  dbConnection = newConn;
  return dbConnection;
}

async function signUpUser(user) {
  try {
    //New user
    let userToAdd = new userModel(user);
    //New Preferences linked to user
    let userPrefs = new prefModel({
      user: userToAdd._id,
      sports: {
        following: true,
      },
    });
    userToAdd.prefs = userPrefs._id;
    await userPrefs.save();
    userToAdd.setPassword(user.password);
    return await userToAdd.save();
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function validate(u) {
  return await findUserByUsername(u.username).then((result) => {
    if (result.length === 0) {
      return findUserByEmail(u.email).then((result2) => {
        if (u._id === undefined && result2.length === 0) {
          return true;
        } else if (result2.length === 0) {
          return findUserById(u._id).then(
            (result3) => result3 !== undefined && result3.length === 0
          );
        }
        return false;
      });
    }
    return false;
  });
}

async function getUserPreferences(name) {
  try {
    const query = userModel
      .findOne({ username: name })
      .populate({ path: "prefs", model: "pref" });
    return query.select("prefs");
  } catch (error) {
    console.log(error);
    return false;
  }
}

// update preferences
async function setUserPreferences(name, newPrefs) {
  const user = await findUserByUsername(name);
  return prefModel.findOneAndUpdate(
    { user: user[0]._id },
    { sports: newPrefs.sports }
  );
}

//just for testing
async function getUsers(username, email) {
  try {
    if (username === undefined && email === undefined) {
      return await userModel.find();
    } else if (username && email === undefined) {
      return await findUserByUsername(username);
    } else {
      return await findUserByEmail(email);
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function findUserByUsername(name) {
  return userModel.find({ username: name });
}

async function findUserByEmail(email) {
  return userModel.find({ email: email });
}

async function findUserById(id) {
  if (mongoose.Types.ObjectId.isValid(id)) {
    let obj = new mongoose.Types.ObjectId(id);
    return userModel.find({ _id: obj });
  } else {
    return undefined;
  }
}

async function login(user) {
  return await findUserByUsername(user.username).then((result) =>
    result.length === 1 ? result[0].validPassword(user.password) : false
  );
}

exports.signUpUser = signUpUser;
exports.getUserPreferences = getUserPreferences;
exports.setUserPreferences = setUserPreferences;
exports.TESTGetUsers = getUsers;
exports.findUserById = findUserById;
exports.findUserByUsername = findUserByUsername;
exports.findUserByEmail = findUserByEmail;
exports.setConnection = setConnection;
exports.validate = validate;
exports.login = login;
