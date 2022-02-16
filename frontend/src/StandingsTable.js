import "./style/Standings.css";
import Tabbed from "./Tabbed";
import {all_prefs, getSportsFollowed} from "./PrefHandler";
import {byCode, fetchNBAStandings, fetchNHLStandings, NBA_logo, NHL_logo} from "./SportHandler";
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

export default function StandingsTable(props) {
    const [NBAStandings, setNBAStandings] = useState({});
    const [NHLStandings, setNHLStandings] = useState({});

    useEffect(() => {
        fetchNBAStandings().then( result => {
            if (result)
                setNBAStandings(result);
        });
        fetchNHLStandings().then( result => {
            if (result)
                setNHLStandings(result);
        });
    }, [] );

    if (!props || !props.prefs || !props.sports) {
        return null;
    }
    function NBAConf(conference) {
        return get_teams(NBAStandings, conference).map((row, index) => {
            return (
                <div className='standing' id={index} key={index}>
                    <div className='standing-left'>
                        <pre className='standing-rank'>{row.rank.toString().padEnd(2, ' ')}</pre>
                        <div className='logo-name-record'>{NBA_logo(row.code)}{row.name}</div>
                    </div>
                    <div className='standing-right'>
                        <p>{row.wins}-{row.losses}</p>
                    </div>
                </div>
            );
        });
    }
    function NHLConf(conference) {
        return get_teams(NHLStandings, conference).map((row, index) => {
            return (
                <div className='standing' id={index} key={index}>
                    <div className='standing-left'>
                        <pre className='standing-rank'>{row.rank.toString().padEnd(2, ' ')}</pre>
                        <div className='logo-name-record'>{NHL_logo(row.code)}{row.name}</div>
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
            if (league === "NBA") {
                return <div className='conference' key={index}>{NBAConf(String(div).toLowerCase())}</div>;
            } else if (league === "NHL") {
                return <div className='conference' key={index}>{NHLConf(String(div).toLowerCase())}</div>;
            }
            return <p className='nomargin' key={index}>No {league} content.</p>;
        });
        return (
            <Tabbed titles={divs} default={0} key={index}>
                {data}
            </Tabbed>
        );
    });
    return (
        <Tabbed titles={leaguesFollowed} default={2}>
            {tabs}
        </Tabbed>
    );
}