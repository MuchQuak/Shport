const axios = require("axios");
const cheerio = require("cheerio");

/* Main function that gets the standing. Currently works for the NFL and MLB
    league --> league name
    sep --> is the seperator between the win and losse and other game information 
*/

async function getSportStanding(league, scoreSep) {
  return await axios
    .get("https://www.espn.com/" + league + "/standings")
    .then((response) => {
      let $ = cheerio.load(response.data);

      let i = 0;
      let amLeague = [];
      let amCodes = [];
      let natLeague = [];
      let natCodes = [];

      $(".Table__TBODY").each((index, element) => {
        //team names
        let names = $(element)
          .find(".hide-mobile")
          .children()
          .toArray()
          .map((result) => {
            return $(result).text();
          });
        // team code
        let codes = $(element)
          .find(".dn.show-mobile")
          .children()
          .toArray()
          .map((result) => {
            return $(result).text();
          });

        if (i == 0) {
          amLeague = names;
          amCodes = codes;
        } else if (i == 2) {
          natLeague = names;
          natCodes = codes;
        }

        i++;
      });

      let scores = [];
      i = 0;
      $(".stat-cell").each((index, element) => {
        if (i < 2) {
          scores.push($(element).text());
        }
        i++;

        if (i == scoreSep) i = 0;
      });

      let sportsInfo = {
        natLeague: natLeague,
        natCodes: natCodes,
        amLeague: amLeague,
        amCodes: amCodes,
        scores: scores,
      };

      return sportsInfo;
    })
    .catch((error) => {
      console.log(error);
    });
}

function createMlbObj(
  sportObj,
  currentLeague,
  natLeague,
  natCodes,
  scores,
  start
) {
  let j = start;
  let k = 1;

  for (let i = 0; i < natLeague.length; i++) {
    sportObj["teams"][natCodes[i]] = {};
    sportObj["teams"][natCodes[i]]["name"] = natLeague[i];
    sportObj["teams"][natCodes[i]]["city"] = "";
    sportObj["teams"][natCodes[i]]["code"] = natCodes[i];
    sportObj["teams"][natCodes[i]]["rank"] = k.toString();
    sportObj["teams"][natCodes[i]]["wins"] = scores[j];
    sportObj["teams"][natCodes[i]]["losses"] = scores[j + 1];

    j += 2;
    k += 1;

    if (i < 5) {
      sportObj["teams"][natCodes[i]]["conference"] = currentLeague + "East";
    } else if (i < 10) {
      sportObj["teams"][natCodes[i]]["conference"] = currentLeague + "Central";
    } else {
      sportObj["teams"][natCodes[i]]["conference"] = currentLeague + "West";
    }

    if (k == 6) {
      k = 1;
    }
  }
}

function createNflObj(
  sportObj,
  currentLeague,
  natLeague,
  natCodes,
  scores,
  start
) {
  let j = start;
  let k = 1;

  for (let i = 0; i < natLeague.length; i++) {
    sportObj["teams"][natCodes[i]] = {};
    sportObj["teams"][natCodes[i]]["name"] = natLeague[i];
    sportObj["teams"][natCodes[i]]["city"] = "";
    sportObj["teams"][natCodes[i]]["code"] = natCodes[i];
    sportObj["teams"][natCodes[i]]["rank"] = k.toString();
    sportObj["teams"][natCodes[i]]["wins"] = scores[j];
    sportObj["teams"][natCodes[i]]["losses"] = scores[j + 1];

    j += 2;
    k += 1;

    if (i < 4) {
      sportObj["teams"][natCodes[i]]["conference"] = currentLeague + "East";
    } else if (i < 8) {
      sportObj["teams"][natCodes[i]]["conference"] = currentLeague + "North";
    } else if (i < 12) {
      sportObj["teams"][natCodes[i]]["conference"] = currentLeague + "South";
    } else {
      sportObj["teams"][natCodes[i]]["conference"] = currentLeague + "West";
    }

    if (k == 5) {
      k = 1;
    }
  }
}

function getMlbSportStanding() {
  return getSportStanding("mlb", 11).then((response) => {
    let sportObj = {
      teams: {},
    };

    createMlbObj(
      sportObj,
      "AL ",
      response["amLeague"],
      response["amCodes"],
      response["scores"],
      0
    );
    createMlbObj(
      sportObj,
      "NL ",
      response["natLeague"],
      response["natCodes"],
      response["scores"],
      30
    );

    return sportObj;
  });
}

function getNflSportStanding() {
  return getSportStanding("nfl", 12).then((response) => {
    let sportObj = {
      teams: {},
    };

    createNflObj(
      sportObj,
      "AFC ",
      response["amLeague"],
      response["amCodes"],
      response["scores"],
      0
    );
    createNflObj(
      sportObj,
      "NFC ",
      response["natLeague"],
      response["natCodes"],
      response["scores"],
      32
    );

    return sportObj;
  });
}

exports.getMlbSportStanding = getMlbSportStanding;
exports.getNflSportStanding = getNflSportStanding;

/*
    --- IGNORE THIS ---
    Used to use RegEx to seperate the team names and codes but no longer needed currently, I think
    let amLeagueArray = amLeague.split(/(?<![A-Z\W])(?=[A-Z])/);
    let natLeageArray = natLeague.split(/(?<![A-Z\W])(?=[A-Z])/);
*/
