var mongoose = require("mongoose");
const User = require("./userSchema");
const Pref = require("./prefSchema");
const dotenv = require("dotenv");
const axios = require("axios");

//dotenv.config({ path: __dirname + `/.env` });
dotenv.config();

let dbConnection;

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
  const userModel = getDbConnection().model("user", User.schema);
  const prefModel = getDbConnection().model("pref", Pref.schema);

  try {
    //New user
    let userToAdd = new userModel(user);
    //New Preferences linked to user
    let userPrefs = new prefModel({
      theme: "blue",
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

async function deleteUser(user){
  return findUserByUsername(user.username).then(async (result) => {
    if (result.length === 1){
      const u = result[0];
      const userModel = getDbConnection().model("user", User.schema);
      const prefModel = getDbConnection().model("pref", Pref.schema);
      await userModel.deleteOne( { _id : u._id} );      
      await prefModel.deleteOne( { _id: u.prefs});
      return true;
    } else{
      return false;
    }
  }
); 
}

async function validate(u) {
  return await findUserByUsername(u.username).then((result) => {
    if (result.length < 1) {
      return findUserByEmail(u.email).then((result2) => {
        if (result2.length < 1) {
          return true;
        }
        return false;
      });
    }
    return false;
  });
}

async function getUserPreferences(name) {
  const userModel = getDbConnection().model("user", User.schema);
  const prefModel = getDbConnection().model("pref", Pref.schema);
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

async function getUserSports(name) {
  const userModel = getDbConnection().model("user", User.schema);
  const prefModel = getDbConnection().model("pref", Pref.schema);
  try {
    const prefs = await userModel
        .findOne({ username: name })
        .populate({ path: "prefs", model: "pref" })
        .select("prefs");
    return prefs.prefs.sports;
  } catch (error) {
    console.log(error);
    return false;
  }
}

// update (SPORTS AND REDDIT ONLY) preferences
async function setUserPreferences(name, newPrefs) {
  const prefModel = getDbConnection().model("pref", Pref.schema);
  const user = await findUserByUsername(name);
  return prefModel.findOneAndUpdate(
    { user: user[0]._id },
    { sports: newPrefs.sports, reddit: newPrefs.reddit }
  );
}

// update theme section of preferences
// backend will crash if client sends theme that isn't string
async function setUserTheme(name, themeName) {
  const prefModel = getDbConnection().model("pref", Pref.schema);
  const user = await findUserByUsername(name);
  return prefModel.findOneAndUpdate(
    { user: user[0]._id },
    { theme: themeName }
  );
}

//just for testing
async function getUsers(username, email) {
  const userModel = getDbConnection().model("user", User.schema);

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
  const userModel = getDbConnection().model("user", User.schema);
  return userModel.find({ username: name });
}

async function findUserByEmail(email) {
  const userModel = getDbConnection().model("user", User.schema);
  return userModel.find({ email: email });
}

async function findUserById(id) {
  const userModel = getDbConnection().model("user", User.schema);
  
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

async function changeUsername(user) {
  return await findUserByUsername(user.newUsername).then(async (result) => {
    if(result.length === 0){
      const userModel = getDbConnection().model("user", User.schema);
      await userModel.findOneAndUpdate({username:user.username}, {username: user.newUsername} )
      return true;
    }else{
      return false;
    }
  }
  );
}

async function changePassword(user) {
  return await findUserByUsername(user.username).then(async (result) => {
    if(result.length === 1){
      const userModel = getDbConnection().model("user", User.schema);

      await result[0].setPassword(user.newPassword);
      await userModel.findOneAndUpdate({username:user.username}, {salt: result[0].salt, hash:result[0].hash })
      return true;
    }else{
      return false;
    }
  });
}

exports.signUpUser = signUpUser;
exports.getUsers = getUsers;
exports.getUserPreferences = getUserPreferences;
exports.getUserSports = getUserSports;
exports.setUserPreferences = setUserPreferences;
exports.setUserTheme = setUserTheme;
exports.findUserById = findUserById;
exports.findUserByUsername = findUserByUsername;
exports.findUserByEmail = findUserByEmail;
exports.setConnection = setConnection;
exports.validate = validate;
exports.login = login;
exports.deleteUser = deleteUser;
exports.changePassword = changePassword;
exports.changeUsername = changeUsername;
