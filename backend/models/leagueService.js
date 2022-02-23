const axios = require("axios");

class LeagueService {
    constructor(host) {
        this.host = host;
    }

    ESTtoUTC(time) {
        const timeParts = time.split(' ');
        const pmAm = timeParts[1];
        const newtime = timeParts[0].split(':');
        const offset = pmAm[0] === 'A' ? 0: 12;
        const hour = parseInt(newtime[0]) + 5 + offset;
        const min = parseInt(newtime[1]);
        const t = new Date();
        return new Date(Date.UTC(t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDay(), hour, min, 0));
    }

    getStatus(codedGameState) {
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
    
    async getGames(req, res) {
        const offset_param = String(req.params['offset']).trim();
        const offset_num = offset_param === undefined ? 0 : parseInt(offset_param);
        const offset = isNaN(offset_num) ? 0 : offset_num;
        const today = new Date();
        today.setDate(today.getDate() + offset);
        const currentDate = this.formatDate(today);

        try {
            const games = await axios.get(this.getGamesEndPoint(currentDate));

            res.send(this.formatGamesData(games.data));
        } catch (e) {
            console.error(e);
        }
    }

    async getStandings(req, res) {
        const id = req.params['id'];
        try {
            const standings = await axios.get(this.getStandingsEndPoint());
            if (id === undefined) {
                res.send(this.formatStandingsData(standings.data));
            } else {
                res.send(this.formatStandingsData(standings.data).teams[id]);
            }
        } catch (e) {
            console.error(e);
        }
    }

    async getGamesEndPoint(currentDate) {
        throw new Error("Abstract Method has no implementation");
    }
    async getStandingsEndPoint() {
        throw new Error("Abstract Method has no implementation");
    }

    formatDate(date){
        return date.getFullYear() + 
            String(date.getMonth() + 1).padStart(2, '0') + 
            String(date.getDate()).padStart(2, '0');
    }

    formatGamesData(responseData) {
        throw new Error("Abstract Method has no implementation");
    }
    formatStandingsData(responseData) {
        throw new Error("Abstract Method has no implementation");
    }
}

exports.LeagueService = LeagueService;