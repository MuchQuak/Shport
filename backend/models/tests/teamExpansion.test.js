const axios = require("axios");
const fs = require('fs');
const teamExapansionScrape = require("../../scraper/teamExpansionScrape");

jest.mock('axios');

test("TESTING: Top Players", async () => {  
  let topPlayers =      [        
    {      
      name: 'Reggie Jackson',
      category: 'Points',
      image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/6443.png&h=96&w=96&scale=crop',
      position: 'PG',
      value: '16.8'
    },
    {
      name: 'Ivica Zubac',
      category: 'Rebounds',
      image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/4017837.png&h=96&w=96&scale=crop',
      position: 'C',
      value: '8.5'
    },
    {
      name: 'Reggie Jackson',
      category: 'Assists',
      image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/6443.png&h=96&w=96&scale=crop',
      position: 'PG',
      value: '4.8'
    },
    {
      name: 'Nicolas Batum',
      category: 'Steals',
      image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3416.png&h=96&w=96&scale=crop',
      position: 'PF',
      value: '1.0'
    },
    {
      name: 'Isaiah Hartenstein',
      category: 'Blocks',
      image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/4222252.png&h=96&w=96&scale=crop',
      position: 'C',
      value: '1.1'
    }
  ];
  axios.get.mockResolvedValue({ data: fs.readFileSync("./models/tests/html_tests/teamTopPlayersExample.html") });

  let scrapedTopPlayers = await teamExapansionScrape.getTopPlayers("nba", "lac");
  expect(scrapedTopPlayers).toStrictEqual(topPlayers);
});

test("TESTING: Roster NBA", async () => {  
    let roster =    [
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3416.png&h=80&w=110&scale=crop',
          name: 'Nicolas Batum',
          number: '33',
          position: 'PF',
          age: '33',
          height: `6' 8"`,
          weight: '230 lbs',
          college: '--',
          salary: '$3,170,029'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/4432162.png&h=80&w=110&scale=crop',
          name: 'Brandon Boston Jr.',
          number: '4',
          position: 'SG',
          age: '20',
          height: `6' 6"`,
          weight: '188 lbs',
          college: 'Kentucky',
          salary: '$925,258'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/4066387.png&h=80&w=110&scale=crop',
          name: 'Amir Coffey',
          number: '7',
          position: 'SG',
          age: '24',
          height: `6' 7"`,
          weight: '210 lbs',
          college: 'Minnesota',
          salary: '$153,488'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/2490620.png&h=80&w=110&scale=crop',
          name: 'Robert Covington',
          number: '23',
          position: 'PF',
          age: '31',
          height: `6' 7"`,
          weight: '209 lbs',
          college: 'Tennessee State',
          salary: '$12,975,471'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/4251.png&h=80&w=110&scale=crop',
          name: 'Paul George',
          number: '13',
          position: 'SG',
          age: '32',
          height: `6' 8"`,
          weight: '220 lbs',
          college: 'Fresno State',
          salary: '$39,344,900'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/4222252.png&h=80&w=110&scale=crop',
          name: 'Isaiah Hartenstein',
          number: '55',
          position: 'C',
          age: '24',
          height: `7' 0"`,
          weight: '250 lbs',
          college: '--',
          salary: '$1,669,178'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/2581177.png&h=80&w=110&scale=crop',
          name: 'Rodney Hood',
          number: '22',
          position: 'SG',
          age: '29',
          height: `6' 8"`,
          weight: '208 lbs',
          college: 'Duke',
          salary: '$1,669,178'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/6443.png&h=80&w=110&scale=crop',
          name: 'Reggie Jackson',
          number: '1',
          position: 'PG',
          age: '32',
          height: `6' 2"`,
          weight: '208 lbs',
          college: 'Boston College',
          salary: '$10,384,500'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3913174.png&h=80&w=110&scale=crop',
          name: 'Luke Kennard',
          number: '5',
          position: 'SG',
          age: '25',
          height: `6' 5"`,
          weight: '206 lbs',
          college: 'Duke',
          salary: '$13,347,727'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/6450.png&h=80&w=110&scale=crop',
          name: 'Kawhi Leonard',
          number: '2',
          position: 'SF',
          age: '30',
          height: `6' 7"`,
          weight: '225 lbs',
          college: 'San Diego State',
          salary: '$39,344,900'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3907823.png&h=80&w=110&scale=crop',
          name: 'Terance Mann',
          number: '14',
          position: 'SG',
          age: '25',
          height: `6' 5"`,
          weight: '215 lbs',
          college: 'Florida State',
          salary: '$1,782,621'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3914075.png&h=80&w=110&scale=crop',
          name: 'Xavier Moon',
          number: '15',
          position: 'PG',
          age: '27',
          height: `6' 2"`,
          weight: '165 lbs',
          college: 'Morehead State',
          salary: '--'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/6462.png&h=80&w=110&scale=crop',
          name: 'Marcus Morris Sr.',
          number: '8',
          position: 'SF',
          age: '32',
          height: `6' 8"`,
          weight: '218 lbs',
          college: 'Kansas',
          salary: '$15,627,907'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/2595516.png&h=80&w=110&scale=crop',
          name: 'Norman Powell',
          number: '24',
          position: 'SF',
          age: '29',
          height: `6' 3"`,
          weight: '215 lbs',
          college: 'UCLA',
          salary: '$15,517,241'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/4397916.png&h=80&w=110&scale=crop',
          name: 'Jason Preston',
          number: '17',
          position: 'PG',
          age: '22',
          height: `6' 3"`,
          weight: '181 lbs',
          college: 'Ohio',
          salary: '$1,062,303'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/4683023.png&h=80&w=110&scale=crop',
          name: 'Jay Scrubb',
          number: '0',
          position: 'SG',
          age: '21',
          height: `6' 5"`,
          weight: '220 lbs',
          college: 'John A. Logan College',
          salary: '--'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/4017837.png&h=80&w=110&scale=crop',
          name: 'Ivica Zubac',
          number: '40',
          position: 'C',
          age: '25',
          height: `7' 0"`,
          weight: '240 lbs',
          college: '--',
          salary: '$7,518,518'
        }
      ];
    axios.get.mockResolvedValue({ data: fs.readFileSync("./models/tests/html_tests/teamRosterNBAExample.html") });
  
    let scrapedRoster = await teamExapansionScrape.getRoster("nba", "lac");
  
    expect(scrapedRoster).toStrictEqual(roster);

});

test("TESTING: Roster NFL", async () => {  
    let roster =    [        
        {      
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/12471.png&h=80&w=110&scale=crop',
          name: 'Chase Daniel',
          number: '4',
          position: 'QB',
          age: '35',
          height: `6' 0"`,
          weight: '218 lbs',
          experience: '13',
          college: 'Missouri'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/4038941.png&h=80&w=110&scale=crop',
          name: 'Justin Herbert',
          number: '10',
          position: 'QB',
          age: '24',
          height: `6' 6"`,
          weight: '237 lbs',
          experience: '2',
          college: 'Oregon'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nophoto.png&w=110&h=80&scale=crop',
          name: 'Brandon Peters',
          number: 'n/a',
          position: 'QB',
          age: '24',
          height: `6' 5"`,
          weight: '230 lbs',
          experience: 'R',
          college: 'Illinois'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/3120590.png&h=80&w=110&scale=crop',
          name: 'Easton Stick',
          number: '2',
          position: 'QB',
          age: '26',
          height: `6' 1"`,
          weight: '224 lbs',
          experience: '3',
          college: 'North Dakota State'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nophoto.png&w=110&h=80&scale=crop',
          name: 'Leddie Brown',
          number: 'n/a',
          position: 'RB',
          age: '--',
          height: `5' 11"`,
          weight: '216 lbs',
          experience: 'R',
          college: 'West Virginia'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/3068267.png&h=80&w=110&scale=crop',
          name: 'Austin Ekeler',
          number: '30',
          position: 'RB',
          age: '27',
          height: `5' 10"`,
          weight: '200 lbs',
          experience: '5',
          college: 'Western State'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/3910544.png&h=80&w=110&scale=crop',
          name: 'Joshua Kelley',
          number: '27',
          position: 'RB',
          age: '24',
          height: `5' 11"`,
          weight: '212 lbs',
          experience: '2',
          college: 'UCLA'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nophoto.png&w=110&h=80&scale=crop',
          name: 'Kevin Marks Jr.',
          number: 'n/a',
          position: 'RB',
          age: '--',
          height: `6' 0"`,
          weight: '203 lbs',
          experience: 'R',
          college: 'Buffalo'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/4241205.png&h=80&w=110&scale=crop',
          name: 'Larry Rountree III',
          number: '35',
          position: 'RB',
          age: '23',
          height: `5' 10"`,
          weight: '211 lbs',
          experience: 'R',
          college: 'Missouri'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nophoto.png&w=110&h=80&scale=crop',
          name: 'Isaiah Spiller',
          number: 'n/a',
          position: 'RB',
          age: '--',
          height: `6' 1"`,
          weight: '215 lbs',
          experience: 'R',
          college: 'Texas A&M'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nophoto.png&w=110&h=80&scale=crop',
          name: 'Zander Horvath',
          number: 'n/a',
          position: 'FB',
          age: '23',
          height: `6' 3"`,
          weight: '230 lbs',
          experience: 'R',
          college: 'Purdue'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/4035611.png&h=80&w=110&scale=crop',
          name: 'Gabe Nabers',
          number: '40',
          position: 'FB',
          age: '24',
          height: `6' 3"`,
          weight: '235 lbs',
          experience: '2',
          college: 'Florida State'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/15818.png&h=80&w=110&scale=crop',
          name: 'Keenan Allen',
          number: '13',
          position: 'WR',
          age: '30',
          height: `6' 2"`,
          weight: '211 lbs',
          experience: '9',
          college: 'California'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nophoto.png&w=110&h=80&scale=crop',
          name: 'Michael Bandy',
          number: '83',
          position: 'WR',
          age: '24',
          height: `5' 10"`,
          weight: '190 lbs',
          experience: '1',
          college: 'San Diego'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nophoto.png&w=110&h=80&scale=crop',
          name: 'Trevon Bradford',
          number: 'n/a',
          position: 'WR',
          age: '--',
          height: `6' 0"`,
          weight: '184 lbs',
          experience: 'R',
          college: 'Oregon State'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/2580216.png&h=80&w=110&scale=crop',
          name: 'DeAndre Carter',
          number: '1',
          position: 'WR',
          age: '29',
          height: `5' 8"`,
          weight: '188 lbs',
          experience: '4',
          college: 'Sacramento State'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/4036055.png&h=80&w=110&scale=crop',
          name: 'Maurice Ffrench',
          number: '80',
          position: 'WR',
          age: '24',
          height: `5' 11"`,
          weight: '200 lbs',
          experience: '1',
          college: 'Pittsburgh'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/3932430.png&h=80&w=110&scale=crop',
          name: 'Jalen Guyton',
          number: '15',
          position: 'WR',
          age: '24',
          height: `6' 1"`,
          weight: '212 lbs',
          experience: '2',
          college: 'North Texas'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/4069806.png&h=80&w=110&scale=crop',
          name: 'Jason Moore',
          number: '11',
          position: 'WR',
          age: '26',
          height: `6' 3"`,
          weight: '215 lbs',
          experience: '3',
          college: 'Findlay'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/4242433.png&h=80&w=110&scale=crop',
          name: 'Joshua Palmer',
          number: '5',
          position: 'WR',
          age: '22',
          height: `6' 1"`,
          weight: '210 lbs',
          experience: 'R',
          college: 'Tennessee'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/4037591.png&h=80&w=110&scale=crop',
          name: 'Joe Reed',
          number: '12',
          position: 'WR',
          age: '24',
          height: `6' 0"`,
          weight: '224 lbs',
          experience: '2',
          college: 'Virginia'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/3045138.png&h=80&w=110&scale=crop',
          name: 'Mike Williams',
          number: '81',
          position: 'WR',
          age: '27',
          height: `6' 4"`,
          weight: '218 lbs',
          experience: '5',
          college: 'Clemson'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/3918639.png&h=80&w=110&scale=crop',
          name: 'Gerald Everett',
          number: '0',
          position: 'TE',
          age: '27',
          height: `6' 3"`,
          weight: '240 lbs',
          experience: '5',
          college: 'South Alabama'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/4038952.png&h=80&w=110&scale=crop',
          name: 'Hunter Kampmoyer',
          number: '47',
          position: 'TE',
          age: '24',
          height: `6' 4"`,
          weight: '243 lbs',
          experience: 'R',
          college: 'Oregon'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nophoto.png&w=110&h=80&scale=crop',
          name: 'Erik Krommenhoek',
          number: 'n/a',
          position: 'TE',
          age: '--',
          height: `6' 6"`,
          weight: '250 lbs',
          experience: 'R',
          college: 'USC'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/4240023.png&h=80&w=110&scale=crop',
          name: "Tre' McKitty",
          number: '88',
          position: 'TE',
          age: '23',
          height: `6' 4"`,
          weight: '246 lbs',
          experience: 'R',
          college: 'Georgia'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/3912092.png&h=80&w=110&scale=crop',
          name: 'Donald Parham Jr.',
          number: '89',
          position: 'TE',
          age: '24',
          height: `6' 8"`,
          weight: '237 lbs',
          experience: '2',
          college: 'Stetson'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nophoto.png&w=110&h=80&scale=crop',
          name: 'Stone Smartt',
          number: 'n/a',
          position: 'TE',
          age: '--',
          height: `6' 4"`,
          weight: '232 lbs',
          experience: 'R',
          college: 'Old Dominion'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/3115387.png&h=80&w=110&scale=crop',
          name: 'Will Clapp',
          number: 'n/a',
          position: 'C',
          age: '25',
          height: `6' 5"`,
          weight: '311 lbs',
          experience: '5',
          college: 'LSU'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/16864.png&h=80&w=110&scale=crop',
          name: 'Corey Linsley',
          number: '63',
          position: 'C',
          age: '30',
          height: `6' 3"`,
          weight: '301 lbs',
          experience: '8',
          college: 'Ohio State'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/3924352.png&h=80&w=110&scale=crop',
          name: 'Zack Bailey',
          number: 'n/a',
          position: 'G',
          age: '26',
          height: `6' 5"`,
          weight: '299 lbs',
          experience: '2',
          college: 'South Carolina'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/17404.png&h=80&w=110&scale=crop',
          name: 'Matt Feiler',
          number: '71',
          position: 'G',
          age: '29',
          height: `6' 6"`,
          weight: '330 lbs',
          experience: '5',
          college: 'Bloomsburg'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/3045779.png&h=80&w=110&scale=crop',
          name: 'Ryan Hunter',
          number: '67',
          position: 'G',
          age: '27',
          height: `6' 3"`,
          weight: '316 lbs',
          experience: '1',
          college: 'Bowling Green'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/4240800.png&h=80&w=110&scale=crop',
          name: 'Brenden Jaimes',
          number: '64',
          position: 'G',
          age: '22',
          height: `6' 5"`,
          weight: '298 lbs',
          experience: 'R',
          college: 'Nebraska'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nophoto.png&w=110&h=80&scale=crop',
          name: 'Zion Johnson',
          number: 'n/a',
          position: 'G',
          age: '22',
          height: `6' 3"`,
          weight: '316 lbs',
          experience: 'R',
          college: 'Boston College'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nophoto.png&w=110&h=80&scale=crop',
          name: 'Jamaree Salyer',
          number: 'n/a',
          position: 'G',
          age: '--',
          height: `6' 4"`,
          weight: '325 lbs',
          experience: 'R',
          college: 'Georgia'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/2973014.png&h=80&w=110&scale=crop',
          name: 'Storm Norton',
          number: '74',
          position: 'OT',
          age: '28',
          height: `6' 7"`,
          weight: '317 lbs',
          experience: '2',
          college: 'Toledo'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/4411189.png&h=80&w=110&scale=crop',
          name: 'Trey Pipkins III',
          number: '79',
          position: 'OT',
          age: '25',
          height: `6' 6"`,
          weight: '307 lbs',
          experience: '3',
          college: 'Sioux Falls'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/4242555.png&h=80&w=110&scale=crop',
          name: 'Foster Sarell',
          number: 'n/a',
          position: 'OT',
          age: '23',
          height: `6' 7"`,
          weight: '315 lbs',
          experience: 'R',
          college: 'Stanford'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/4242283.png&h=80&w=110&scale=crop',
          name: 'Rashawn Slater',
          number: '70',
          position: 'OT',
          age: '23',
          height: `6' 4"`,
          weight: '315 lbs',
          experience: 'R',
          college: 'Northwestern'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nophoto.png&w=110&h=80&scale=crop',
          name: 'Andrew Trainer',
          number: 'n/a',
          position: 'OT',
          age: '--',
          height: `6' 7"`,
          weight: '320 lbs',
          experience: 'R',
          college: 'William & Mary'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/4046907.png&h=80&w=110&scale=crop',
          name: 'Jamal Davis II',
          number: 'n/a',
          position: 'DE',
          age: '26',
          height: `6' 4"`,
          weight: '240 lbs',
          experience: '1',
          college: 'Akron'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/3059620.png&h=80&w=110&scale=crop',
          name: 'Morgan Fox',
          number: 'n/a',
          position: 'DE',
          age: '27',
          height: `6' 3"`,
          weight: '260 lbs',
          experience: '5',
          college: 'Colorado State-Pueblo'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/3915990.png&h=80&w=110&scale=crop',
          name: 'Joe Gaziano',
          number: '92',
          position: 'DE',
          age: '25',
          height: `6' 4"`,
          weight: '280 lbs',
          experience: '1',
          college: 'Northwestern'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nophoto.png&w=110&h=80&scale=crop',
          name: 'Ty Shelby',
          number: 'n/a',
          position: 'DE',
          age: '--',
          height: `6' 4"`,
          weight: '259 lbs',
          experience: 'R',
          college: 'Louisiana-Monroe'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/3116761.png&h=80&w=110&scale=crop',
          name: 'Andrew Brown',
          number: '90',
          position: 'DT',
          age: '26',
          height: `6' 3"`,
          weight: '296 lbs',
          experience: '3',
          college: 'Virginia'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/2580666.png&h=80&w=110&scale=crop',
          name: 'Christian Covington',
          number: '95',
          position: 'DT',
          age: '28',
          height: `6' 2"`,
          weight: '289 lbs',
          experience: '7',
          college: 'Rice'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/3674831.png&h=80&w=110&scale=crop',
          name: 'Breiden Fehoko',
          number: '96',
          position: 'DT',
          age: '25',
          height: `6' 3"`,
          weight: '300 lbs',
          experience: '1',
          college: 'LSU'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/2979591.png&h=80&w=110&scale=crop',
          name: 'Austin Johnson',
          number: 'n/a',
          position: 'DT',
          age: '28',
          height: `6' 4"`,
          weight: '314 lbs',
          experience: '6',
          college: 'Penn State'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/3047495.png&h=80&w=110&scale=crop',
          name: 'Sebastian Joseph-Day',
          number: '69',
          position: 'DT',
          age: '27',
          height: `6' 4"`,
          weight: '310 lbs',
          experience: '4',
          college: 'Rutgers'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/4373582.png&h=80&w=110&scale=crop',
          name: 'Forrest Merrill',
          number: '91',
          position: 'DT',
          age: '25',
          height: `6' 0"`,
          weight: '322 lbs',
          experience: 'R',
          college: 'Arkansas State'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nophoto.png&w=110&h=80&scale=crop',
          name: 'Otito Ogbonnia',
          number: 'n/a',
          position: 'DT',
          age: '--',
          height: `6' 4"`,
          weight: '320 lbs',
          experience: 'R',
          college: 'UCLA'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/3863182.png&h=80&w=110&scale=crop',
          name: 'Jerry Tillery',
          number: '99',
          position: 'DT',
          age: '25',
          height: `6' 6"`,
          weight: '295 lbs',
          experience: '3',
          college: 'Notre Dame'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/3051389.png&h=80&w=110&scale=crop',
          name: 'Joey Bosa',
          number: '97',
          position: 'LB',
          age: '26',
          height: `6' 5"`,
          weight: '280 lbs',
          experience: '6',
          college: 'Ohio State'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/4036959.png&h=80&w=110&scale=crop',
          name: 'Cole Christiansen',
          number: '50',
          position: 'LB',
          age: '24',
          height: `6' 1"`,
          weight: '230 lbs',
          experience: '1',
          college: 'Army'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/3914613.png&h=80&w=110&scale=crop',
          name: 'Emeke Egbule',
          number: '51',
          position: 'LB',
          age: '25',
          height: `6' 2"`,
          weight: '245 lbs',
          experience: '3',
          college: 'Houston'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nophoto.png&w=110&h=80&scale=crop',
          name: 'Damon Lloyd',
          number: '53',
          position: 'LB',
          age: '24',
          height: `6' 0"`,
          weight: '235 lbs',
          experience: '1',
          college: 'Indiana (PA)'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/16710.png&h=80&w=110&scale=crop',
          name: 'Khalil Mack',
          number: '52',
          position: 'LB',
          age: '31',
          height: `6' 3"`,
          weight: '267 lbs',
          experience: '8',
          college: 'Buffalo'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nophoto.png&w=110&h=80&scale=crop',
          name: 'Tyreek Maddox-Williams',
          number: 'n/a',
          position: 'LB',
          age: '--',
          height: `6' 2"`,
          weight: '235 lbs',
          experience: 'R',
          college: 'Rutgers'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/4241394.png&h=80&w=110&scale=crop',
          name: 'Kenneth Murray Jr.',
          number: '9',
          position: 'LB',
          age: '23',
          height: `6' 2"`,
          weight: '241 lbs',
          experience: '2',
          college: 'Oklahoma'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/4036141.png&h=80&w=110&scale=crop',
          name: 'Nick Niemann',
          number: '31',
          position: 'LB',
          age: '24',
          height: `6' 3"`,
          weight: '244 lbs',
          experience: 'R',
          college: 'Iowa'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/4038432.png&h=80&w=110&scale=crop',
          name: 'Amen Ogbongbemiga',
          number: '57',
          position: 'LB',
          age: '23',
          height: `6' 0"`,
          weight: '231 lbs',
          experience: 'R',
          college: 'Oklahoma State'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/3116177.png&h=80&w=110&scale=crop',
          name: 'Troy Reeder',
          number: '42',
          position: 'LB',
          age: '27',
          height: `6' 3"`,
          weight: '245 lbs',
          experience: '4',
          college: 'Delaware'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/4240475.png&h=80&w=110&scale=crop',
          name: 'Chris Rumph II',
          number: '94',
          position: 'LB',
          age: '23',
          height: `6' 2"`,
          weight: '244 lbs',
          experience: 'R',
          college: 'Duke'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/3129310.png&h=80&w=110&scale=crop',
          name: 'Drue Tranquill',
          number: '49',
          position: 'LB',
          age: '26',
          height: `6' 2"`,
          weight: '234 lbs',
          experience: '3',
          college: 'Notre Dame'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/16772.png&h=80&w=110&scale=crop',
          name: 'Kyle Van Noy',
          number: 'n/a',
          position: 'LB',
          age: '31',
          height: `6' 3"`,
          weight: '250 lbs',
          experience: '8',
          college: 'BYU'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/2515641.png&h=80&w=110&scale=crop',
          name: 'Bryce Callahan',
          number: 'n/a',
          position: 'CB',
          age: '30',
          height: `5' 9"`,
          weight: '188 lbs',
          experience: '7',
          college: 'Rice'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/4410136.png&h=80&w=110&scale=crop',
          name: 'Tevaughn Campbell',
          number: '20',
          position: 'CB',
          age: '28',
          height: `6' 0"`,
          weight: '200 lbs',
          experience: '2',
          college: 'Regina (Canada)'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/3053795.png&h=80&w=110&scale=crop',
          name: 'Michael Davis',
          number: '43',
          position: 'CB',
          age: '27',
          height: `6' 2"`,
          weight: '196 lbs',
          experience: '5',
          college: 'BYU'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/4045699.png&h=80&w=110&scale=crop',
          name: 'Ben DeLuca',
          number: '46',
          position: 'CB',
          age: '24',
          height: `6' 1"`,
          weight: '202 lbs',
          experience: 'R',
          college: 'Charlotte'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/4243831.png&h=80&w=110&scale=crop',
          name: 'Kemon Hall',
          number: '37',
          position: 'CB',
          age: '24',
          height: `5' 11"`,
          weight: '190 lbs',
          experience: '1',
          college: 'North Texas'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/3121649.png&h=80&w=110&scale=crop',
          name: 'J.C. Jackson',
          number: '27',
          position: 'CB',
          age: '26',
          height: `6' 1"`,
          weight: '198 lbs',
          experience: '4',
          college: 'Maryland'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nophoto.png&w=110&h=80&scale=crop',
          name: 'Deane Leonard',
          number: 'n/a',
          position: 'CB',
          age: '22',
          height: `6' 0"`,
          weight: '195 lbs',
          experience: 'R',
          college: 'Ole Miss'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/4363034.png&h=80&w=110&scale=crop',
          name: 'Asante Samuel Jr.',
          number: '26',
          position: 'CB',
          age: '22',
          height: `5' 10"`,
          weight: '180 lbs',
          experience: 'R',
          college: 'Florida State'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nophoto.png&w=110&h=80&scale=crop',
          name: 'Brandon Sebastian',
          number: 'n/a',
          position: 'CB',
          age: '--',
          height: `6' 0"`,
          weight: '179 lbs',
          experience: 'R',
          college: 'Boston College'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nophoto.png&w=110&h=80&scale=crop',
          name: "Ja'Sir Taylor",
          number: 'n/a',
          position: 'CB',
          age: '--',
          height: `5' 10"`,
          weight: '185 lbs',
          experience: 'R',
          college: 'Wake Forest'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nophoto.png&w=110&h=80&scale=crop',
          name: 'Isaac Weaver',
          number: 'n/a',
          position: 'CB',
          age: '--',
          height: `6' 6"`,
          weight: '303 lbs',
          experience: 'R',
          college: 'Old Dominion'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/3912028.png&h=80&w=110&scale=crop',
          name: 'Nasir Adderley',
          number: '24',
          position: 'S',
          age: '24',
          height: `6' 0"`,
          weight: '206 lbs',
          experience: '3',
          college: 'Delaware'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/4039413.png&h=80&w=110&scale=crop',
          name: 'Alohi Gilman',
          number: '32',
          position: 'S',
          age: '24',
          height: `5' 10"`,
          weight: '201 lbs',
          experience: '2',
          college: 'Notre Dame'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/3691739.png&h=80&w=110&scale=crop',
          name: 'Derwin James Jr.',
          number: '33',
          position: 'S',
          age: '25',
          height: `6' 2"`,
          weight: '215 lbs',
          experience: '4',
          college: 'Florida State'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nophoto.png&w=110&h=80&scale=crop',
          name: 'Raheem Layne II',
          number: 'n/a',
          position: 'S',
          age: '--',
          height: `6' 1"`,
          weight: '200 lbs',
          experience: 'R',
          college: 'Indiana'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/3116602.png&h=80&w=110&scale=crop',
          name: 'Trey Marshall',
          number: '36',
          position: 'S',
          age: '26',
          height: `6' 0"`,
          weight: '207 lbs',
          experience: '3',
          college: 'Florida State'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nophoto.png&w=110&h=80&scale=crop',
          name: 'Skyler Thomas',
          number: 'n/a',
          position: 'S',
          age: '--',
          height: `5' 10"`,
          weight: '185 lbs',
          experience: 'R',
          college: 'Liberty'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/4259570.png&h=80&w=110&scale=crop',
          name: 'Mark Webb Jr.',
          number: '29',
          position: 'S',
          age: '23',
          height: `6' 1"`,
          weight: '207 lbs',
          experience: 'R',
          college: 'Georgia'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nophoto.png&w=110&h=80&scale=crop',
          name: 'JT Woods',
          number: 'n/a',
          position: 'S',
          age: '21',
          height: `6' 2"`,
          weight: '193 lbs',
          experience: 'R',
          college: 'Baylor'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/15965.png&h=80&w=110&scale=crop',
          name: 'Dustin Hopkins',
          number: '6',
          position: 'PK',
          age: '31',
          height: `6' 2"`,
          weight: '193 lbs',
          experience: '8',
          college: 'Florida State'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nophoto.png&w=110&h=80&scale=crop',
          name: 'James McCourt',
          number: 'n/a',
          position: 'PK',
          age: '--',
          height: `6' 1"`,
          weight: '215 lbs',
          experience: 'R',
          college: 'Illinois'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/2582324.png&h=80&w=110&scale=crop',
          name: 'Ty Long',
          number: '1',
          position: 'P',
          age: '29',
          height: `6' 2"`,
          weight: '205 lbs',
          experience: '3',
          college: 'UAB'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/3126368.png&h=80&w=110&scale=crop',
          name: 'JK Scott',
          number: 'n/a',
          position: 'P',
          age: '26',
          height: `6' 5"`,
          weight: '208 lbs',
          experience: '4',
          college: 'Alabama'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/15151.png&h=80&w=110&scale=crop',
          name: 'Josh Harris',
          number: 'n/a',
          position: 'LS',
          age: '33',
          height: `6' 1"`,
          weight: '224 lbs',
          experience: '10',
          college: 'Auburn'
        }
      ];
    axios.get.mockResolvedValue({ data: fs.readFileSync("./models/tests/html_tests/teamRosterNFLExample.html") });
  
    let scrapedRoster = await teamExapansionScrape.getRoster("nfl", "lac");
    expect(scrapedRoster).toStrictEqual(roster);

});

test("TESTING: Roster MLB", async () => {  
    let roster =    [
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/32811.png&h=80&w=110&scale=crop',
          name: 'Jose Berrios',
          number: '17',
          position: 'SP',
          age: 'R',
          height: 'R',
          weight: '28',
          college: `6' 0"`,
          salary: '205 lbs'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/35780.png&h=80&w=110&scale=crop',
          name: 'Adam Cimber',
          number: '90',
          position: 'RP',
          age: 'R',
          height: 'R',
          weight: '31',
          college: `6' 3"`,
          salary: '195 lbs'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/32888.png&h=80&w=110&scale=crop',
          name: 'Yimi Garcia',
          number: '93',
          position: 'RP',
          age: 'R',
          height: 'R',
          weight: '31',
          college: `6' 2"`,
          salary: '228 lbs'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/32667.png&h=80&w=110&scale=crop',
          name: 'Kevin Gausman',
          number: '34',
          position: 'SP',
          age: 'L',
          height: 'R',
          weight: '31',
          college: `6' 3"`,
          salary: '190 lbs'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/41415.png&h=80&w=110&scale=crop',
          name: 'Yusei Kikuchi',
          number: '16',
          position: 'SP',
          age: 'L',
          height: 'L',
          weight: '30',
          college: `6' 0"`,
          salary: '200 lbs'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/42436.png&h=80&w=110&scale=crop',
          name: 'Alek Manoah',
          number: '6',
          position: 'SP',
          age: 'R',
          height: 'R',
          weight: '24',
          college: `6' 6"`,
          salary: '260 lbs'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/31124.png&h=80&w=110&scale=crop',
          name: 'David Phelps',
          number: '35',
          position: 'RP',
          age: 'R',
          height: 'R',
          weight: '35',
          college: `6' 3"`,
          salary: '200 lbs'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/39912.png&h=80&w=110&scale=crop',
          name: 'Trevor Richards',
          number: '33',
          position: 'RP',
          age: 'R',
          height: 'R',
          weight: '29',
          college: `6' 2"`,
          salary: '195 lbs'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/36380.png&h=80&w=110&scale=crop',
          name: 'Jordan Romano',
          number: '68',
          position: 'SP',
          age: 'R',
          height: 'R',
          weight: '29',
          college: `6' 4"`,
          salary: '200 lbs'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/32789.png&h=80&w=110&scale=crop',
          name: 'Ross Stripling',
          number: '48',
          position: 'SP',
          age: 'R',
          height: 'R',
          weight: '32',
          college: `6' 2"`,
          salary: '220 lbs'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/35004.png&h=80&w=110&scale=crop',
          name: 'Danny Jansen',
          number: '9',
          position: 'C',
          age: 'R',
          height: 'R',
          weight: '27',
          college: `6' 2"`,
          salary: '230 lbs'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/42081.png&h=80&w=110&scale=crop',
          name: 'Alejandro Kirk',
          number: '30',
          position: 'C',
          age: 'R',
          height: 'R',
          weight: '23',
          college: `5' 9"`,
          salary: '220 lbs'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/38904.png&h=80&w=110&scale=crop',
          name: 'Bo Bichette',
          number: '11',
          position: 'SS',
          age: 'R',
          height: 'R',
          weight: '24',
          college: `6' 0"`,
          salary: '185 lbs'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/37639.png&h=80&w=110&scale=crop',
          name: 'Cavan Biggio',
          number: '8',
          position: '3B',
          age: 'L',
          height: 'R',
          weight: '27',
          college: `6' 2"`,
          salary: '200 lbs'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/33857.png&h=80&w=110&scale=crop',
          name: 'Matt Chapman',
          number: '26',
          position: '3B',
          age: 'R',
          height: 'R',
          weight: '29',
          college: `6' 0"`,
          salary: '215 lbs'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/39924.png&h=80&w=110&scale=crop',
          name: 'Santiago Espinal',
          number: '5',
          position: '2B',
          age: 'R',
          height: 'R',
          weight: '27',
          college: `5' 10"`,
          salary: '175 lbs'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/35002.png&h=80&w=110&scale=crop',
          name: 'Vladimir Guerrero Jr.',
          number: '27',
          position: '1B',
          age: 'R',
          height: 'R',
          weight: '23',
          college: `6' 2"`,
          salary: '250 lbs'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/36040.png&h=80&w=110&scale=crop',
          name: 'Lourdes Gurriel Jr.',
          number: '13',
          position: 'LF',
          age: 'R',
          height: 'R',
          weight: '28',
          college: `6' 3"`,
          salary: '215 lbs'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/33377.png&h=80&w=110&scale=crop',
          name: 'Teoscar Hernandez',
          number: '37',
          position: 'RF',
          age: 'R',
          height: 'R',
          weight: '29',
          college: `6' 2"`,
          salary: '205 lbs'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/32078.png&h=80&w=110&scale=crop',
          name: 'George Springer',
          number: '4',
          position: 'CF',
          age: 'R',
          height: 'R',
          weight: '32',
          college: `6' 3"`,
          salary: '215 lbs'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/33264.png&h=80&w=110&scale=crop',
          name: 'Raimel Tapia',
          number: '15',
          position: 'LF',
          age: 'L',
          height: 'L',
          weight: '28',
          college: `6' 3"`,
          salary: '175 lbs'
        },
        {
          image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/33713.png&h=80&w=110&scale=crop',
          name: 'Bradley Zimmer',
          number: '7',
          position: 'CF',
          age: 'L',
          height: 'R',
          weight: '29',
          college: `6' 5"`,
          salary: '220 lbs'
        }
      ];
    axios.get.mockResolvedValue({ data: fs.readFileSync("./models/tests/html_tests/teamRosterMLBExample.html") });
  
    let scrapedRoster = await teamExapansionScrape.getRoster("nba", "lac");
  
    expect(scrapedRoster).toStrictEqual(roster);

});

test("TESTING: Roster NHL", async () => {  
    let roster =    [
      {
        image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nhl/players/full/4233872.png&h=80&w=110&scale=crop',
        name: 'Jesper Boqvist',
        number: '70',
        age: '23',
        height: `6' 0"`,
        weight: '180 lbs',
        shot: 'L',
        birthplace: 'Falun, Sweden',
        birthdate: '10/30/98'
      },
      {
        image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nhl/players/full/3150085.png&h=80&w=110&scale=crop',
        name: 'Chase De Leo',
        number: '47',
        age: '26',
        height: `5' 9"`,
        weight: '180 lbs',
        shot: 'L',
        birthplace: 'La Mirada, CA',
        birthdate: '10/25/95'
      },
      {
        image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nhl/players/full/4233555.png&h=80&w=110&scale=crop',
        name: 'Nico Hischier',
        number: '13',
        age: '23',
        height: `6' 1"`,
        weight: '175 lbs',
        shot: 'L',
        birthplace: 'Naters, Switzerland',
        birthdate: '01/04/99'
      },
      {
        image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nhl/players/full/4565222.png&h=80&w=110&scale=crop',
        name: 'Jack Hughes',
        number: '86',
        age: '21',
        height: `5' 11"`,
        weight: '170 lbs',
        shot: 'L',
        birthplace: 'Orlando, FL',
        birthdate: '05/14/01'
      },
      {
        image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nhl/players/full/4063228.png&h=80&w=110&scale=crop',
        name: 'Janne Kuokkanen',
        number: '59',
        age: '24',
        height: `6' 1"`,
        weight: '193 lbs',
        shot: 'L',
        birthplace: 'Oulunsalo, Finland',
        birthdate: '05/25/98'
      },
      {
        image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nhl/players/full/4024902.png&h=80&w=110&scale=crop',
        name: 'Michael McLeod',
        number: '20',
        age: '24',
        height: `6' 2"`,
        weight: '188 lbs',
        shot: 'R',
        birthplace: 'Mississauga, ON',
        birthdate: '02/03/98'
      },
      {
        image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nhl/players/full/4697401.png&h=80&w=110&scale=crop',
        name: 'Dawson Mercer',
        number: '18',
        age: '20',
        height: `6' 0"`,
        weight: '180 lbs',
        shot: 'R',
        birthplace: 'Carbonear, NF',
        birthdate: '10/27/01'
      },
      {
        image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nhl/players/full/4587843.png&h=80&w=110&scale=crop',
        name: 'Yegor Sharangovich',
        number: '17',
        age: '23',
        height: `6' 2"`,
        weight: '196 lbs',
        shot: 'L',
        birthplace: 'Minsk, Belarus',
        birthdate: '06/06/98'
      },
      {
        image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nhl/players/full/3899949.png&h=80&w=110&scale=crop',
        name: 'Pavel Zacha',
        number: '37',
        age: '25',
        height: `6' 3"`,
        weight: '210 lbs',
        shot: 'L',
        birthplace: 'Brno, Czech Republic',
        birthdate: '04/06/97'
      },
      {
        image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nhl/players/full/4268771.png&h=80&w=110&scale=crop',
        name: 'Jesper Bratt',
        number: '63',
        age: '23',
        height: `5' 10"`,
        weight: '175 lbs',
        shot: 'L',
        birthplace: 'Stockholm, Sweden',
        birthdate: '07/30/98'
      },
      {
        image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nhl/players/full/3648015.png&h=80&w=110&scale=crop',
        name: 'A.J. Greer',
        number: '42',
        age: '25',
        height: `6' 3"`,
        weight: '210 lbs',
        shot: 'L',
        birthplace: 'Joliette, QC',
        birthdate: '12/14/96'
      },
      {
        image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nhl/players/full/3042262.png&h=80&w=110&scale=crop',
        name: 'Andreas Johnsson',
        number: '11',
        age: '27',
        height: `5' 10"`,
        weight: '194 lbs',
        shot: 'L',
        birthplace: 'Gavle, Sweden',
        birthdate: '11/21/94'
      },
      {
        image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nhl/players/full/5227.png&h=80&w=110&scale=crop',
        name: 'Tomas Tatar',
        number: '90',
        age: '31',
        height: `5' 10"`,
        weight: '173 lbs',
        shot: 'L',
        birthplace: 'Ilava, Czechoslovakia',
        birthdate: '12/01/90'
      },
      {
        image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nhl/players/full/3069397.png&h=80&w=110&scale=crop',
        name: 'Jimmy Vesey',
        number: '16',
        age: '29',
        height: `6' 3"`,
        weight: '202 lbs',
        shot: 'L',
        birthplace: 'Boston, MA',
        birthdate: '05/26/93'
      },
      {
        image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nhl/players/full/3042110.png&h=80&w=110&scale=crop',
        name: 'Miles Wood',
        number: '44',
        age: '26',
        height: `6' 2"`,
        weight: '195 lbs',
        shot: 'L',
        birthplace: 'Buffalo, NY',
        birthdate: '09/13/95'
      },
      {
        image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nhl/players/full/4063279.png&h=80&w=110&scale=crop',
        name: 'Nathan Bastian',
        number: '14',
        age: '24',
        height: `6' 4"`,
        weight: '205 lbs',
        shot: 'R',
        birthplace: 'Kitchener, ON',
        birthdate: '12/06/97'
      },
      {
        image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nhl/players/full/4419743.png&h=80&w=110&scale=crop',
        name: 'Tyce Thompson',
        number: '12',
        age: '22',
        height: `6' 1"`,
        weight: '171 lbs',
        shot: '--',
        birthplace: 'Oyster Bay, NY',
        birthdate: '07/12/99'
      },
      {
        image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nophoto.png&w=110&h=80&scale=crop',
        name: 'Kevin Bahl',
        number: '88',
        age: '21',
        height: `6' 6"`,
        weight: '230 lbs',
        shot: 'L',
        birthplace: 'New Westminster, BC',
        birthdate: '06/27/00'
      },
      {
        image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nophoto.png&w=110&h=80&scale=crop',
        name: 'Mason Geertsen',
        number: '55',
        age: '27',
        height: `6' 3"`,
        weight: '199 lbs',
        shot: 'L',
        birthplace: 'Drayton Valley, AB',
        birthdate: '04/19/95'
      },
      {
        image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nhl/players/full/3042122.png&h=80&w=110&scale=crop',
        name: 'Ryan Graves',
        number: '33',
        age: '27',
        height: `6' 5"`,
        weight: '220 lbs',
        shot: 'L',
        birthplace: 'Yarmouth, NS',
        birthdate: '05/21/95'
      },
      {
        image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nhl/players/full/2562605.png&h=80&w=110&scale=crop',
        name: 'Dougie Hamilton',
        number: '7',
        age: '28',
        height: `6' 6"`,
        weight: '229 lbs',
        shot: 'R',
        birthplace: 'Toronto, ON',
        birthdate: '06/17/93'
      },
      {
        image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nhl/players/full/3068087.png&h=80&w=110&scale=crop',
        name: 'Damon Severson',
        number: '28',
        age: '27',
        height: `6' 2"`,
        weight: '205 lbs',
        shot: 'R',
        birthplace: 'Melville, SK',
        birthdate: '08/07/94'
      },
      {
        image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nhl/players/full/3904190.png&h=80&w=110&scale=crop',
        name: 'Jonas Siegenthaler',
        number: '71',
        age: '25',
        height: `6' 3"`,
        weight: '206 lbs',
        shot: 'L',
        birthplace: 'Zurich, Switzerland',
        birthdate: '05/06/97'
      },
      {
        image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nhl/players/full/4352757.png&h=80&w=110&scale=crop',
        name: 'Ty Smith',
        number: '24',
        age: '22',
        height: `5' 11"`,
        weight: '175 lbs',
        shot: 'L',
        birthplace: 'Lloydminster, SK',
        birthdate: '03/24/00'
      },
      {
        image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nhl/players/full/4044.png&h=80&w=110&scale=crop',
        name: 'P.K. Subban',
        number: '76',
        age: '33',
        height: `6' 0"`,
        weight: '210 lbs',
        shot: 'R',
        birthplace: 'Toronto, ON',
        birthdate: '05/13/89'
      },
      {
        image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nhl/players/full/3941125.png&h=80&w=110&scale=crop',
        name: 'Colton White',
        number: '2',
        age: '25',
        height: `6' 1"`,
        weight: '185 lbs',
        shot: 'L',
        birthplace: 'London, ON',
        birthdate: '05/03/97'
      },
      {
        image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nhl/players/full/3533.png&h=80&w=110&scale=crop',
        name: 'Jonathan Bernier',
        number: '45',
        age: '33',
        height: `6' 0"`,
        weight: '184 lbs',
        shot: 'L',
        birthplace: 'Laval, QC',
        birthdate: '08/07/88'
      },
      {
        image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nhl/players/full/3904177.png&h=80&w=110&scale=crop',
        name: 'Mackenzie Blackwood',
        number: '29',
        age: '25',
        height: `6' 4"`,
        weight: '225 lbs',
        shot: 'L',
        birthplace: 'Thunder Bay, ON',
        birthdate: '12/09/96'
      },
      {
        image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nhl/players/full/3068664.png&h=80&w=110&scale=crop',
        name: 'Jon Gillies',
        number: '32',
        age: '28',
        height: `6' 6"`,
        weight: '225 lbs',
        shot: 'L',
        birthplace: 'South Portland, ME',
        birthdate: '01/22/94'
      },
      {
        image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nhl/players/full/3067264.png&h=80&w=110&scale=crop',
        name: 'Andrew Hammond',
        number: '35',
        age: '34',
        height: `6' 2"`,
        weight: '215 lbs',
        shot: 'L',
        birthplace: 'White Rock, BC',
        birthdate: '02/11/88'
      },
      {
        image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nophoto.png&w=110&h=80&scale=crop',
        name: 'Kyle Shapiro',
        number: '65',
        age: '29',
        height: `5' 9"`,
        weight: '175 lbs',
        shot: 'R',
        birthplace: 'Ocean, NJ',
        birthdate: '03/27/93'
      }
    ];
    axios.get.mockResolvedValue({ data: fs.readFileSync("./models/tests/html_tests/teamRosterNHLExample.html") });
  
    let scrapedRoster = await teamExapansionScrape.getRoster("nhl", "nj");
  
    expect(scrapedRoster).toStrictEqual(roster);

});


test("TESTING: Injuries", async () => {  
  let injuries =     [        
    {      
      name: 'LeBron James',
      position: 'SF',
      status: 'Out',
      description: 'James (ankle) will not require offseason surgery on his left ankle,  Dave McMenamin of ESPN reports.'
    },
    {
      name: 'Kendrick Nunn',
      position: 'G',
      status: 'Out',
      description: 'Nunn (knee) intends to exercise his $5.25 million player option for 2022-23, Jake Fischer of BleacherReport.com reports.'   
    }
  ];
  axios.get.mockResolvedValue({ data: fs.readFileSync("./models/tests/html_tests/teamInjuries.html") });

  let scrapedInjuries = await teamExapansionScrape.getInjuries("nba", "lal");

  expect(scrapedInjuries).toStrictEqual(injuries);
});

test("TESTING: Transactions", async () => {  
  let transactions =     [        
    {      
      date: 'March 1, 2022',
      description: 'Waived D DeAndre Jordan and F Sekou Doumbouya. Signed F Wenyen Gabriel to a two-way contract. Signed G D.J. Augustin to a rest-of-season contract.'
    },
    {
      date: 'January 27, 2022',
      description: 'Signed F Stanley Johnson to a rest-of-the-season contract.'
    },
    {
      date: 'January 12, 2022',
      description: 'Signed F Sekou Doumbouya to a two-way contract. Waived F Jay Huff.'
    },
    {
      date: 'January 6, 2022',
      description: 'Signed F Stanley Johnson to a 10-day contract.'
    }
  ];
  axios.get.mockResolvedValue({ data: fs.readFileSync("./models/tests/html_tests/teamTransactions.html") });

  let scrapedTransactions = await teamExapansionScrape.getTransactions("nba", "lal");
  expect(scrapedTransactions).toStrictEqual(transactions);
});

test("TESTING: Team Headlines", async () => {  
  let news =     [        
    {      
      url: "https://news.google.com./articles/CBMiRmh0dHBzOi8vd3d3Lm1sYi5jb20vbmV3cy9icmF2ZXMtcmFsbHktaW4tOXRoLXdhbGstb2ZmLWFnYWluc3QtcGhpbGxpZXPSAU9odHRwczovL3d3dy5tbGIuY29tL2FtcC9uZXdzL2JyYXZlcy1yYWxseS1pbi05dGgtd2Fsay1vZmYtYWdhaW5zdC1waGlsbGllcy5odG1s?hl=en-US&gl=US&ceid=US%3Aen",
      title: "Braves' wild walk-off win real family affair",
      timeElapsed: "21 hours ago",
      source: "MLB.com",
      image: "https://lh3.googleusercontent.com/proxy/WRaaAfFiJBb7SuP8bfp-1KJC45VEvq-AWH3VTxVXCWqe23zW0iyjewQXdOTjTo-TiYZaqK3Lg3QHEZ9PaJcJtabVzW02TW-w5V-rbVdA8VcueQ29NpJ3MdU_ItafTx1TIbDjR6cyUKfYJmcVsVvc3KNMG3Y=w200-h200-rw-dcGTOMCR0I"
    },
    {
      url: "https://news.google.com./articles/CBMijwFodHRwczovL3d3dy5lc3BuLmNvbS9tbGIvaW5zaWRlci9pbnNpZGVyL3N0b3J5L18vaWQvMzM5NzI1MzMvaXMtcGFuaWMtYnJhdmVzLXdhcnJhbnRlZC1iZWxsaW5nZXItdHVybi1lYXJseS12ZXJkaWN0LW1sYi1iaWdnZXN0LWRpc2FwcG9pbnRtZW50c9IBnAFodHRwczovL3d3dy5lc3BuLmNvbS9tbGIvaW5zaWRlci9pbnNpZGVyL3N0b3J5L18vaWQvMzM5NzI1MzMvaXMtcGFuaWMtYnJhdmVzLXdhcnJhbnRlZC1iZWxsaW5nZXItdHVybi1lYXJseS12ZXJkaWN0LW1sYi1iaWdnZXN0LWRpc2FwcG9pbnRtZW50cz9wbGF0Zm9ybT1hbXA?hl=en-US&gl=US&ceid=US%3Aen",
      title: "Is panic over Atlanta Braves warranted? Will Cody Bellinger turn it around? An early verdict on MLB's biggest disappointments",
      timeElapsed: "16 hours ago",
      source: "ESPN",
      image: "https://lh3.googleusercontent.com/proxy/iKABK82siQMizdhp9wEI9grUfeOozuFxs5o-ukKPyvkGvdp7RMvs020bTMz_TCYtPfw40p3XnlokFEfrnLd7FTDPFWVbRCU38CEehZhy6hRzpyLv-tk71mgyCw=w200-h200-rw-dcnRaWK5YK"
    },
    {
      url: "https://news.google.com./articles/CBMib2h0dHBzOi8vd3d3Lm1sYi5jb20vcHJlc3MtcmVsZWFzZS9wcmVzcy1yZWxlYXNlLWF0bGFudGEtYnJhdmVzLWhvbWVzdGFuZC1oaWdobGlnaHRzLW1vbmRheS1tYXktMjMtc3VuZGF5LW1heS0yOdIBAA?hl=en-US&gl=US&ceid=US%3Aen",
      title: "Atlanta Braves Homestand Highlights, Monday, May 23-Sunday, May 29",
      timeElapsed: '6 days ago',
      source: "MLB.com",
      image: "https://lh3.googleusercontent.com/proxy/ozSyndwr4L2IvoLYdICQGFpCaHK-_kLJrFNhIf338J8gNRpRO8gNd6_6NSFK1Bwi5PKnpsuAgjAWdmM05EeordpN7_q3-x5dx6xGRfra8fV3GI2M5jSgVD9oXoERmFvBQvpDzSMzZExmSsNoivOXP-pIwE0=w200-h200-rw-dcqRWCzRUK"
    }
  ];
  
  axios.get.mockResolvedValue({ data: fs.readFileSync("./models/tests/html_tests/teamNews.html") });

  let scrapedNews = await teamExapansionScrape.getHeadlines("mlb", "atlanta braves", 3);
  expect(scrapedNews).toStrictEqual(news);
});