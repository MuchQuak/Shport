const cache = require("../caching/cachingServices")

class LeagueService {
    constructor(host) {
        this.host = host;
    }
 
   async getGames(offset_param) {      
      const offset_num = offset_param === undefined ? 0 : parseInt(offset_param);
      const offset = isNaN(offset_num) ? 0 : offset_num;
      var today = new Date();
      today.setDate(today.getDate() + offset);
      const currentDate = this.formatDate(today);
      const games = await cache.getCachedGames(this.sportCode());
      return games.filter(g => this.formatDate(g.date) === currentDate);
   }

  async getStandings() {
      return await cache.getCachedStandings(this.sportCode());    
  }

  async getPlayers(req, res) {
      return await this.getPlayersEndPoint("2021");
  }

  async cacheAllData(live_games) {
      try {
         await cache.cacheGames(
            this.sportCode(),
            await this.getGamesData(live_games));   
         await cache.cacheStandings(
            this.sportCode(), 
            await this.getStandingsData());
      } catch(e) {
         console.log(`Failed to cache ${this.sportCode()} data`);
      }
  }

  async initialize_data(live_games) {
      try {
         const games = await this.getGamesData(live_games);
         const scheduled_games = cache.createGameCachingSchedule(games, this, live_games)
         await cache.cacheGames(
            this.sportCode(), games);   
         await cache.cacheStandings(
            this.sportCode(), 
            await this.getStandingsData());

         return scheduled_games;
      } catch(e) {
         console.log(`Failed to intialize and scheduled ${this.sportCode()} games: ${e}`);
      }
  }

  async cacheLiveUpdates(gId) {
      try {
         let liveData = await this.getLiveGameData(gId);
         cache.updateLiveGame(this.sportCode(), gId, liveData)

         return liveData.status === 1? true: false;
      } catch(err) {
         console.log(err)
      }
   }


  async getLiveGameData(gId) {
    throw new Error("Abstract Method has no implementation");
  }

  async getGamesData(live_games) {
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
