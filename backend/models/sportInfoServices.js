const mongoose = require('mongoose');
let dbConnection;

const sportSchema = new mongoose.Schema(
    {
        sport: {
            type: String,
            required: true,
            trim: true,
        },
        teams: []
    },
    {
        collection : 'teams'
    }
);

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

async function getSport(sport) {
    const userModel = getDbConnection().model("team", sportSchema);
    try {
        return userModel.findOne({"sport": String(sport).trim().toUpperCase()});
    } catch(error) {
        console.log(error);
        return false;
    }
}

async function getTeams(sport) {
    try {
        const sportModel = await getSport(sport);
        return sportModel.teams;
    } catch(error) {
        console.log(error);
        return false;
    }
}

async function getSportRequest(req, res) {
    const sport = String(req.params.sport).trim().toUpperCase();
    const sp = await getSport(sport);
    if (sp)
        res.status(200).send(sp);
    else
        res.status(500).end();
}

async function getTeamsRequest(req, res) {
    const sport = String(req.params.sport).trim().toUpperCase();
    const teams = await getTeams(sport);
    if (teams)
        res.status(200).send(teams);
    else
        res.status(500).end();
}

exports.getSport = getSport;
exports.getTeams = getTeams;
exports.getSportRequest = getSportRequest;
exports.getTeamsRequest = getTeamsRequest;