const cors = require('cors');
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
const port = 5000;

app.use(cors());

const nbaServices = require('./models/nbaServices');

app.get('/', (req, res) => {
    res.send("Backend Landing");
});

app.get('/teams', async (req, res) => {
    const team = req.query.team;

    try {
        const result = await nbaServices.getTeams(team);
        res.send({team_list: result});         
    } catch (error) {
        console.log(error);
        res.status(500).send('An error ocurred in the server.');
    }
});

app.listen(port, () => {
    console.log(`Backend listening at http://localhost:${port}`);
});