import "./style/Standings.css";
import Tabbed from "./Tabbed";

function logo(abbreviation) {
    const url = 'https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/' + abbreviation.toLowerCase() + '.png';
    return (<div className='logo-container'><img className='logo' src={url} alt='logo'/></div>)
}

function get_teams(stats, conference) {
    const team_stats = [];
    for (let team in stats) {
        const stat = stats[team];
        if (stat['conference'] === conference) {
            const new_team = {};
            new_team.rank = stat['rank'];
            new_team.name = stat['city'] + ' ' + stat['name'];
            new_team.wins = stat['wins'];
            new_team.losses = stat['losses'];
            new_team.code = stat['code'];
            team_stats.push(new_team)
        }
    }
    return team_stats;
}

export default function StandingsTable(props) {
    if (!props.stats) {
        return null;
    }
    function conf(conference) {
        return get_teams(props.stats, conference).map((row, index) => {
            return (
                <div className='standing' id={index} key={index}>
                    <div className='standing-left'>
                        <pre className='standing-rank'>{row.rank.toString().padEnd(2, ' ')}</pre>
                        <div className='logo-name-record'>{logo(row.code)}{row.name}</div>
                    </div>
                    <div className='standing-right'>
                        <p>{row.wins}-{row.losses}</p>
                    </div>
                </div>
            );
        });
    }
    return (
        <Tabbed titles={['West', 'East']} default={0}>
            <div className='conference'>{conf('west')}</div>
            <div className='conference'>{conf('east')}</div>
        </Tabbed>
    );
}