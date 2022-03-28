import './style/game-schedule.scss';
import {getTeamLogo, UTCtoLocal, getFullName} from "./SportHandler";

function score(game, score_info) {
    if (score_info === "" || game.status < 1) {
        return null;
    }
    return (<p className='score'>{score_info}</p>);
}

function getTeamName(homeOrAway, game, league, sports) {
    if (homeOrAway === "home" && game.home !== "") {
        return game.home;
    }
    if (homeOrAway === "away" && game.away !== "") {
        return game.away;
    }
    const teamCode = String(homeOrAway === "away" ? game.away_code : game.home_code);
    let fullName;
    try {
        fullName = getFullName(teamCode, league, sports);
    } catch (error) {
        fullName = teamCode;
    }
    return fullName;
}

export default function Game(props) {
    if (!props || !props.game || !props.sports || !props.prefs) {
        return null;
    }
    const league = props.league ? props.league : "none";
    const game = props.game;
    const clock_data = String(game.clock).trim();
    //if (!props.sports[league] || !props.sports[league].teams.includes(game.home_code) || !props.sports[league].teams.includes(game.away_code)) {
    //    return null;
    //}
    function halftime() {
      return game.status === 1 && (game.halftime || (clock_data === "" && game.currentQtr === 2));
    }
    function clock() {
        if (game.status === 2) {
            return (<p>Final Score</p>);
        }
        if (halftime()) {
            return (<p><b>Halftime</b></p>);
        }
        if (clock_data === "" || game.status === 0){
            return (<p>{UTCtoLocal(game.startTimeUTC)}</p>);
        }
        return (
            <>
                <p><b>{clock_data}</b></p>
                <p><b>{game.currentQtr} of {game.maxQtr}</b></p>
            </>
        );
    }
    function classes(current_code, current, other) {
        let classN = 'game-team-name';
        if (!props.prefs || !props.prefs.sports) {
            return classN;
        }
        if (props.prefs.sports.hasOwnProperty(league) &&
            props.prefs.sports[league].hasOwnProperty("teams") &&
            props.prefs.sports[league].teams.includes(String(current_code))){
            classN = classN + ' favorite';
        }
        if (parseInt(current) > parseInt(other) && parseInt(game.status) === 2) {
            classN = classN + ' underline';
        }
        return classN;
    }
    return (
        <div className='game'>
            <div className='game-data'>
                <div className='game-left'>
                    {getTeamLogo(league, game.home_code, "schedule-logo-container")}
                    <p className={classes(game.home_code, game.home_score, game.away_score)}>{getTeamName("home", game, league, props.sports)}</p>
                    {score(game, game.home_score)}
                </div>
                <div className='game-center'>
                    {clock()}
                    <p className='game-footer'>{game.arena}</p>
                </div>
                <div className='game-right'>
                    {getTeamLogo(league, game.away_code, "schedule-logo-container")}
                    <p className={classes(game.away_code, game.away_score, game.home_score)}>{getTeamName("away", game, league, props.sports)}</p>
                    {score(game, game.away_score)}
                </div>
            </div>
        </div>
    );
}