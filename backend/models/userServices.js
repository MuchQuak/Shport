const mongoose = require('mongoose');
let dbConnection;

/*
   Retrieve all sports followed by user
   For each sport (regardless of sport following), retrieve all leagues followed
   For each league (regardless of league following), retrieve all teams followed
   Retrieve everything
*/

const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
        type: String,
        trim: true,
    },
    pref: [],
  }, {collection : 'users'});

  const sportsSchema = new mongoose.Schema({
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
    {collection: 'sports'});



function getDbConnection() {
    const url = "mongodb+srv://lwilt:Austin62@cluster0.iz6fl.mongodb.net/Test?retryWrites=true&w=majority";
    if (!dbConnection) {
        dbConnection = mongoose.createConnection(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }
    return dbConnection;
}

async function verifyLogin(user) {
    const userModel = getDbConnection().model("user", userSchema);
    
    return true;
}

async function signUpUser(user){
    //adds user
    const userModel = getDbConnection().model("user", userSchema);
    try {
        const userToAdd = new userModel(user);
        const savedUser = await userToAdd.save()
        return savedUser;
    } catch(error) {
        console.log(error);
        return false;
    }       
}

async function getUserPreferences(name) {
    const userModel = getDbConnection().model("user", userSchema);
    try {
        const query = userModel.find({'username':name});
        return query.select('pref');
    } catch(error) {
        console.log(error);
        return false;
    }   
}

//just for testing
async function getUsers() {
    const userModel = getDbConnection().model("user", userSchema);
    try {
        return userModel.find();
    } catch(error) {
        console.log(error);
        return false;
    }   
}

async function getSport(sport) {
    const sportModel = getDbConnection().model("sports", sportsSchema);
    try {
        if(sport != undefined){
            return sportModel.find({"sport":sport});
        }
        else{
            return sportModel.find();
        }
    } catch(error) {
        console.log(error);
        return false;
    }   
}

async function findUserByUsername(name){
    const userModel = getDbConnection().model("User", userSchema);
    return await userModel.find({'username':name});
}

exports.signUpUser = signUpUser;
exports.getUserPreferences = getUserPreferences;
exports.TESTGetUsers = getUsers;
exports.verifyLogin = verifyLogin;
exports.findUserByUsername = findUserByUsername;
exports.getSport = getSport;