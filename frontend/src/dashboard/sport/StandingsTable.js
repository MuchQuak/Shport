import "./style/standings.scss";
import Tabbed from "./Tabbed";
import {getSportsFollowed} from "./PrefHandler";
import {
    byCode,
    fetchNBAStandings,
    fetchNHLStandings,
    getLeagueLogo,
    getTeamLogo
} from "./SportHandler";
import {useEffect, useState} from "react";

function get_teams(standings, conference) {
    const team_stats = [];
    for (let team in standings) {
        const stat = standings[team];
        if (String(stat['conference']).toLowerCase() === conference.toLowerCase()) {
            const new_team = {};
            new_team.rank = stat['rank'];
            new_team.name = stat['city'] + ' ' + stat['name'];
            new_team.wins = stat['wins'];
            new_team.losses = stat['losses'];
            new_team.code = stat['code'];
            team_stats.push(new_team)
        }
    }
    return team_stats.sort(function (team, other) {
        return team.rank.localeCompare(other.rank, 'en', {numeric: true});
    });
}
function Conf(league, standings, conference, props) {
    return get_teams(standings, conference).map((row, index) => {
        return (
            <div className='standing' id={index} key={index}>
                <div className='standing-left'>
                    <pre className='standing-rank'>{row.rank.toString().padEnd(2, ' ')}</pre>
                    <div className={classes(row.code, league, props)}>{getTeamLogo(league, row.code, "standing-logo-container")}{row.name}</div>
                </div>
                <div className='standing-right'>
                    <p>{row.wins}-{row.losses}</p>
                </div>
            </div>
        );
    });
}

function classes(code, league, props) {
    let classN = 'logo-name-record';
    if (!props.prefs || !props.prefs.sports) {
        return classN;
    }
    if (props.prefs.sports.hasOwnProperty(league) &&
        props.prefs.sports[league].hasOwnProperty("teams") &&
        props.prefs.sports[league].teams.includes(code)){
        classN = classN + ' favorite';
    }
    return classN;
}

export default function StandingsTable(props) {
    const [standings, setStandings] = useState({});

    useEffect(() => {
        fetchNBAStandings().then( result => {
            const temp = standings;
            if (result)
                temp["NBA"] = result;
                setStandings(temp);
        });
        fetchNHLStandings().then( result => {
            const temp = standings;
            if (result)
                temp["NHL"] = result;
                setStandings(temp);
        });
    }, [standings] );

    if (!props || !props.prefs || !props.sports) {
        return null;
    }
    const leaguesFollowed = getSportsFollowed(props.prefs);
    if (leaguesFollowed.length === 0) {
        return <p className='nomargin bold'>No Leagues Followed</p>;
    }
    const tabs = leaguesFollowed.map((league, index) => {
        const sportInfo = byCode(props.sports, league);
        if (!sportInfo || sportInfo.length === 0 || !sportInfo["divisions"]) {
            return null;
        }
        const divs = sportInfo["divisions"];
        const data = divs.map((div, index) => {
            if (standings.hasOwnProperty(league)) {
                return <div className='conference' key={index}>{Conf(league, standings[league], String(div).toLowerCase(), props)}</div>;
            }
            return <p className='nomargin' key={index}>No {league} content.</p>;
        });
        return (
            <Tabbed titles={divs} default={0} key={index}>
                {data}
            </Tabbed>
        );
    });
    const icons = leaguesFollowed.map((league) => {
        return getLeagueLogo(String(league));
    });
    return (
        <Tabbed titles={leaguesFollowed} icons={icons} default={0}>
            {tabs}
        </Tabbed>
    );
}