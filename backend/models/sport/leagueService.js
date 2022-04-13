const axios = require("axios");

class LeagueService {
  constructor(host) {
    this.host = host;
  }

  ESTtoUTC(time) {
    const timeParts = time.split(" ");
    const pmAm = timeParts[1];
    const newtime = timeParts[0].split(":");
    const offset = pmAm[0] === "A" ? 0 : 12;
    const hour = parseInt(newtime[0]) + 5 + offset;
    const min = parseInt(newtime[1]);
    const t = new Date();
    return new Date(
      Date.UTC(t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDay(), hour, min, 0)
    );
  }

  async getGames(req, res) {
    const offset_param = String(req.params["offset"]).trim();
    const offset_num = offset_param === undefined ? 0 : parseInt(offset_param);
    const offset = isNaN(offset_num) ? 0 : offset_num;
    const today = new Date();
    today.setDate(today.getDate() + offset);
    const currentDate = this.formatDate(today);

    try {
      const games = await axios.get(await this.getGamesEndPoint(currentDate));

      res.send(this.formatGamesData(games.data, currentDate));
    } catch (e) {
      console.error(e);
    }
  }

  async getStandings(req, res) {
    const id = req.params["id"];
    try {
      const standings = await axios.get(await this.getStandingsEndPoint());
      if (id === undefined) {
        res.send(this.formatStandingsData(standings.data));
      } else {
        res.send(this.formatStandingsData(standings.data).teams[id]);
      }
    } catch (e) {
      console.error(e);
    }
  }

  async getPlayers(req, res) {
    const id = req.params["id"];
    try {
      const players = await axios.get(await this.getPlayersEndPoint("2021"));
      const formatted = this.formatPlayersData(players.data);
      if (id === undefined) {
        res.send(formatted);
      } else {
        res.send(formatted.find((player) => player["personId"] === id));
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
  async getPlayersEndPoint(currentYear) {
    throw new Error("Abstract Method has no implementation");
  }

  formatDate(date) {
    return (
      date.getFullYear() +
      String(date.getMonth() + 1).padStart(2, "0") +
      String(date.getDate()).padStart(2, "0")
    );
  }

  formatGamesData(responseData, date) {
    throw new Error("Abstract Method has no implementation");
  }
  formatStandingsData(responseData) {
    throw new Error("Abstract Method has no implementation");
  }
  formatPlayersData(responseData) {
    throw new Error("Abstract Method has no implementation");
  }
}

exports.LeagueService = LeagueService;
