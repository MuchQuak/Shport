const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

// run isolated scraper -> node scraper.js

function parseTeamName(hrefString, cityStr) {
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

function capatilize(str) {
    if(str.length > 1) {

        return str[0].toUpperCase() + str.slice(1);
    }

    return str.toUpperCase();
}

async function scrapeSchedule(sportCode) {

    var gameSchedule = await axios.get(`https://www.espn.com/${sportCode}/schedule` )
    .then((response) => {
        let $ = cheerio.load(response.data);
        var games = [];

        $(`.mt3 .ScheduleTables.mb5.ScheduleTables--${sportCode}`).each((i, schedule) => {
            $(schedule).find('.Table__TBODY').find('tr').each((j, tr) => {
                let game = {
                    away: "",
                    home: "",
                    time: ""
                }
                let aTeam = $(tr).find('.events__col.Table__TD').find('a');
                let hTeam = $(tr).find('.colspan__col.Table__TD').find('a');

                aTeam.attr() === undefined ? 
                    game.away = 'TBA' : 
                    game.away = parseTeamName(aTeam.attr().href, aTeam.text().trim());

                hTeam.attr() === undefined ? 
                    game.home = 'TBA' : 
                    game.home = parseTeamName(hTeam.attr().href, hTeam.text().trim());

                game.time = $(tr).find('.date__col.Table__TD').find('a').text().trim();
                
                games.push(game); 
            });
        });

        return games;
    })
    .catch((error) => {
        console.log(error);
    });

    //console.log(gameSchedule);

    return gameSchedule;
}

var p = Promise.resolve( scrapeSchedule('nhl'));
p.then(function(v) {
  console.log(v); // 1
});

/*
 axios.get('https://www.espn.com/mlb/scoreboard' )
    .then((response) => {
        let $ = cheerio.load(response.data);
        let schedule = {
            games: []
        }

        var page = $.root();

        $('#events ').each((i, g) => {
            let game = {
                away: "",
                home: "",
                time: ""
            }
            //game.away = $(g).find('.away').find('.sb-team-short').text().trim();
            //game.home = $(swrap).find('.home').find('a').text().trim();
            //game.time = $(tr).find('.date__col.Table__TD').find('a').text().trim();
            let val = $(g).html();
            //let val = $(g).find('.sb-team-short:first')[0].tagName;

            console.log(i + 1 + " " + val);
        });
    })
    .catch((error) => {
        console.log(error);
 });
 */