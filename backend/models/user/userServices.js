var mongoose = require('mongoose');
const User = require('./userSchema');
const Pref = require('./prefSchema');

const dotenv = require('dotenv');
const axios = require('axios');

//dotenv.config({ path: __dirname + `/.env` }); 
dotenv.config();

let dbConnection;
/*
function getDbConnection() {
    if (!dbConnection) {
        dbConnection = mongoose.createConnection(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }
    return dbConnection;
}*/


function createDbConnection() {
    // if (!mongoose.connection) {
      mongoose.connect(process.env.MONGODB_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
      });
    // }
  }

function setConnection(newConn) {
    dbConnection = newConn;
    return dbConnection;
}


async function signUpUser(user) {
    //Users Collection
    const userModel = mongoose.model("user", User.schema);
    //Prefs Collection
    const prefModel = mongoose.model("pref", Pref.schema);
    
    try {
        //New user
        let userToAdd = new userModel(user);

        //New Preferences linked to user
        let userPrefs = new prefModel({
            user: userToAdd._id,
            sports: {
                following: true,
            }
        });

        userToAdd.prefs = userPrefs._id;

        await userPrefs.save();

        userToAdd.setPassword(user.password);
        const savedUser = await userToAdd.save();
        return savedUser;

    } catch(error) {
        console.log(error);
        return false;
    }
}

async function validate(u) {
    
    return await findUserByUsername(u.username).then( result =>{
        if(result.length === 0){
            return findUserByEmail(u.email).then(result2 =>{
                if(u._id == undefined && result2.length === 0){
                    return true;
                }
                else if(result2.length === 0){
                    return findUserById(u._id).then( result3 => {
                        if(result3 !== undefined && result3.length === 0){
                            return true;
                        }
                        return false;
                    })
                }
                return false;

            });
        }
        return false;

    } );
}

async function getUserPreferences(name) {
    const userModel = mongoose.model("user", User.schema);
    const prefModel = mongoose.model("pref", Pref.schema);
    
    try {
        const query = userModel.findOne({'username': name}).populate({ path: 'prefs', model: 'pref' });
        return query.select('prefs');
    } catch(error) {
        console.log(error);
        return false;
    }
}

// update preferences
async function setUserPreferences(name, newPrefs) {
    const prefModel = mongoose.model("pref", Pref.schema);     
    const user = await findUserByUsername(name);

    return prefModel.findOneAndUpdate({'user': user[0]._id}, {'sports': newPrefs.sports})
}

async function findUserByUsername(name){
    const userModel = mongoose.model("user", User.schema);
    return userModel.find({'username': name});
}

async function findUserByEmail(email){
    const userModel = mongoose.model("user", User.schema);
    return userModel.find({'email': email});
}

async function findUserById(id){
    
    if(mongoose.Types.ObjectId.isValid(id)){
        let obj = new mongoose.Types.ObjectId(id);
        const userModel = mongoose.model("user", User.schema);
        return userModel.find({'_id': obj});
    }
    else{
        return undefined;
    }
}
async function login(user){
    return await findUserByUsername(user.username).then( result =>{
        if(result.length === 1){
            return result[0].validPassword(user.password);
        }
        return false;
    } );
}

exports.createDbConnection = createDbConnection;
exports.signUpUser = signUpUser;
exports.getUserPreferences = getUserPreferences;
exports.setUserPreferences = setUserPreferences;
exports.findUserById = findUserById;
exports.findUserByUsername = findUserByUsername;
exports.findUserByEmail = findUserByEmail;
exports.setConnection = setConnection;
exports.validate = validate;
exports.login = login;