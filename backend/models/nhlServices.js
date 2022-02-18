const axios = require("axios");
const host = 'https://statsapi.web.nhl.com'

async function getGames(req, res, dayOffset) {
  const today = new Date();
  const currentDate = String(today.getFullYear()) + "-" + String(today.getMonth() + 1).padStart(2, '0') + "-" + String(parseInt(today.getDate()) + dayOffset).padStart(2, '0');
    try {
        const games = await axios.get(host + '/api/v1/schedule?date=' + currentDate);
        res.send(formatGamesData(games.data, currentDate));
    } catch (e) {
        console.error(e);
    }
}

function getStatus(codedGameState) {
    const state = parseInt(codedGameState);
    const LIVE = 3;
    const FINAL = 6;
    if (state >= FINAL) {
        return 2;
    } else if (state >= LIVE) {
        return 1;
    } else {
        return 0;
    }
}

function formatGamesData(responseData, date) {
    const games = responseData['dates'].find(element => element.date === date)['games'];
    const new_games = [];
    for (let i = 0; i < games.length; i++) {
      const game = games[i];
      const new_game = {}
      new_game.status = getStatus(game.status.codedGameState);
      new_game.clock = "NO DATA";
      new_game.halftime = false;
      new_game.arena = game.venue.name;
      new_game.currentQtr = -1;
      new_game.maxQtr = -1;
      new_game.home = game.teams.home.team.name;
      new_game.home_score = game.teams.home.score;
      new_game.home_record = game.teams.home.leagueRecord.wins + "-" + game.teams.home.leagueRecord.losses;
      new_game.home_code = String(game.teams.home.team.id);
      new_game.away = game.teams.away.team.name;
      new_game.away_score = game.teams.away.score;
      new_game.away_record = game.teams.away.leagueRecord.wins + "-" + game.teams.away.leagueRecord.losses;
      new_game.away_code = String(game.teams.away.team.id);
      new_game.startTimeUTC = game.gameDate;
      new_games.push(new_game);
    }
    return {
      games: new_games
    };
}

async function getStandings(req, res){
    const id = req.params['id'];
    try {
        const standings = await axios.get(host + '/api/v1/standings');
        if (id === undefined) {
            res.send(formatStandingsData(standings.data));
        } else {
            res.send(formatStandingsData(standings.data).teams[id]);
        }
    } catch (e) {
        console.error(e);
    }
}

function formatStandingsData(responseData) {
    const all_data = {};
    const data = responseData['records'];
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