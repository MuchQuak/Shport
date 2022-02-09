import './GameSchedule.css';

function logo(abbreviation) {
    const url = 'https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/' + abbreviation.toLowerCase() + '.png';
    return (<div className='logo-container'><img className='logo' src={url} alt='logo'/></div>)
}

function name_record(team, record) {
    return (<div className='game-name-record'><p className='game-team-name'>{team}</p><p className='game-record'>{record}</p></div>)
}

function score(game, score_info) {
    if (score_info === "" || game.status <= 1) {
        return null;
    }
    return (<p className='score'>{score_info}</p>);
}

export default function NBAGame(props) {
    const game = props.game;
    const clock_data = game.clock.toString().trim();
    /*function over() {
        return game.status > 2 || (!game.halftime && !ready(clock_data) && game.currentQtr === 4 && game.endPeriod)
    }*/
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
                    {name_record(game.home, game.home_record)}
                    {score(game, game.home_score)}
                </div>
                <div className='game-center'>
                    {clock()}
                    <p className='game-footer'>{game.arena}</p>
                </div>
                <div className='game-right'>
                    {logo(game.away)}
                    {name_record(game.away, game.away_record)}
                    {score(game, game.away_score)}
                </div>
            </div>
        </div>
    );
}