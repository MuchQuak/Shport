import './style/GameSchedule.css';
import {NBA_logo, UTCtoLocal} from "./SportHandler";

function score(game, score_info) {
    if (score_info === "" || game.status <= 1) {
        return null;
    }
    return (<p className='score'>{score_info}</p>);
}

export default function NBAGame(props) {
    if (!props || !props.game || !props.stats) {
        return null;
    }
    const game = props.game;
    const homeStats = props.stats[String(game.home).trim()];
    const awayStats = props.stats[String(game.away).trim()];
    if (!homeStats || !awayStats || !homeStats['name'] || !awayStats['name']) {
        return null;
    }
    const clock_data = game.clock.toString().trim();
    function halftime() {
        return game.halftime || (clock_data === "" && game.currentQtr === 2 && game.endPeriod && game.activated)
    }
    function clock() {
        if (game.status > 2) {
            return (<p>Final Score</p>);
        }
        if (halftime()) {
            return (<p><b>Halftime</b></p>);
        }
        if (clock_data === "" || !game.activated){
            return (<p>{UTCtoLocal(game.startTimeUTC)}</p>);
        }
        return (
            <>
                <p><b>{clock_data}</b></p>
                <p><b>{game.currentQtr} of {game.maxQtr}</b></p>
            </>
        );
    }
    return (
        <div className='game'>
            <div className='game-data'>
                <div className='game-left'>
                    {NBA_logo(game.home)}
                    <p className='game-team-name'>{homeStats['city']} {homeStats['name']}</p>
                    {score(game, game.home_score)}
                </div>
                <div className='game-center'>
                    {clock()}
                    <p className='game-footer'>{game.arena}</p>
                </div>
                <div className='game-right'>
                    {NBA_logo(game.away)}
                    <p className='game-team-name'>{awayStats['city']} {awayStats['name']}</p>
                    {score(game, game.away_score)}
                </div>
            </div>
        </div>
    );
}