import "./style/Standings.css";
import Tabbed from "./Tabbed";
import {all_prefs, getSportsFollowed} from "./PrefHandler";
import {byCode} from "./SportHandler";

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
    if (!props || !props.stats || !props.prefs || !props.sports) {
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
    const leaguesFollowed = getSportsFollowed(all_prefs); // should be replaced with user's prefs when those are fixed...
    const tabs = leaguesFollowed.map((league, index) => {
        const sportInfo = byCode(props.sports, league);
        if (sportInfo.length === 0 || !sportInfo["divisions"]) {
            return null;
        }
        const divs = sportInfo["divisions"];
        const data = divs.map((div, index) => {
            if (league !== "NBA") {
                return <p className='nomargin' key={index}>No data supported.</p>
            }
            return (
                <div className='conference' key={index}>{conf(String(div).toLowerCase())}</div>
            );
        });
        return (
            <Tabbed titles={divs} default={0} key={index}>
                {data}
            </Tabbed>
        );
    });
    return (
        <Tabbed titles={leaguesFollowed} default={0}>
            {tabs}
        </Tabbed>
    );
}