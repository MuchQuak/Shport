const cheerio = require("cheerio");
const axios = require("axios");
const fs = require('fs');
const standingsScraper = require("../../scraper/standingsScrape");

jest.mock('axios');

test("", async () => {  
  axios.get.mockResolvedValue({ data: fs.readFileSync("./models/tests/standingsExample.html") });

  await standingsScraper.getSportStanding("mlb", 11).then(result => {
    let sports = {"amCodes": ["NYY", "TB", "TOR", "BOS", "BAL", "MIN", "CHW", "CLE", "DET", "KC", "HOU", "LAA", "TEX", "OAK", "SEA"], 
                  "amLeague": ["New York Yankees", "Tampa Bay Rays", "Toronto Blue Jays", "Boston Red Sox", "Baltimore Orioles", "Minnesota Twins", "Chicago White Sox", "Cleveland Guardians", "Detroit Tigers", "Kansas City Royals", "Houston Astros", "Los Angeles Angels", "Texas Rangers", "Oakland Athletics", "Seattle Mariners"], 
                  "natCodes": ["NYM", "ATL", "PHI", "MIA", "WSH", "MIL", "STL", "PIT", "CHC", "CIN", "LAD", "SD", "SF", "ARI", "COL"], 
                  "natLeague": ["New York Mets", "Atlanta Braves", "Philadelphia Phillies", "Miami Marlins", "Washington Nationals", "Milwaukee Brewers", "St. Louis Cardinals", "Pittsburgh Pirates", "Chicago Cubs", "Cincinnati Reds", "Los Angeles Dodgers", "San Diego Padres", "San Francisco Giants", "Arizona Diamondbacks", "Colorado Rockies"], 
                  "scores": ["32", "13", "26", "18", "24", "20", "21", "23", "18", "27", "27", "18", "22", "22", "18", "23", "16", "28", "15", "28", "29", "16", "27", "19", "20", "23", "19", "28", "18", "27", "29", "17", "21", "24", "21", "24", "18", "24", "16", "30", "29", "16", "24", "20", "18", "25", "18", "26", "14", "30", "30", "14", "28", "16", "24", "19", "23", "23", "20", "24"]
                    };
    expect(result).toStrictEqual(sports);

  });

});