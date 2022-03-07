const mongoose = require('mongoose');
const dotenv = require('dotenv');
//dotenv.config({ path: __dirname + `/.env` }); 
dotenv.config();
const User = require('./userSchema');

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

function setConnection(newConn){
    dbConnection = newConn;
    return dbConnection;
  }


async function signUpUser(user){
    const userModel = getDbConnection().model("user", User.schema);
    
    try {
        let userToAdd = new userModel(user);
        userToAdd.setPassword(user.password);
        const savedUser = await userToAdd.save();
        return savedUser;
    } catch(error) {
        console.log(error);
        return false;
    }
}

async function getUserPreferences(name) {
    const userModel = getDbConnection().model("user", User.schema);
    try {
        const query = userModel.find({'username': name});
        return query.select('prefs');
    } catch(error) {
        console.log(error);
        return false;
    }
}

// update preferences
async function setUserPreferences(name, newPrefs) {
    const userModel = getDbConnection().model("user", User.schema);
    try {
        userModel.findOneAndUpdate({'username': name}, {'prefs': newPrefs});
        return true;
    } catch(error) {
        console.log(error);
    }
    return false;
}

//just for testing
async function getUsers(username, email) {
    const userModel = getDbConnection().model("user", User.schema);
    try {
        if (username === undefined && email === undefined) {
            result = await userModel.find();
        } else if (username && email === undefined) {
            result = await findUserByUsername(username);
        } else if (email && username === undefined) {
            result = await findUserByEmail(email);
        }

        return result;
    } catch(error) {
        console.log(error);
        return false;
    }   
}

async function findUserByUsername(name){
    const userModel = getDbConnection().model("user", User.schema);
    return await userModel.find({'username': name});
}

async function findUserByEmail(email){
    const userModel = getDbConnection().model("user", User.schema);
    return await userModel.find({'email': email});
}

async function findUserById(id){
    let obj;

    if(typeof(id) !== mongoose.Types.ObjectId){
        try{
            obj = mongoose.Types.ObjectId(id);
        }
        catch(error){
            console.log(error);
            return undefined;
        }
    }

    const userModel = getDbConnection().model("user", User.schema);
    return await userModel.find({'_id': id});
}

exports.signUpUser = signUpUser;
exports.getUserPreferences = getUserPreferences;
exports.setUserPreferences = setUserPreferences;
exports.TESTGetUsers = getUsers;
exports.findUserById = findUserById;
exports.findUserByUsername = findUserByUsername;
exports.findUserByEmail = findUserByEmail;
exports.setConnection = setConnection;

/*const sportsSchema = new mongoose.Schema({
  sport: {
      type: String,
      required: true,
      trim: true,
    },
  type: {
      type: String,
      required: true,
      trim: true,
    },
  name: {
      type: String,
      required: true,
      trim: true,
    },
  divisions: [],
  teams: [
      {
          code: {
              type: String,
              required: true,
              trim: true,
            },
          city: {
              type: String,
              required: true,
              trim: true,
          },
          name: {
              type: String,
              required: true,
              trim: true,
          },
      },
  ],},
  {collection: 'sports'});*/