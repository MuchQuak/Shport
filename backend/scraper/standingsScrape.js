const axios = require("axios");
const cheerio = require("cheerio");

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
        let names = $(element)
          .find(".hide-mobile")
          .children()
          .toArray()
          .map((result) => {
            return $(result).text();
          });
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
    sportObj[natCodes[i]] = {};
    sportObj[natCodes[i]]["name"] = natLeague[i];
    sportObj[natCodes[i]]["city"] = "";
    sportObj[natCodes[i]]["code"] = natCodes[i];
    sportObj[natCodes[i]]["espn"] = natCodes[i];
    sportObj[natCodes[i]]["rank"] = k.toString();
    sportObj[natCodes[i]]["wins"] = scores[j];
    sportObj[natCodes[i]]["losses"] = scores[j + 1];

    j += 2;
    k += 1;

    if (i < 5) {
      sportObj[natCodes[i]]["conference"] = currentLeague + "East";
    } else if (i < 10) {
      sportObj[natCodes[i]]["conference"] = currentLeague + "Central";
    } else {
      sportObj[natCodes[i]]["conference"] = currentLeague + "West";
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
    sportObj[natCodes[i]] = {};
    sportObj[natCodes[i]]["name"] = natLeague[i];
    sportObj[natCodes[i]]["city"] = "";
    sportObj[natCodes[i]]["code"] = natCodes[i];
    sportObj[natCodes[i]]["espn"] = natCodes[i];
    sportObj[natCodes[i]]["rank"] = k.toString();
    sportObj[natCodes[i]]["wins"] = scores[j];
    sportObj[natCodes[i]]["losses"] = scores[j + 1];

    j += 2;
    k += 1;

    if (i < 4) {
      sportObj[natCodes[i]]["conference"] = currentLeague + "East";
    } else if (i < 8) {
      sportObj[natCodes[i]]["conference"] = currentLeague + "North";
    } else if (i < 12) {
      sportObj[natCodes[i]]["conference"] = currentLeague + "South";
    } else {
      sportObj[natCodes[i]]["conference"] = currentLeague + "West";
    }

    if (k == 5) {
      k = 1;
    }
  }
}

function getMlbSportStanding() {
  return getSportStanding("mlb", 11).then((response) => {
    let sportObj = {};

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
exports.getSportStanding = getSportStanding;
exports.createMlbObj = createMlbObj;
exports.createNflObj = createNflObj;