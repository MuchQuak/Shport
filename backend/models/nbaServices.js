const league = require('./leagueService');

class NbaService extends league.LeagueService {

    constructor(host) {
        super(host);
    }

    getGamesEndPoint(currentDate) {
        return this.host + '/10s/prod/v1/' + currentDate + '/scoreboard.json';
    }
    getStandingsEndPoint() {
        return this.host + '/10s/prod/v1/current/standings_conference.json';
    }

    formatGamesData(responseData) {
        const games = responseData["games"];
        const new_games = [];
        for (let i = 0; i < games.length; i++) {
            const game = games[i];
            const new_game = {}
            new_game.status = this.getStatus(game);
            new_game.clock = game.clock;
            new_game.halftime = game.period.isHalftime;
            new_game.arena = game.arena.name;
            new_game.curçrentQtr = game.period.current;
            new_game.maxQtr = game.period.maxRegular;
            new_game.home = "";
            new_game.home_code = game.hTeam.triCode;
            new_game.home_score = game.hTeam.score;
            new_game.home_record = game.hTeam.win + "-" + game.hTeam.loss;
            new_game.away = "";
            new_game.away_code = game.vTeam.triCode;
            new_game.away_score = game.vTeam.score;
            new_game.away_record = game.vTeam.win + "-" + game.vTeam.loss;
            new_game.startTimeUTC = this.ESTtoUTC(game.startTimeEastern);
            new_games.push(new_game);
        }
        return {
            games: new_games
        };
    }

    formatStandingsData(responseData) {
        const all_data = {};
        const object_data = responseData['league']['standard']['conference'];
        for (const conf of Object.keys(object_data)) {
            const data = object_data[conf];
            data.forEach((division_data, index) => {
                const div_name = String(conf);
                const new_team_data = {};
                const code = String(division_data['teamSitesOnly']['teamTricode']);
                new_team_data.code = code;
                new_team_data.name = division_data['teamSitesOnly']['teamNickname'];
                new_team_data.city = division_data['teamSitesOnly']['teamName'];
                new_team_data.conference = div_name;
                new_team_data.rank = String(division_data['confRank']);
                new_team_data.wins = String(division_data['win']);
                new_team_data.losses = String(division_data['loss']);
                all_data[code] = new_team_data;
            });
        }
        return {
            teams: all_data
        };
    }
}

exports.NbaService = NbaService;

//exports.getTeams = getTeams;
/*
async function getTeams(req, res) {
  const id = req.params['id'];
  const year = (new Date().getFullYear() - 1).toString().trim()
    try {
        const teams = await axios.get(host + '/10s/prod/v2/' + year + '/teams.json');
        if (id === undefined) {
            res.send(formatTeamsData(teams.data));
        } else {
            res.send(formatTeamsData(teams.data)[id]);
        }
    } catch (e) {
        console.error(e);
    }
}

function formatTeamsData(responseData) {
    const old_teams = responseData['league']['standard'];
    const teams = {};
    for (let i = 0; i < old_teams.length; i++) {
        const team = old_teams[i];
        const new_team = {};
        const code = team['tricode'];
        new_team.code = code;
        new_team.name = team['nickname'];
        new_team.full_name = team['fullName'];
        new_team.city = team['city'];
        teams[code] = new_team;
    }
    return {teams: teams};
}
 */