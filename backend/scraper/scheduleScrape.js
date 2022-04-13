const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

// run isolated scraper -> node scraper.js

axios.get('https://www.espn.com/mlb/schedule')
    .then((response) => {
        let $ = cheerio.load(response.data);
        let schedule = {
            games: []
        }
        $('.Table__TBODY tr').each((i, tr) => {
            let game = {
                away: "",
                home: "",
                time: ""
            }
            game.away = $(tr).find('.events__col.Table__TD').find('a').text().trim();
            game.home = $(tr).find('.colspan__col.Table__TD').find('a').text().trim();
            game.time = $(tr).find('.date__col.Table__TD').find('a').text().trim();
            
            console.log(game);
        });
    })
    .catch((error) => {
        console.log(error);
 });