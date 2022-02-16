const http = require('http');
const { off } = require('process');
const host = 'statsapi.web.nhl.com'

async function getGames(req, res, dayOffset) {
  const today = new Date();
  const options = {
    host: host,
    path: '/api/v1/schedule',
    method: 'GET'
  }
  http.request(options, function (response) {
    let body = '';
    response.on('data', function (data) {
        body += data;
    });
    response.on('end', function () {
        res.send(formatGamesData(body));
    });
  }).end();
}

function timeToUtc(time) {
  var timeParts = time.split(' ');
  var pmAm = timeParts[1];
  var time = timeParts[0].split(':');
  
  offset = pmAm[0] === 'A' ? 0: 12;
  
  const hour = parseInt(time[0]) + 5 + offset;
  const min = parseInt(time[1]);
  
  var t = new Date();
  
  return new Date(Date.UTC(t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDay(), hour, min, 0));
}

function formatGamesData(responseData) {
    const dayOffset = 0;
    const today = new Date();
    const currentDate = String(today.getFullYear()) + "-" + String(today.getMonth() + 1).padStart(2, '0') + "-" + String(parseInt(today.getDate()) + dayOffset).padStart(2, '0');
    const games = JSON.parse(responseData).dates.find(element => element.date === currentDate).games;
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
      new_game.startTimeEST = game.gameDate;
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
      //Made new time cause don't know what you want to do with it but this is proof it works (Logan)
      //new_game.startTimeUTC = timeToUtc(game.startTimeEastern);
      new_games.push(new_game);
  }
  return {
      games: new_games
  };
}

exports.getGames = getGames;