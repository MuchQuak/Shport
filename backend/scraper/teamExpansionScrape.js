const axios = require('axios');
const cheerio = require('cheerio');


async function getTopPlayers(league, acro){
    //let league = 'nba'
    //let acro = 'ATL'

    axios.get('https://www.espn.com/' + league + '/team/stats/_/name/' + acro + '/season/2022/seasontype/2')
        .then((response) => {
            let $ = cheerio.load(response.data);
            let topPlayers = [];
            
            $('.StatLeaders a').each((index, element) => {
                let category = $(element).find('h2').first().text().trim();
                let name = $(element).find('.Athlete__PlayerName').first().text().trim();
                let image = $(element).find('.Image__Wrapper.aspect-ratio--child').find('img').attr('src');
                let position = $(element).find('.Athlete__NameDetails').text().trim();
                let value = $(element).find('.clr-gray-01').text().trim();

                let player = {name, category, image, position, value};
                /*
                {
                    name: 'Trae Young',
                    category: 'Points',
                    image: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
                    position: 'PG',
                    value: '28.4'
                }
                */
                topPlayers.push(player);
            });
            console.log(topPlayers);
            return topPlayers;
        })
        .catch((error) => {
            console.log(error);
        });
}

async function getRoster(league, acro) {
    //let acro = 'ATL';
    //let league = 'nba';

    axios.get('https://www.espn.com/' + league + '/team/roster/_/name/' + acro)
        .then((response) => {
            let $ = cheerio.load(response.data);
            let roster = [];

            $('.Table__TBODY tr').each((index, element) => {
                let player = [];

                $(element).find('.inline').each((index, elem) => {
                    let value = $(elem).text().trim();
                    
                    if (index == 0) {
                        let img = $(elem).find('img').attr('src');
                        player.push(img);
                    } else if (index == 1) {
                        let num = value.match(/\d+/g)[0];
                        let name = value.replace(/[0-9]/g, '');
                        player.push(name);
                        player.push(num);
                    } else {
                        player.push(value);
                    }
                    
                })

                let playerObj = {image: player[0], name: player[1], number: player[2], position: player[3], age: player[4], height: player[5], weight: player[6], college: player[7], salary: player[8]};
                /*
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
                roster.push(playerObj);
            });
            return roster;
        })
        .catch((error) => {
            console.log(error);
        });
}

async function getInjuries(league, acro) {
    //let acro = 'atl';
    //let league = 'nba';

    axios.get('https://www.espn.com/' + league + '/team/injuries/_/name/' + acro)
        .then((response) => {
            let $ = cheerio.load(response.data);
            let injuries = [];
            let names = [];
            let images = [];
            let positions = [];
            let statuses = [];
            let descriptions = [];

            $('.Athlete__PlayerName').each((index, element) => {
                let name = $(element).text().trim();
                names.push(name);
            });

            $('.Image__Wrapper.aspect-ratio--child img').each((index, element) => {
                let image = $(element).attr('src');
                images.push(image);
            });

            $('.Athlete__NameDetails.ml2.clr-gray-04.di.ns9').each((index, element) => {
                let position = $(element).text().trim();
                positions.push(position);
            });

            $('.TextStatus').each((index, element) => {
                let status = $(element).text().trim();
                statuses.push(status);
            });

            $('.pt3.clr-gray-04.n8').each((index, element) => {
                let desc = $(element).text().trim();
                descriptions.push(desc);
            });

            for (let i = 0; i < names.length; i++) {
                let injuryObj = {name: names[i], image: images[i], position: positions[i], status: statuses[i], description: descriptions[i]};
                /*
                {
                name: 'Clint Capela',
                image: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
                position: 'C',
                status: 'Out',
                description: 'General manager Travis Schlenk said Tuesday that Capela (knee) has restarted strength exercises and will be re-evaluated Friday, Mike Conti of the Atlanta Hawks Radio Network reports.'
                }
                */
                injuries.push(injuryObj);
            }
            console.log(injuries);
            return injuries;
        })
        .catch((error) => {
            console.log(error);
        });
}


async function getSchedule(league, acro) {
    //let acro = 'atl';
    //let league = 'nba';

    axios.get('https://www.espn.com/' + league + '/team/_/name/' + acro)
        .then((response) => {
            let $ = cheerio.load(response.data);
            let schedule = [];
            
            $('.Schedule__Scroll__Container.bg-clr-white section a').each((index, element) => {
                let game = []
                let opponent = $(element).find('.Schedule__Team.truncate').text().trim();
                let image = $(element).find('img').attr('src');

                game.push(opponent);
                game.push(image);

                $(element).find('.Schedule__Meta.flex.ttu.items-end span').each((index, elem) => {
                    let val = $(elem).text().trim();
                    game.push(val);
                })
                
                if (game.length == 4) {
                    gameObj = {status: 'past', opponent, image, result: game[2], score: game[3]};
                    /*{
                        status: 'past',
                        opponent: 'Heat',
                        image: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
                        result: 'L',
                        score: '115-105'
                    }*/
                } else {
                    gameObj = {status: 'future', opponent, image, date: game[2], time: game[3], channel: game[4]};    
                    /*{
                        status: 'future',
                        opponent: 'Heat',
                        image: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
                        date: '4/22',
                        time: '7:00 pm',
                        channel: 'ESPN'
                      }*/
                }


                schedule.push(gameObj);
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }
