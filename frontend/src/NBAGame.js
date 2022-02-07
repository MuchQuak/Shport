import React from 'react';
import './App.css';
import './GameSchedule.css';

function NBAGame(props) {
    var game = props.game;
    var clock_data = game.clock.toString().trim();
    function ready(data) {
        return data !== "";
    }
    function over() {
        return game.status > 2 || (!game.halftime && !ready(clock_data) && game.currentQtr === 4 && game.endPeriod)
    }
    function halftime() {
        return game.halftime || (!ready(clock_data) && game.currentQtr === 2 && game.endPeriod && game.activated)
    }
    function starttime() {
        const today = new Date();
        const currentDate = today.getFullYear() + "-" +
            String(today.getMonth() + 1).padStart(2, '0') + "-" +
            String(today.getDate()).padStart(2, '0');
        const startTime = String(game.startTimeEST)
            .replace(' ', '')
            .replace('PM', '')
            .replace('AM', '')
            .replace('ET', '')
            .trim().padStart(5, '0');
        const dateString = currentDate + 'T' + startTime + ':00.000-05:00';
        const date = new Date(dateString);
        return date.toTimeString().substr(0, 5) + ' ' +
            date.toLocaleTimeString('en-us',{timeZoneName:'short'}).split(' ')[2];
    }
    const clock = function() {
        if (over()) {
            return (<p>Final Score</p>)
        }
        if (halftime()) {
            return (<p><b>Halftime</b></p>)
        }
        if (!ready(clock_data) || !game.activated){
            return (<p>{starttime()}</p>);
        }
        return (<p><b>{clock_data} - {game.currentQtr} of {game.maxQtr}</b></p>)
    }
    const score = function(score) {
        if (score === "" || game.status <= 1) {
            return (null);
        }
        return (<p className='score'>{score}</p>)
    }
    const logo = function(abbreviation) {
        var logo = 'https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/' + abbreviation.toLowerCase() + '.png';
        return (<div className='logo-container'><img src={logo} alt='logo'/></div>)
    }
    const name_record = function (team, record) {
        return (<div className='game-name-record'><p className='game-team-name'>{team}</p><p className='game-record'>{record}</p></div>)
    }
    return (
        <div className='game'>
            <div className='game-header'>
                {clock()}
            </div>
            <div className='game-data'>
                <div className='game-left'>
                    {logo(game.home)}
                    {name_record(game.home, game.home_record)}
                    {score(game.home_score)}
                </div>
                <div className='game-right'>
                    {logo(game.away)}
                    {name_record(game.away, game.away_record)}
                    {score(game.away_score)}
                </div>
            </div>
            <p className='game-footer'>{game.arena}</p>
        </div>
    );
}

export default NBAGame;