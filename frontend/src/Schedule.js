import React from 'react';
import './App.css';
import './GameSchedule.css';

function Schedule(props) {
    const games = props.gameData.map((game, index) => {
        var clock_data = game.clock.toString().trim();
        function ready(data) {
            return data !== "";
        }
        const clock = function() {
            if (!ready(clock_data)){
                return (<p>{game.startTimeEST}</p>);
            }
            return (<p><b>{clock_data} - {game.currentQtr} of {game.maxQtr}</b></p>)
        }
        const score = function(score) {
            if (score === "" || !ready(clock_data)) {
                return (null);
            }
            return (<p className='score'>{score}</p>)
        }
        const logo = function(abbreviation) {
            var logo = 'https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/' + abbreviation.toLowerCase() + '.png';
            return (<img src={logo}/>)
        }
        return (
            <div className='game'>
                <div className='game-header'>
                    {clock()}
                </div>
                <div className='game-data'>
                    <div className='game-left'>
                        {logo(game.home)}
                        <p>{game.home} ({game.home_record})</p>
                        {score(game.home_score)}
                    </div>
                    <div className='game-right'>
                        {logo(game.away)}
                        <p>{game.away} ({game.away_record})</p>
                        {score(game.away_score)}
                    </div>
                </div>
                <p className='game-footer'>{game.arena}</p>
            </div>
        );
    });
    return (
        <div className='schedule'>{games}</div>
    );
}

export default Schedule;