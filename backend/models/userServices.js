const mongoose = require('mongoose');
const dotenv = require('dotenv');
//dotenv.config({ path: __dirname + `/.env` }); 
dotenv.config();
let dbConnection;

const prefsSchema = new mongoose.Schema(
    {
        sports: {
            following: {
                type: Boolean,
                required: false,
                trim: true,
            },
            NBA: {
                following: {
                    type: Boolean,
                    required: false,
                    trim: true,
                },
                teams: []
            },
            NFL: {
                following: {
                    type: Boolean,
                    required: false,
                    trim: true,
                },
                teams: []
            },
            NHL: {
                following: {
                    type: Boolean,
                    required: false,
                    trim: true,
                },
                teams: []
            },
            MLB: {
                following: {
                    type: Boolean,
                    required: false,
                    trim: true,
                },
                teams: []
            }
        }
    },
    {
        collection : 'prefs'
    }
);

const userSchema = new mongoose.Schema(
    {
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
            required: true,
            trim: true,
        },
        prefs: {
            type: prefsSchema,
            required: true
        },
    },
    {
        collection : 'users'
    }
);

function getDbConnection() {
    if (!dbConnection) {
        dbConnection = mongoose.createConnection(process.env.MONGODB_URI, {
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
        const query = userModel.find({'username': name});
        return query.select('prefs');
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
    const userModel = getDbConnection().model("user", userSchema);
    return await userModel.find({'username': name});
}

exports.signUpUser = signUpUser;
exports.getUserPreferences = getUserPreferences;
exports.TESTGetUsers = getUsers;
exports.verifyLogin = verifyLogin;
exports.findUserByUsername = findUserByUsername;


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