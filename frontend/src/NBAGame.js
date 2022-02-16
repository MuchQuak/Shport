import './style/GameSchedule.css';

function logo(abbreviation) {
    const url = 'https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/' + abbreviation.toLowerCase() + '.png';
    return (<div className='logo-container'><img className='logo' src={url} alt='logo'/></div>)
}

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
    function clock() {
        if (game.status > 2) {
            return (<p>Final Score</p>);
        }
        if (halftime()) {
            return (<p><b>Halftime</b></p>);
        }
        if (clock_data === "" || !game.activated){
            return (<p>{starttime()}</p>);
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
                    {logo(game.home)}
                    <p className='game-team-name'>{homeStats['city']} {homeStats['name']}</p>
                    {score(game, game.home_score)}
                </div>
                <div className='game-center'>
                    {clock()}
                    <p className='game-footer'>{game.arena}</p>
                </div>
                <div className='game-right'>
                    {logo(game.away)}
                    <p className='game-team-name'>{awayStats['city']} {awayStats['name']}</p>
                    {score(game, game.away_score)}
                </div>
            </div>
        </div>
    );
}