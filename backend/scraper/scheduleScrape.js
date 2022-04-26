const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

function parseTeamName(hrefString, cityStr) {

    if(hrefString === undefined) {
        return "";
    }

    //Gets City TeamName out of Href
    let delimited = hrefString.split('/');
    delimited = (delimited[delimited.length -1]).split('-');

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

function parseFinalScore(scoreText) {
    //Format: HomeTag HomeScore, AwayTag AwayScore
    //Example MIL 4, PIT 2

    let gameScore = {
        away: '',
        home: ''
    }

    const home = 0, away = 1, score = 1;
    let delimited = scoreText.split(', ');

    console.log(delimited);

    gameScore.home = delimited[home].split(' ')[score];
    gameScore.away = delimited[away].split(' ')[score];

    return gameScore;
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

async function scrapeScore(sportCode, gId) {

    if(gId === undefined) {
        console.log('gId undefined')
        return {
            away: 0,
            home: 0
        }
    }

    let response = await axios.get(`https://www.espn.com/${sportCode}/game/_/gameId/${gId}`)
   
    let $ = cheerio.load(response.data);
    let scores = {
        away: 0,
        home: 0
    }

    let teams = $('div.competitors');

    const awayS = teams.find('.team.away').find('.score.icon-font-after').text().trim();
    const homeS = teams.find('.team.home').find('.score.icon-font-before').text().trim();

    if(awayS !== '') {
        scores.away = awayS;
    }
    if(homeS !== '') {
        scores.home = homeS;
    }

    return scores;
}

async function scrapeGames(sportCode) {

    var response = await axios.get(`https://www.espn.com/${sportCode}/schedule`)
    let $ = cheerio.load(response.data);
    var games = [];

    //Scrapes schedule Infromation
    $(`.mt3 .ScheduleTables.mb5.ScheduleTables--${sportCode}`).each((i, schedule) => {
        $(schedule).find('.Table__TBODY').find('tr').each((j, tr) => {
            let game = {
                away: "",
                away_score: 0,
                home: "",
                home_score: 0,
                time: "",
                gId: "",
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
                game.time = "Ended";

                let gameResult = $(tr).find('.teams__col.Table__TD:first').find('a');
                let finalScore = parseFinalScore(gameResult.text());
                
                game.home_away = finalScore.away;
                game.home_score = finalScore.home;

                game.gId = parsingGameId(gameResult.attr('href'));
            } else {
                game.time = dateElem.find('a').text().trim();
                game.gId = parsingGameId(dateElem.find('a').attr('href'));
            }
            
            games.push(game); 
        });
    });

    //Update game scores if game is live
    for(let i = 0; i < games.length; i++) {
        if(games[i].time === 'LIVE') {
            const scores = await scrapeScore(sportCode, games[i].gId);
            games[i].away_score = scores.away;
            games[i].home_score = scores.home;
        }
    }

    //console.log(games);

    return games;
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

exports.scrapeGames = scrapeGames;