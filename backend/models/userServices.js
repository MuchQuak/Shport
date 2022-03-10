const mongoose = require('mongoose');
const dotenv = require('dotenv');
const axios = require('axios');

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

async function validateAndSignUp(u){
    let isValidUsername = false;
    let isValidEmail = false;
    let isValidToSignUp = false;
    //let user = undefined;

    return await validateNewUsername(u.username).then(result => {
      if(result === false){
        isValidUsername = true;
        
        return validateNewEmail(u.email).then( result2 => {
            if(result2 === false){
              isValidEmail = true;
                
              if(isValidUsername && isValidEmail){
                return signUpUser(u);
              }
            }
            return false
        });
    }
    return false;
});

}

/*
async function validateAndSignUp(u){
    let isValidUsername = false;
    let isValidEmail = false;
    let isValidToSignUp = false;
    //let user = undefined;

    isValidEmail = await validateNewUsername(u.username).then(result => {
      if(result === false){
        return true;
      }
    });
        
    isValidEmail = await validateNewEmail(u.email).then( result => {
        if(result === false){
            return true;
        }
    });
                
    if(isValidUsername && isValidEmail){
        return await signUpUser(u);
    }
    else{
        return false;
    }
}
*/

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
    
    if(mongoose.Types.ObjectId.isValid(id)){
        let obj = new mongoose.Types.ObjectId(id);
        const userModel = getDbConnection().model("user", User.schema);
        return await userModel.find({'_id': obj});
    }
    else{
        return undefined;
    }
}

async function validateNewUsername(username){
    try{
        const response = await axios.post('http://localhost:5000/signup/username', {"username":username});
        return response;
    }
    catch (error){
        console.log(error);
        return false;
    }
}


async function validateNewEmail(email){
    try{
        const response = await axios.post('http://localhost:5000/signup/email', {"email":email});
        return response;
    }
    catch (error){
        console.log(error);
        return false;
    }
}


exports.signUpUser = signUpUser;
exports.getUserPreferences = getUserPreferences;
exports.setUserPreferences = setUserPreferences;
exports.TESTGetUsers = getUsers;
exports.findUserById = findUserById;
exports.findUserByUsername = findUserByUsername;
exports.findUserByEmail = findUserByEmail;
exports.setConnection = setConnection;
exports.validateAndSignUp = validateAndSignUp;


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