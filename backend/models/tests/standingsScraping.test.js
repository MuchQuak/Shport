const axios = require("axios");
const fs = require('fs');
const standingsScraper = require("../../scraper/standingsScrape");

jest.mock('axios');

test("TESTING: General Scraping", async () => {  
  axios.get.mockResolvedValue({ data: fs.readFileSync("./models/tests/html_tests/standingsExampleMLB.html") });

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

test("TESTING: Create MLB object", async () => {  
  let mlbALStangings = {        
    NYY: { 
      name: 'New York Yankees',
      city: '',
      code: 'NYY',
      espn: 'NYY',
      rank: '1',
      wins: '32',
      losses: '13',
      conference: 'AL East'
    },
    TB: {
      name: 'Tampa Bay Rays',
      city: '',
      code: 'TB',
      espn: 'TB',
      rank: '2',
      wins: '26',
      losses: '18',
      conference: 'AL East'
    },
    TOR: {
      name: 'Toronto Blue Jays',
      city: '',
      code: 'TOR',
      espn: 'TOR',
      rank: '3',
      wins: '24',
      losses: '20',
      conference: 'AL East'
    },
    BOS: {
      name: 'Boston Red Sox',
      city: '',
      code: 'BOS',
      espn: 'BOS',
      rank: '4',
      wins: '21',
      losses: '23',
      conference: 'AL East'
    },
    BAL: {
      name: 'Baltimore Orioles',
      city: '',
      code: 'BAL',
      espn: 'BAL',
      rank: '5',
      wins: '18',
      losses: '27',
      conference: 'AL East'
    },
    MIN: {
      name: 'Minnesota Twins',
      city: '',
      code: 'MIN',
      espn: 'MIN',
      rank: '1',
      wins: '27',
      losses: '18',
      conference: 'AL Central'
    },
    CHW: {
      name: 'Chicago White Sox',
      city: '',
      code: 'CHW',
      espn: 'CHW',
      rank: '2',
      wins: '22',
      losses: '22',
      conference: 'AL Central'
    },
    CLE: {
      name: 'Cleveland Guardians',
      city: '',
      code: 'CLE',
      espn: 'CLE',
      rank: '3',
      wins: '18',
      losses: '23',
      conference: 'AL Central'
    },
    DET: {
      name: 'Detroit Tigers',
      city: '',
      code: 'DET',
      espn: 'DET',
      rank: '4',
      wins: '16',
      losses: '28',
      conference: 'AL Central'
    },
    KC: {
      name: 'Kansas City Royals',
      city: '',
      code: 'KC',
      espn: 'KC',
      rank: '5',
      wins: '15',
      losses: '28',
      conference: 'AL Central'
    },
    HOU: {
      name: 'Houston Astros',
      city: '',
      code: 'HOU',
      espn: 'HOU',
      rank: '1',
      wins: '29',
      losses: '16',
      conference: 'AL West'
    },
    LAA: {
      name: 'Los Angeles Angels',
      city: '',
      code: 'LAA',
      espn: 'LAA',
      rank: '2',
      wins: '27',
      losses: '19',
      conference: 'AL West'
    },
    TEX: {
      name: 'Texas Rangers',
      city: '',
      code: 'TEX',
      espn: 'TEX',
      rank: '3',
      wins: '20',
      losses: '23',
      conference: 'AL West'
    },
    OAK: {
      name: 'Oakland Athletics',
      city: '',
      code: 'OAK',
      espn: 'OAK',
      rank: '4',
      wins: '19',
      losses: '28',
      conference: 'AL West'
    },
    SEA: {
      name: 'Seattle Mariners',
      city: '',
      code: 'SEA',
      espn: 'SEA',
      rank: '5',
      wins: '18',
      losses: '27',
      conference: 'AL West'
    }
  };

  axios.get.mockResolvedValue({ data: fs.readFileSync("./models/tests/html_tests/standingsExampleMLB.html") });
  await standingsScraper.getSportStanding("mlb", 11).then((response) => {
    let sportObj = {};

    standingsScraper.createMlbObj(
      sportObj,
      "AL ",
      response["amLeague"],
      response["amCodes"],
      response["scores"],
      0
    );
    
    expect(sportObj).toStrictEqual(mlbALStangings);

  });
});


test("TESTING: Create NFL object", async () => {  
  let nflALStangings = {"BAL": {"city": "", "code": "BAL", "conference": "AL North", "espn": "BAL", "losses": "9", "name": "Baltimore Ravens", "rank": "4", "wins": "8"}, "BUF": {"city": "", "code": "BUF", "conference": "AL East", "espn": "BUF", "losses": "6", "name": "Buffalo Bills", "rank": "1", "wins": "11"}, "CIN": {"city": "", "code": "CIN", "conference": "AL North", "espn": "CIN", "losses": "7", "name": "Cincinnati Bengals", "rank": "1", "wins": "10"}, "CLE": {"city": "", "code": "CLE", "conference": "AL North", "espn": "CLE", "losses": "9", "name": "Cleveland Browns", "rank": "3", "wins": "8"}, "DEN": {"city": "", "code": "DEN", "conference": "AL West", "espn": "DEN", "losses": "10", "name": "Denver Broncos", "rank": "4", "wins": "7"}, "HOU": {"city": "", "code": "HOU", "conference": "AL South", "espn": "HOU", "losses": "13", "name": "Houston Texans", "rank": "3", "wins": "4"}, "IND": {"city": "", "code": "IND", "conference": "AL South", "espn": "IND", "losses": "8", "name": "Indianapolis Colts", "rank": "2", "wins": "9"}, "JAX": {"city": "", "code": "JAX", "conference": "AL South", "espn": "JAX", 
  "losses": "14", "name": "Jacksonville Jaguars", "rank": "4", "wins": "3"}, "KC": {"city": "", "code": "KC", "conference": "AL West", "espn": "KC", "losses": "5", "name": "Kansas City Chiefs", "rank": "1", "wins": "12"}, "LAC": {"city": "", "code": "LAC", "conference": "AL West", "espn": "LAC", "losses": "8", "name": "Los Angeles Chargers", "rank": "3", "wins": "9"}, "LV": {"city": "", "code": "LV", "conference": "AL West", "espn": "LV", "losses": "7", "name": "Las Vegas Raiders", "rank": "2", "wins": "10"}, "MIA": {"city": "", "code": "MIA", "conference": "AL East", "espn": "MIA", "losses": "8", "name": "Miami Dolphins", "rank": "3", "wins": "9"}, "NE": {"city": "", "code": "NE", "conference": "AL East", "espn": "NE", "losses": "7", "name": "New England Patriots", "rank": "2", "wins": "10"}, "NYJ": {"city": "", "code": "NYJ", "conference": "AL East", "espn": "NYJ", "losses": "13", "name": "New York Jets", "rank": "4", "wins": "4"}, "PIT": {"city": "", "code": "PIT", "conference": "AL North", "espn": "PIT", "losses": "7", "name": "Pittsburgh Steelers", "rank": "2", "wins": "9"}, "TEN": {"city": "", "code": "TEN", "conference": "AL South", "espn": "TEN", "losses": "5", "name": "Tennessee Titans", "rank": "1", "wins": "12"}};

  axios.get.mockResolvedValue({ data: fs.readFileSync("./models/tests/html_tests/standingsExampleNFL.html") });
  await standingsScraper.getSportStanding("nfl", 12).then((response) => {
    let sportObj = {};

    standingsScraper.createNflObj(
      sportObj,
      "AL ",
      response["amLeague"],
      response["amCodes"],
      response["scores"],
      0
    );
    
    expect(sportObj).toStrictEqual(nflALStangings);

  });
});

test("TESTING: MLB standings", async () => {  
  let mlbStandings = { NYY: { 
    name: 'New York Yankees',
    city: '',
    code: 'NYY',
    espn: 'NYY',
    rank: '1',
    wins: '32',
    losses: '13',
    conference: 'AL East'
  },
  TB: {
    name: 'Tampa Bay Rays',
    city: '',
    code: 'TB',
    espn: 'TB',
    rank: '2',
    wins: '26',
    losses: '18',
    conference: 'AL East'
  },
  TOR: {
    name: 'Toronto Blue Jays',
    city: '',
    code: 'TOR',
    espn: 'TOR',
    rank: '3',
    wins: '24',
    losses: '20',
    conference: 'AL East'
  },
  BOS: {
    name: 'Boston Red Sox',
    city: '',
    code: 'BOS',
    espn: 'BOS',
    rank: '4',
    wins: '21',
    losses: '23',
    conference: 'AL East'
  },
  BAL: {
    name: 'Baltimore Orioles',
    city: '',
    code: 'BAL',
    espn: 'BAL',
    rank: '5',
    wins: '18',
    losses: '27',
    conference: 'AL East'
  },
  MIN: {
    name: 'Minnesota Twins',
    city: '',
    code: 'MIN',
    espn: 'MIN',
    rank: '1',
    wins: '27',
    losses: '18',
    conference: 'AL Central'
  },
  CHW: {
    name: 'Chicago White Sox',
    city: '',
    code: 'CHW',
    espn: 'CHW',
    rank: '2',
    wins: '22',
    losses: '22',
    conference: 'AL Central'
  },
  CLE: {
    name: 'Cleveland Guardians',
    city: '',
    code: 'CLE',
    espn: 'CLE',
    rank: '3',
    wins: '18',
    losses: '23',
    conference: 'AL Central'
  },
  DET: {
    name: 'Detroit Tigers',
    city: '',
    code: 'DET',
    espn: 'DET',
    rank: '4',
    wins: '16',
    losses: '28',
    conference: 'AL Central'
  },
  KC: {
    name: 'Kansas City Royals',
    city: '',
    code: 'KC',
    espn: 'KC',
    rank: '5',
    wins: '15',
    losses: '28',
    conference: 'AL Central'
  },
  HOU: {
    name: 'Houston Astros',
    city: '',
    code: 'HOU',
    espn: 'HOU',
    rank: '1',
    wins: '29',
    losses: '16',
    conference: 'AL West'
  },
  LAA: {
    name: 'Los Angeles Angels',
    city: '',
    code: 'LAA',
    espn: 'LAA',
    rank: '2',
    wins: '27',
    losses: '19',
    conference: 'AL West'
  },
  TEX: {
    name: 'Texas Rangers',
    city: '',
    code: 'TEX',
    espn: 'TEX',
    rank: '3',
    wins: '20',
    losses: '23',
    conference: 'AL West'
  },
  OAK: {
    name: 'Oakland Athletics',
    city: '',
    code: 'OAK',
    espn: 'OAK',
    rank: '4',
    wins: '19',
    losses: '28',
    conference: 'AL West'
  },
  SEA: {
    name: 'Seattle Mariners',
    city: '',
    code: 'SEA',
    espn: 'SEA',
    rank: '5',
    wins: '18',
    losses: '27',
    conference: 'AL West'
  },
  NYM: {
    name: 'New York Mets',
    city: '',
    code: 'NYM',
    espn: 'NYM',
    rank: '1',
    wins: '29',
    losses: '17',
    conference: 'NL East'
  },
  ATL: {
    name: 'Atlanta Braves',
    city: '',
    code: 'ATL',
    espn: 'ATL',
    rank: '2',
    wins: '21',
    losses: '24',
    conference: 'NL East'
  },
  PHI: {
    name: 'Philadelphia Phillies',
    city: '',
    code: 'PHI',
    espn: 'PHI',
    rank: '3',
    wins: '21',
    losses: '24',
    conference: 'NL East'
  },
  MIA: {
    name: 'Miami Marlins',
    city: '',
    code: 'MIA',
    espn: 'MIA',
    rank: '4',
    wins: '18',
    losses: '24',
    conference: 'NL East'
  },
  WSH: {
    name: 'Washington Nationals',
    city: '',
    code: 'WSH',
    espn: 'WSH',
    rank: '5',
    wins: '16',
    losses: '30',
    conference: 'NL East'
  },
  MIL: {
    name: 'Milwaukee Brewers',
    city: '',
    code: 'MIL',
    espn: 'MIL',
    rank: '1',
    wins: '29',
    losses: '16',
    conference: 'NL Central'
  },
  STL: {
    name: 'St. Louis Cardinals',
    city: '',
    code: 'STL',
    espn: 'STL',
    rank: '2',
    wins: '24',
    losses: '20',
    conference: 'NL Central'
  },
  PIT: {
    name: 'Pittsburgh Pirates',
    city: '',
    code: 'PIT',
    espn: 'PIT',
    rank: '3',
    wins: '18',
    losses: '25',
    conference: 'NL Central'
  },
  CHC: {
    name: 'Chicago Cubs',
    city: '',
    code: 'CHC',
    espn: 'CHC',
    rank: '4',
    wins: '18',
    losses: '26',
    conference: 'NL Central'
  },
  CIN: {
    name: 'Cincinnati Reds',
    city: '',
    code: 'CIN',
    espn: 'CIN',
    rank: '5',
    wins: '14',
    losses: '30',
    conference: 'NL Central'
  },
  LAD: {
    name: 'Los Angeles Dodgers',
    city: '',
    code: 'LAD',
    espn: 'LAD',
    rank: '1',
    wins: '30',
    losses: '14',
    conference: 'NL West'
  },
  SD: {
    name: 'San Diego Padres',
    city: '',
    code: 'SD',
    espn: 'SD',
    rank: '2',
    wins: '28',
    losses: '16',
    conference: 'NL West'
  },
  SF: {
    name: 'San Francisco Giants',
    city: '',
    code: 'SF',
    espn: 'SF',
    rank: '3',
    wins: '24',
    losses: '19',
    conference: 'NL West'
  },
  ARI: {
    name: 'Arizona Diamondbacks',
    city: '',
    code: 'ARI',
    espn: 'ARI',
    rank: '4',
    wins: '23',
    losses: '23',
    conference: 'NL West'
  },
  COL: {
    name: 'Colorado Rockies',
    city: '',
    code: 'COL',
    espn: 'COL',
    rank: '5',
    wins: '20',
    losses: '24',
    conference: 'NL West'
  }
};

  axios.get.mockResolvedValue({ data: fs.readFileSync("./models/tests/html_tests/standingsExampleMLB.html") });

  await standingsScraper.getMlbSportStanding().then( result =>{
    expect(result).toStrictEqual(mlbStandings);
  
  })
});

test("TESTING: NFL standings", async () => {  
  let nflStandings =   {
    teams: {},
    BUF: {
      name: 'Buffalo Bills',
      city: '',
      code: 'BUF',
      espn: 'BUF',
      rank: '1',
      wins: '11',
      losses: '6',
      conference: 'AFC East'
    },
    NE: {
      name: 'New England Patriots',
      city: '',
      code: 'NE',
      espn: 'NE',
      rank: '2',
      wins: '10',
      losses: '7',
      conference: 'AFC East'
    },
    MIA: {
      name: 'Miami Dolphins',
      city: '',
      code: 'MIA',
      espn: 'MIA',
      rank: '3',
      wins: '9',
      losses: '8',
      conference: 'AFC East'
    },
    NYJ: {
      name: 'New York Jets',
      city: '',
      code: 'NYJ',
      espn: 'NYJ',
      rank: '4',
      wins: '4',
      losses: '13',
      conference: 'AFC East'
    },
    CIN: {
      name: 'Cincinnati Bengals',
      city: '',
      code: 'CIN',
      espn: 'CIN',
      rank: '1',
      wins: '10',
      losses: '7',
      conference: 'AFC North'
    },
    PIT: {
      name: 'Pittsburgh Steelers',
      city: '',
      code: 'PIT',
      espn: 'PIT',
      rank: '2',
      wins: '9',
      losses: '7',
      conference: 'AFC North'
    },
    CLE: {
      name: 'Cleveland Browns',
      city: '',
      code: 'CLE',
      espn: 'CLE',
      rank: '3',
      wins: '8',
      losses: '9',
      conference: 'AFC North'
    },
    BAL: {
      name: 'Baltimore Ravens',
      city: '',
      code: 'BAL',
      espn: 'BAL',
      rank: '4',
      wins: '8',
      losses: '9',
      conference: 'AFC North'
    },
    TEN: {
      name: 'Tennessee Titans',
      city: '',
      code: 'TEN',
      espn: 'TEN',
      rank: '1',
      wins: '12',
      losses: '5',
      conference: 'AFC South'
    },
    IND: {
      name: 'Indianapolis Colts',
      city: '',
      code: 'IND',
      espn: 'IND',
      rank: '2',
      wins: '9',
      losses: '8',
      conference: 'AFC South'
    },
    HOU: {
      name: 'Houston Texans',
      city: '',
      code: 'HOU',
      espn: 'HOU',
      rank: '3',
      wins: '4',
      losses: '13',
      conference: 'AFC South'
    },
    JAX: {
      name: 'Jacksonville Jaguars',
      city: '',
      code: 'JAX',
      espn: 'JAX',
      rank: '4',
      wins: '3',
      losses: '14',
      conference: 'AFC South'
    },
    KC: {
      name: 'Kansas City Chiefs',
      city: '',
      code: 'KC',
      espn: 'KC',
      rank: '1',
      wins: '12',
      losses: '5',
      conference: 'AFC West'
    },
    LV: {
      name: 'Las Vegas Raiders',
      city: '',
      code: 'LV',
      espn: 'LV',
      rank: '2',
      wins: '10',
      losses: '7',
      conference: 'AFC West'
    },
    LAC: {
      name: 'Los Angeles Chargers',
      city: '',
      code: 'LAC',
      espn: 'LAC',
      rank: '3',
      wins: '9',
      losses: '8',
      conference: 'AFC West'
    },
    DEN: {
      name: 'Denver Broncos',
      city: '',
      code: 'DEN',
      espn: 'DEN',
      rank: '4',
      wins: '7',
      losses: '10',
      conference: 'AFC West'
    },
    DAL: {
      name: 'Dallas Cowboys',
      city: '',
      code: 'DAL',
      espn: 'DAL',
      rank: '1',
      wins: '12',
      losses: '5',
      conference: 'NFC East'
    },
    PHI: {
      name: 'Philadelphia Eagles',
      city: '',
      code: 'PHI',
      espn: 'PHI',
      rank: '2',
      wins: '9',
      losses: '8',
      conference: 'NFC East'
    },
    WSH: {
      name: 'Washington',
      city: '',
      code: 'WSH',
      espn: 'WSH',
      rank: '3',
      wins: '7',
      losses: '10',
      conference: 'NFC East'
    },
    NYG: {
      name: 'New York Giants',
      city: '',
      code: 'NYG',
      espn: 'NYG',
      rank: '4',
      wins: '4',
      losses: '13',
      conference: 'NFC East'
    },
    GB: {
      name: 'Green Bay Packers',
      city: '',
      code: 'GB',
      espn: 'GB',
      rank: '1',
      wins: '13',
      losses: '4',
      conference: 'NFC North'
    },
    MIN: {
      name: 'Minnesota Vikings',
      city: '',
      code: 'MIN',
      espn: 'MIN',
      rank: '2',
      wins: '8',
      losses: '9',
      conference: 'NFC North'
    },
    CHI: {
      name: 'Chicago Bears',
      city: '',
      code: 'CHI',
      espn: 'CHI',
      rank: '3',
      wins: '6',
      losses: '11',
      conference: 'NFC North'
    },
    DET: {
      name: 'Detroit Lions',
      city: '',
      code: 'DET',
      espn: 'DET',
      rank: '4',
      wins: '3',
      losses: '13',
      conference: 'NFC North'
    },
    TB: {
      name: 'Tampa Bay Buccaneers',
      city: '',
      code: 'TB',
      espn: 'TB',
      rank: '1',
      wins: '13',
      losses: '4',
      conference: 'NFC South'
    },
    NO: {
      name: 'New Orleans Saints',
      city: '',
      code: 'NO',
      espn: 'NO',
      rank: '2',
      wins: '9',
      losses: '8',
      conference: 'NFC South'
    },
    ATL: {
      name: 'Atlanta Falcons',
      city: '',
      code: 'ATL',
      espn: 'ATL',
      rank: '3',
      wins: '7',
      losses: '10',
      conference: 'NFC South'
    },
    CAR: {
      name: 'Carolina Panthers',
      city: '',
      code: 'CAR',
      espn: 'CAR',
      rank: '4',
      wins: '5',
      losses: '12',
      conference: 'NFC South'
    },
    LAR: {
      name: 'Los Angeles Rams',
      city: '',
      code: 'LAR',
      espn: 'LAR',
      rank: '1',
      wins: '12',
      losses: '5',
      conference: 'NFC West'
    },
    ARI: {
      name: 'Arizona Cardinals',
      city: '',
      code: 'ARI',
      espn: 'ARI',
      rank: '2',
      wins: '11',
      losses: '6',
      conference: 'NFC West'
    },
    SF: {
      name: 'San Francisco 49ers',
      city: '',
      code: 'SF',
      espn: 'SF',
      rank: '3',
      wins: '10',
      losses: '7',
      conference: 'NFC West'
    },
    SEA: {
      name: 'Seattle Seahawks',
      city: '',
      code: 'SEA',
      espn: 'SEA',
      rank: '4',
      wins: '7',
      losses: '10',
      conference: 'NFC West'
    }
  };

  axios.get.mockResolvedValue({ data: fs.readFileSync("./models/tests/html_tests/standingsExampleNFL.html") });

  await standingsScraper.getNflSportStanding().then( result =>{
    expect(result).toStrictEqual(nflStandings);
  
  })
});