const http = require('http');
const host = 'statsapi.web.nhl.com'

async function getGames(req, res, dayOffset) {
  const today = new Date();
  const currentDate = String(today.getFullYear()) + "-" + String(today.getMonth() + 1).padStart(2, '0') + "-" + String(parseInt(today.getDate()) + dayOffset).padStart(2, '0');
    const options = {
    host: host,
    path: '/api/v1/schedule?date=' + currentDate,
    method: 'GET'
  }
  http.request(options, function (response) {
    let body = '';
    response.on('data', function (data) {
        body += data;
    });
    response.on('end', function () {
        res.send(formatGamesData(body, currentDate));
    });
  }).end();
}

function formatGamesData(responseData, date) {
    const games = JSON.parse(responseData)['dates'].find(element => element.date === date)['games'];
    const new_games = [];
    for (let i = 0; i < games.length; i++) {
      const game = games[i];
      const new_game = {}
      new_game.status = game.status.codedGameState;
      new_game.activated = game.status.abstractGameState === "Live" ? true : false;
      new_game.endPeriod = false;
      new_game.clock = "0";
      new_game.halftime = false;
      new_game.arena = game.venue.name;
      new_game.currentQtr = 0;
      new_game.maxQtr = 0;
      new_game.home = game.teams.home.team.name;
      new_game.home_score = game.teams.home.score;
      new_game.home_record = game.teams.home.leagueRecord.wins + "-" + game.teams.home.leagueRecord.losses;
      new_game.home_id = game.teams.home.team.id;
      new_game.away = game.teams.away.team.name;
      new_game.away_score = game.teams.away.score;
      new_game.away_record = game.teams.away.leagueRecord.wins + "-" + game.teams.away.leagueRecord.losses;
      new_game.away_id = game.teams.away.team.id;
      new_game.startTimeUTC = game.gameDate;
      //Made new time cause don't know what you want to do with it but this is proof it works (Logan)
      //new_game.startTimeUTC = timeToUtc(game.startTimeEastern);
      new_games.push(new_game);
    }
    return {
      games: new_games
    };
}

async function getStandings(req, res){
    const id = req.params['id'];
    const options = {
        host: host,
        path: '/api/v1/standings',
        method: 'GET'
    }
    http.request(options, function (response) {
        let body = '';
        response.on('data', function (data) {
            body += data;
        });
        response.on('end', function () {
            if (id === undefined)
                res.send(formatStandingsData(body));
            else
                res.send(formatStandingsData(body)['teams'][id]);
        });
    }).end();
}

function formatStandingsData(responseData) {
    const all_data = {};
    const data = JSON.parse(responseData)['records'];
    data.forEach((division_data, index) => {
        const div_name = division_data['division']['nameShort'];
        const records = division_data['teamRecords'];
        records.forEach((team_data, index) => {
            const new_team_data = {};
            new_team_data.code = String(team_data.team.id);
            new_team_data.name = team_data.team.name;
            new_team_data.city = "";
            new_team_data.conference = div_name;
            new_team_data.rank = String(team_data.divisionRank);
            new_team_data.wins = String(team_data.leagueRecord.wins);
            new_team_data.losses = String(team_data.leagueRecord.losses);
            all_data[new_team_data.code] = new_team_data;
        });
    });
    return {
        teams: all_data
    };
}

exports.getGames = getGames;
exports.getStandings = getStandings;