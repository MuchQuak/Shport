/* -- Testing userSchema */
const scraper = require("../../scraper/standingsScrape");
const axios = require("axios");

beforeEach(async () => {
  jest.clearAllMocks();
  jest.mock('axios');

});

test("TESTING MLB Standings:", () => {
    const teams = {
        "NYY": {
          "name": "New York Yankees",
          "city": "",
          "code": "NYY",
          "espn": "NYY",
          "rank": "1",
          "wins": "23",
          "losses": "8",
          "conference": "AL East"
        },
        "TB": {
          "name": "Tampa Bay Rays",
          "city": "",
          "code": "TB",
          "espn": "TB",
          "rank": "2",
          "wins": "19",
          "losses": "13",
          "conference": "AL East"
        },
        "TOR": {
          "name": "Toronto Blue Jays",
          "city": "",
          "code": "TOR",
          "espn": "TOR",
          "rank": "3",
          "wins": "17",
          "losses": "15",
          "conference": "AL East"
        },
        "BAL": {
          "name": "Baltimore Orioles",
          "city": "",
          "code": "BAL",
          "espn": "BAL",
          "rank": "4",
          "wins": "14",
          "losses": "18",
          "conference": "AL East"
        }
      };
    scraper.getMlbSportStanding = jest.fn().mockReturnValue(teams);

    expect(scraper.getMlbSportStanding()).toBe(teams);    
});


test("TESTING NFL Standings Data", () => {
  const teams ={
    "BUF": {
      "name": "Buffalo Bills",
      "city": "",
      "code": "BUF",
      "espn": "BUF",
      "rank": "1",
      "wins": "11",
      "losses": "6",
      "conference": "AFC East"
    },
    "NE": {
      "name": "New England Patriots",
      "city": "",
      "code": "NE",
      "espn": "NE",
      "rank": "2",
      "wins": "10",
      "losses": "7",
      "conference": "AFC East"
    },
    "MIA": {
      "name": "Miami Dolphins",
      "city": "",
      "code": "MIA",
      "espn": "MIA",
      "rank": "3",
      "wins": "9",
      "losses": "8",
      "conference": "AFC East"
    },
    "NYJ": {
      "name": "New York Jets",
      "city": "",
      "code": "NYJ",
      "espn": "NYJ",
      "rank": "4",
      "wins": "4",
      "losses": "13",
      "conference": "AFC East"
    },
    "CIN": {
      "name": "Cincinnati Bengals",
      "city": "",
      "code": "CIN",
      "espn": "CIN",
      "rank": "1",
      "wins": "10",
      "losses": "7",
      "conference": "AFC North"
    },
    "PIT": {
      "name": "Pittsburgh Steelers",
      "city": "",
      "code": "PIT",
      "espn": "PIT",
      "rank": "2",
      "wins": "9",
      "losses": "7",
      "conference": "AFC North"
    },
    "CLE": {
      "name": "Cleveland Browns",
      "city": "",
      "code": "CLE",
      "espn": "CLE",
      "rank": "3",
      "wins": "8",
      "losses": "9",
      "conference": "AFC North"
    }
  }
  
    scraper.getNflSportStanding = jest.fn().mockReturnValue(teams);

    expect(scraper.getNflSportStanding()).toBe(teams);    
});

test.only("TESTING SportStanding", () => {
  const responseBasic = {
      natLeague: [
        'New York Mets',
        'Philadelphia Phillies',
        'Atlanta Braves',
        'Miami Marlins',
        'Washington Nationals',
        'Milwaukee Brewers',
        'St. Louis Cardinals',
        'Pittsburgh Pirates',
        'Chicago Cubs',
        'Cincinnati Reds',
        'Los Angeles Dodgers',
        'San Diego Padres',
        'San Francisco Giants',
        'Arizona Diamondbacks',
        'Colorado Rockies'
      ],
      natCodes: [
        'NYM', 'PHI', 'ATL',
        'MIA', 'WSH', 'MIL',
        'STL', 'PIT', 'CHC',
        'CIN', 'LAD', 'SD',
        'SF',  'ARI', 'COL'
      ],
      amLeague: [
        'New York Yankees',
        'Tampa Bay Rays',
        'Toronto Blue Jays',
        'Baltimore Orioles',
        'Boston Red Sox',
        'Minnesota Twins',
        'Cleveland Guardians',
        'Chicago White Sox',
        'Kansas City Royals',
        'Detroit Tigers',
        'Houston Astros',
        'Los Angeles Angels',
        'Seattle Mariners',
        'Oakland Athletics',
        'Texas Rangers'
      ],
      amCodes: [
        'NYY', 'TB',  'TOR',
        'BAL', 'BOS', 'MIN',
        'CLE', 'CHW', 'KC',
        'DET', 'HOU', 'LAA',
        'SEA', 'OAK', 'TEX'
      ],
      scores: [
        '24', '9',  '20', '14', '18', '16', '14',
        '20', '13', '20', '19', '15', '16', '16',
        '16', '16', '11', '20', '11', '23', '22',
        '12', '22', '13', '15', '18', '15', '20',
        '13', '19', '22', '12', '16', '17', '16',
        '18', '15', '18', '12', '23', '21', '13',
        '18', '15', '14', '19', '11', '20', '9',
        '25', '20', '11', '21', '13', '20', '13',
        '18', '15', '17', '16'
      ]
    };
  const resp = {data: responseBasic};
 
  axios.get.mockResolvedValue(resp);

  // or you could use the following depending on your use case:
  //axios.get.mockImplementation(() => Promise.resolve(resp))

  return scraper.getSportStanding().then(data => expect(data).toEqual(users));  
  
  //scraper.getSportStanding = jest.fn().mockReturnValue(teams);

    //expect(scraper.getSportStanding()).toBe(teams);    
});
