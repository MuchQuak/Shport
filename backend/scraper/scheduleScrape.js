const axios = require('axios');
const cheerio = require('cheerio');

function PSTtoUTC(time) {
    const timeParts = time.split(' ');

    if(timeParts.length < 2) {
        return time;
    }

    const pmAm = timeParts[1];
    const newtime = timeParts[0].split(':');
    const offset = pmAm[0] === 'A' ? 0 : 12;
    const hour = parseInt(newtime[0]) + 8 + offset;
    const min = parseInt(newtime[1]);
    const t = new Date();
    return new Date(Date.UTC(t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDay(), hour, min, 0));
}

function parseTeam(hrefString, cityStr) {

    if(hrefString === undefined) {
        return "";
    }

    //Gets City TeamName out of Href
    let delimited = hrefString.split('/');
    let teamCode = delimited[5];

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
    return { name: result, code: teamCode };
}

function parseFinalScore(scoreText) {
    //Format: HomeTag HomeScore, AwayTag AwayScore
    //Example MIL 4, PIT 2

    let gameScore = {
        away: '0',
        home: '0'
    }

    if(scoreText === "Postponed") {
        return gameScore;
    }

    const home = 0, away = 1, score = 1;
    let delimited = scoreText.split(', ');

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

async function scrapeLiveGameData(sportCode, gId) {

    let liveData = {
        away: "0",
        home: "0",
        clock: "",
        status: ""
    }

    if(gId === undefined) {
        console.log('gId undefined');
        return liveData;
    }

    let response = await axios.get(`https://www.espn.com/${sportCode}/game/_/gameId/${gId}`)

    let $ = cheerio.load(response.data);

    let teams = $('div.competitors');

    liveData.away = teams.find('.team.away').find('.score.icon-font-after').text().trim();
    liveData.home = teams.find('.team.home').find('.score.icon-font-before').text().trim();

    const gameTime = teams.find('.game-time')

    liveData.clock = gameTime.contents().map(function() {
        const text = $(this).text();
        return text !== undefined || text !== '' ? text + ' ' : '';
    }).get().join('');

    liveData.status = 1;

    return liveData;
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

async function scrapeGames(sportCode) {

    var response = await axios.get(`https://www.espn.com/${sportCode}/schedule`)
    let $ = cheerio.load(response.data);
    var games = [];

    //Scrapes schedule Infromation
    $(`.mt3 .ScheduleTables.mb5.ScheduleTables--${sportCode}`).each((i, schedule) => {
        $(schedule).find('.Table__TBODY').find('tr').each((j, tr) => {
            let game = {
                status: 0,
                clock: "",
                halftime: "",
                arena: "",
                currentQtr: "",
                maxQtr: "",
                away: "",
                away_code: "",
                away_score: "0",
                away_record: "",
                home: "",
                home_code: "",
                home_score: "0",
                home_record: "",
                startTimeUTC: "",
                gId: "",
            }

            let aTeam = $(tr).find('.events__col.Table__TD').find('a');
            let hTeam = $(tr).find('.colspan__col.Table__TD').find('a');

            if (aTeam.attr() === undefined) {
                game.away = 'TBA';
            } else {
                let team = parseTeam(aTeam.attr().href, aTeam.text().trim());
                game.away = team.name;
                game.away_code = team.code;
            }

            if (aTeam.attr() === undefined) {
                game.home = 'TBA';
            } else {
                let team = parseTeam(hTeam.attr().href, hTeam.text().trim());
                game.home = team.name;
                game.home_code = team.code;
            }

            let dateElem = $(tr).find('.date__col.Table__TD');

            //If game is finished get score
            if(dateElem.find('a').attr('href') === undefined) {
                game.startTimeUTC = "Ended";

                let gameResult = $(tr).find('.teams__col.Table__TD:first').find('a');
                let finalScore = parseFinalScore(gameResult.text());
                
                game.away_score = finalScore.away;
                game.home_score = finalScore.home;
                game.status = 2;
                game.gId = parsingGameId(gameResult.attr('href'));

            } else {
                game.startTimeUTC = PSTtoUTC(dateElem.find('a').text().trim());
                game.startTime = dateElem.find('a').text().trim();
                game.gId = parsingGameId(dateElem.find('a').attr('href'));
            }
            
            games.push(game); 
        });
    });

    //Update game scores if game is live
    for(let i = 0; i < games.length; i++) {
        if(games[i].startTimeUTC === 'LIVE') {
            const liveData = await scrapeLiveGameData(sportCode, games[i].gId);
            games[i].away_score = liveData.away;
            games[i].home_score = liveData.home;
            games[i].clock = liveData.clock;
            games[i].status = liveData.status;
        }
    }

    return games;
}

exports.scrapeGames = scrapeGames;
