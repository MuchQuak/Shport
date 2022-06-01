const cache = require("../caching/cachingServices")

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
    
    async getGames(req, res) {      
      const offset_param = String(req.params['offset']).trim();
      const offset_num = offset_param === undefined ? 0 : parseInt(offset_param);
      const offset = isNaN(offset_num) ? 0 : offset_num;
      var today = new Date();
      today.setDate(today.getDate() + offset);
      const currentDate = this.formatDate(today);

      try {
        const games = await cache.getCachedGames(this.sportCode())
        res.send(games.filter(g => this.formatDate(g.date) === currentDate));      
      } catch(e) {
        console.error(e);
    }
  }

  async getStandings(req, res) {
    const id = req.params["id"];
    try {
      const standings = await cache.getCachedStandings(this.sportCode());
      
      if (id === undefined) {
        res.send(standings);
      } else {
        res.send(standings[id]);
      }
    } catch (e) {
      console.error(e);
    }
  }

  async getPlayers(req, res) {
    const id = req.params["id"];
    try {
      const players = await this.getPlayersEndPoint("2021");
      if (id === undefined) {
        res.send(players);
      } else {
        res.send(players.find((player) => player["personId"] === id));
      }
    } catch (e) {
      console.error(e);
    }
  }

  async cacheAllData() {
    await cache.cacheGames(
      this.sportCode(),
      await this.getGamesData());   
    await cache.cacheStandings(
      this.sportCode(), 
      await this.getStandingsData());
  }

  async getGamesData() {
    throw new Error("Abstract Method has no implementation");
  }
  async getStandingsData() {
    throw new Error("Abstract Method has no implementation");
  }
  async getPlayersEndPoint(currentYear) {
    throw new Error("Abstract Method has no implementation");
  }
  async sportCode() {
    throw new Error("Abstract Method has no implementation");
  }

  formatDate(date) {
    return date.getFullYear() + 
        String(date.getMonth() + 1).padStart(2, '0') + 
        String(date.getDate()).padStart(2, '0');
  }
}

exports.LeagueService = LeagueService;