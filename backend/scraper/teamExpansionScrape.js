const axios = require("axios");
const cheerio = require("cheerio");

// get methods return list of objects
//let league = 'nba'
//let acro = 'atl'

async function getTopPlayers(league, acro) {
  /* example
    {
        name: 'Trae Young',
        category: 'Points',
        image: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
        position: 'PG',
        value: '28.4'
    }
    */
  axios
    .get(
      "https://www.espn.com/" +
        league +
        "/team/stats/_/name/" +
        acro +
        "/season/2022/seasontype/2"
    )
    .then((response) => {
      let $ = cheerio.load(response.data);
      let topPlayers = [];

      $(".StatLeaders a").each((index, element) => {
        let category = $(element).find("h2").first().text().trim();
        let name = $(element)
          .find(".Athlete__PlayerName")
          .first()
          .text()
          .trim();
        let image = $(element)
          .find(".Image__Wrapper.aspect-ratio--child")
          .find("img")
          .attr("src");
        let position = $(element).find(".Athlete__NameDetails").text().trim();
        let value = $(element).find(".clr-gray-01").text().trim();

        let player = { name, category, image, position, value };
        topPlayers.push(player);
      });
      return topPlayers;
    })
    .catch((error) => {
      console.log(error);
    });
}

async function getRoster(league, acro) {
  /* example (some attributes will differ by league)
        {
            image: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
            name: 'Trae Young',
            number: '11',
            position: 'PG',
            age: '23',
            height: `6' 1"`,
            weight: '164 lbs',
            college: 'Oklahoma',
            salary: '$8,326,471'
        }
    */
  return await axios
    .get("https://www.espn.com/" + league + "/team/roster/_/name/" + acro)
    .then((response) => {
      let $ = cheerio.load(response.data);
      let roster = [];

      $(".Table__TBODY tr").each((index, element) => {
        let player = [];

        $(element)
          .find(".inline")
          .each((index, elem) => {
            let value = $(elem).text().trim();

            if (index == 0) {
              let img = $(elem).find("img").attr("src");
              player.push(img);
            } else if (index == 1) {
              let num = value.match(/\d+/g);
              let name = value.replace(/[0-9]/g, "");
              player.push(name);

              if (num) {
                player.push(num[0]);
              } else {
                player.push("n/a");
              }
            } else {
              player.push(value);
            }
          });
        let playerObj = {};

        if (league == "nba") {
          playerObj.image = player[0];
          playerObj.name = player[1];
          playerObj.number = player[2];
          playerObj.position = player[3];
          playerObj.age = player[4];
          playerObj.height = player[5];
          playerObj.weight = player[6];
          playerObj.college = player[7];
          playerObj.salary = player[8];
        } else if (league == "mlb") {
          playerObj.image = player[0];
          playerObj.name = player[1];
          playerObj.number = player[2];
          playerObj.position = player[3];
          playerObj.batting = player[4];
          playerObj.throwing = player[5];
          playerObj.age = player[6];
          playerObj.height = player[7];
          playerObj.weight = player[8];
          playerObj.birthplace = player[9];
        } else if (league == "nhl") {
          playerObj.image = player[0];
          playerObj.name = player[1];
          playerObj.number = player[2];
          playerObj.age = player[3];
          playerObj.height = player[4];
          playerObj.weight = player[5];
          playerObj.shot = player[6];
          playerObj.birthplace = player[7];
          playerObj.birthdate = player[8];
        } else if (league == "nfl") {
          console.log(player);
          playerObj.image = player[0];
          playerObj.name = player[1];
          playerObj.number = player[2];
          playerObj.position = player[3];
          playerObj.age = player[4];
          playerObj.height = player[5];
          playerObj.weight = player[6];
          playerObj.experience = player[7];
          playerObj.college = player[8];
        }
        roster.push(playerObj);
      });
      return roster;
    })
    .catch((error) => {
      console.log(error);
    });
}

async function getInjuries(league, acro) {
  /* example
        {
            name: 'Clint Capela',
            position: 'C',
            status: 'Out',
            description: 'General manager Travis Schlenk said Tuesday that Capela (knee) has restarted strength exercises and will be re-evaluated Friday, Mike Conti of the Atlanta Hawks Radio Network reports.'
        }
    */
  axios
    .get("https://www.espn.com/" + league + "/team/injuries/_/name/" + acro)
    .then((response) => {
      let $ = cheerio.load(response.data);
      let injuries = [];

      $(".Wrapper.Card__Content .ContentList__Item").each((index, element) => {
        let injuryObj = {};

        injuryObj.name = $(element).find(".Athlete__PlayerName").text().trim();
        injuryObj.position = $(element)
          .find(".Athlete__NameDetails.ml2.clr-gray-04.di.ns9")
          .text()
          .trim();
        injuryObj.status = $(element).find(".TextStatus").text().trim();
        injuryObj.description = $(element)
          .find(".pt3.clr-gray-04.n8")
          .text()
          .trim();
        if (injuryObj.name) {
          injuries.push(injuryObj);
        }
      });
      return injuries;
    })
    .catch((error) => {
      console.log(error);
    });
}

// not fully working
async function getSchedule(league, acro) {
  axios
    .get("https://www.espn.com/" + league + "/team/_/name/" + acro)
    .then((response) => {
      let $ = cheerio.load(response.data);
      let schedule = [];

      $(".Schedule__Scroll__Container.bg-clr-white section a").each(
        (index, element) => {
          let game = [];
          let opponent = $(element)
            .find(".Schedule__Team.truncate")
            .text()
            .trim();
          let image = $(element).find("img").attr("src");

          game.push(opponent);
          game.push(image);

          $(element)
            .find(".Schedule__Meta.flex.ttu.items-end span")
            .each((index, elem) => {
              let val = $(elem).text().trim();
              game.push(val);
            });

          if (game.length == 4) {
            gameObj = {
              status: "past",
              opponent,
              image,
              result: game[2],
              score: game[3],
            };
            /* example
                    {
                        status: 'past',
                        opponent: 'Heat',
                        image: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
                        result: 'L',
                        score: '115-105'
                    }
                    */
          } else {
            gameObj = {
              status: "future",
              opponent,
              image,
              date: game[2],
              time: game[3],
              channel: game[4],
            };
            /* example
                    {
                        status: 'future',
                        opponent: 'Heat',
                        image: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
                        date: '4/22',
                        time: '7:00 pm',
                        channel: 'ESPN'
                    }
                    */
          }

          schedule.push(gameObj);
        }
      );
      //console.log(schedule);
      return schedule;
    })
    .catch((error) => {
      console.log(error);
    });
}

async function getTransactions(league, acro) {
  /* example
    {
        date: 'April 13, 2022',
        description: 'Signed DT Vincent Taylor to a one-year contract.'
    }
    */
  axios
    .get("https://www.espn.com/" + league + "/team/transactions/_/name/" + acro)
    .then((response) => {
      let $ = cheerio.load(response.data);
      let transactions = [];

      $(".Table__TBODY tr").each((index, element) => {
        let transaction = {};
        $(element)
          .find("td")
          .each((idx, elem) => {
            if (idx == 0) {
              transaction.date = $(elem).find("span").text().trim();
            } else if (idx == 1) {
              transaction.description = $(elem).find("span").text().trim();
            }
          });
        transactions.push(transaction);
      });
      return transactions;
    })
    .catch((error) => {
      console.log(error);
    });
}

async function getTeamNews(league, acro) {
  /* example
    {
        url: 'https://www.espn.com/nba/recap/_/gameId/401430216',
        title: 'Butler scores 45, Heat defeat Hawks 115-105 for 2-0 lead',
        timeElapsed: '2d'
    }
    */
  const host = "https://www.espn.com";
  axios
    .get(host + "/" + league + "/team/_/name/" + acro)
    .then((response) => {
      let $ = cheerio.load(response.data);
      let teamNews = [];
      $(".ResponsiveWrapper").each((index, element) => {
        let path = $(element).find("a").attr("href");
        let title = $(element)
          .find(".contentItem__title .Truncate.Truncate--collapsed span")
          .text()
          .trim();
        let timeElapsed = $(element)
          .find(
            ".contentItem__publicationMeta.flex.ns9.mt2.clr-gray-05 .time-elapsed"
          )
          .text()
          .trim();

        if (path) {
          newsObj = {
            url: host + path,
            title: title,
            timeElapsed: timeElapsed,
          };
          teamNews.push(newsObj);
        }
      });
      return teamNews;
    })
    .catch((error) => {
      console.log(error);
    });
}

exports.getInjuries = getInjuries;
exports.getRoster = getRoster;
exports.getSchedule = getSchedule;
exports.getTeamNews = getTeamNews;
exports.getTopPlayers = getTopPlayers;
exports.getTransactions = getTransactions;
