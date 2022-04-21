const axios = require('axios');
const cheerio = require('cheerio');
const { time } = require('console');
const fs = require('fs');

// run isolated scraper -> node scraper.js

function parseTeamName(hrefString, cityStr) {

    if(hrefString === undefined) {
        return "";
    }

    //Gets City TeamName out of Href
    let delimited = hrefString.split('/');
    delimited = (delimited[delimited.length -1]).split('-')

    //Find how many words are in the city name
    const lastCityIndex = cityStr.split(' ').length;
    const teamName = delimited.slice(lastCityIndex);

    //Join and Capatilize team name
    let result = "";
    for(let i = 0; i < teamName.length; i++) {
        teamName[i] = capatilize(teamName[i]);

        if(i === 0) {
            result = teamName[i];
        }
        else {
            result += " " + teamName[i]
        }
    }

    return result;
}

function parsingGameId(hrefString) {
    if(hrefString === undefined) {
        return "";
    }
    let delimited = hrefString.split('=');
    return delimited[1];
}

function capatilize(str) {
    if(str.length > 1) {

        return str[0].toUpperCase() + str.slice(1);
    }

    return str.toUpperCase();
}

async function scrapeGameScore(sportCode, gId) {

    let scores = await axios.get(`https://www.espn.com/${sportCode}/game/_/gameId/${gId}`)
                .then((response) => {
                    let $ = cheerio.load(response.data);
                    let scoreData = {
                        away: 0,
                        home: 0
                    }

                    let teams = $('div.competitors');

                    const awayS = teams.find('.team.away').find('.score.icon-font-after').text().trim();
                    const homeS = teams.find('.team.home').find('.score.icon-font-before').text().trim();

                    if(awayS !== '') {
                        scoreData.away = awayS;
                    }
                    if(homeS !== '') {
                        scoreData.home = homeS;
                    }

                    return scoreData;
                });

    //console.log("a: " + scores.away + " h: " +  scores.home + " " + gId);

    return scores;
}

async function scrapeSchedule(sportCode) {

    var gameSchedule = await axios.get(`https://www.espn.com/${sportCode}/schedule`)
    .then((response) => {
        let $ = cheerio.load(response.data);
        var games = [];

        $(`.mt3 .ScheduleTables.mb5.ScheduleTables--${sportCode}`).each((i, schedule) => {
            $(schedule).find('.Table__TBODY').find('tr').each((j, tr) => {
                let game = {
                    away: "",
                    away_score: 0,
                    home: "",
                    home_score: 0,
                    time: "",
                    GId: ""
                }

                let aTeam = $(tr).find('.events__col.Table__TD').find('a');
                let hTeam = $(tr).find('.colspan__col.Table__TD').find('a');

                aTeam.attr() === undefined ? 
                    game.away = 'TBA' : 
                    game.away = parseTeamName(aTeam.attr().href, aTeam.text().trim());

                hTeam.attr() === undefined ? 
                    game.home = 'TBA' : 
                    game.home = parseTeamName(hTeam.attr().href, hTeam.text().trim());

                let dateElem = $(tr).find('.date__col.Table__TD');

                if(dateElem.find('a').attr('href') === undefined) {
                    game.time = "Game Finished";
                    game.GId = parsingGameId($(tr).find('.teams__col.Table__TD:first').find('a').attr('href'));
                    //Parse Score from finished maybe
                } else {
                    game.time = dateElem.find('a').text().trim();
                    game.GId = parsingGameId(dateElem.find('a').attr('href'));
                }

                scrapeGameScore(sportCode, gId);

                //console.log(game);
                
                games.push(game); 
            });
        });
 
        return games;
    })
    .catch((error) => {
        console.log(error);
    });

    return gameSchedule;
}

function scrapeGames(sportCode) {
    var p = Promise.resolve(scrapeSchedule(sportCode));
    var fullyPopluatedGames = [];

    p.then(function(games) {

        for(let i = 0; i < games.length; i++) {
            games[i];
            let score = Promise.resolve(scrapeGameScore(sportCode, games[i].GId));

            games[i] = score.then(function(res) {
                games[i].home_score = res.home;
                games[i].away_score = res.away;

                fullyPopluatedGames.push(games);
            });
        }
        //console.log(games);
        //return games;
    });

    //console.log(fullyPopluatedGames);

    return fullyPopluatedGames;
}
/*
new_game = {
    status: "",
    clock: "",
    halftime: "",
    arena: "",
    currentQtr: "",
    maxQtr: "",
    home: "",
    home_code: "",
    home_score: "",
    home_record: "",
    away: "",
    away_code: "",
    away_score: "",
    away_record: "",
    startTimeUTC: ""
}
*/

console.log(scrapeGames('mlb'))

//var p = Promise.resolve(scrapeGameId('mlb', 401354416));
/*
p.then(function(v) {
  console.log(v); // 1
});
*/
