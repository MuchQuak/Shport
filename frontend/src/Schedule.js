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
                return (null);
            }
            return (<p>{clock_data} - ({game.currentQtr}/{game.maxQtr})</p>)
        }
        const score = function(score) {
            if (score === "" || !ready(clock_data)) {
                return (null);
            }
            return (<p>{score}</p>)
        }
        return (
            <div className='game'>
                <div className='game-header'>
                    {clock()}
                    <p>{game.arena} - {game.startTimeEST}</p>
                </div>
                <div className='game-data'>
                    <div className='game-left'>
                        <p>{game.home} ({game.home_record})</p>
                        {score(game.home_score)}
                    </div>
                    <div className='game-right'>
                        <p>{game.away} ({game.away_record})</p>
                        {score(game.away_score)}
                    </div>
                </div>
            </div>
        );
    });
    return (
        <div className='schedule'>{games}</div>
    );
}

export default Schedule;