const express = require('express');
const app = express();
const port = 5000;

const teams = {
    teams_list: [
        {
            name: 'Kings',
            wins: 18,
            losses: 34,
        },
        {
            name: 'Warriors',
            wins: 39,
            losses: 13
        },
        {
            name: 'Pelicans',
            wins: 19,
            losses: 32
        }
    ]
}

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Backend Landing");
});

app.get('/teams', (req, res) => {
    res.send(teams);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});