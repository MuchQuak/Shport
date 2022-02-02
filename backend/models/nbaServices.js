const mongoose = require('mongoose');
let dbConnection;

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  wins: {
    type: Number,
    required: true,
    trim: true,
  },
  losses: {
    type: Number,
    required: true,
    trim: true,
  },
}, {collection : 'team_list'});

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

async function getTeams(team){
    const userModel = getDbConnection().model("Team", teamSchema);
    let result;
    if (team === undefined){
        result = await userModel.find();
    }
    else if (team) {
        result = await findUserByName(team);
    }
     
    return result;
}

exports.getTeams = getTeams;