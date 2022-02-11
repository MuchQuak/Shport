const mongoose = require('mongoose');
let dbConnection;

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
    pref: [String],
  }, {collection : 'users'});

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
        var query = userModel.find({'username':name});
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

async function findUserByUsername(name){
    const userModel = getDbConnection().model("User", UserSchema);
    return await userModel.find({'username':name});
}

exports.signUpUser = signUpUser;
exports.getUserPreferences = getUserPreferences;
exports.TESTGetUsers = getUsers;