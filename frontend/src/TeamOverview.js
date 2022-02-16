import './style/TeamOverview.css';
import {all_prefs, getSportsFollowed, getTeamsFollowedForSport} from "./PrefHandler";
import Tabbed from "./Tabbed";

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function suffix(i) {
    const j = i % 10, k = i % 100;
    if (j === 1 && k !== 11) {
        return i + "st";
    }
    if (j === 2 && k !== 12) {
        return i + "nd";
    }
    if (j === 3 && k !== 13) {
        return i + "rd";
    }
    return i + "th";
}

function logo(abbreviation) {
    const logo = 'https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/' + abbreviation.toLowerCase() + '.png';
    return (<div className='logo-container' id='overview-logo'><img className='logo' src={logo} alt='logo'/></div>)
}

export default function TeamOverview(props) {
    if (!props.stats || !props.prefs) {
        return null;
    }
    const stats = props.stats;
    //const prefs = props.prefs;    // bring this back later, when prefs are working.
    const prefs = all_prefs;
    const leaguesFollowed = getSportsFollowed(prefs); // should be replaced with user's prefs whjen those are fixed.
    const nba_teams = getTeamsFollowedForSport(prefs, "NBA"); // can be made dynamic in the future
    const nba_overviews = nba_teams.map((team, index) => {
        const code = String(team).trim().toUpperCase();
        if (!(stats && stats[code])) {
            return null;
        }
        const stat = stats[code];
        const rank = suffix(stat['rank']);
        const wins = stat['wins'];
        const losses = stat['losses'];
        const name = stat['city'] + ' ' + stat['name'];
        const conference = capitalizeFirstLetter(stat['conference']);
        return (
            <div className='overview' key={index}>
                {logo(code)}
                <div className='overview-header'>
                    <div><p className='overview-team-name'>{name}</p></div>
                    <div className='break'></div>
                    <div><p className='overview-stats'>{rank} in the {conference}</p></div>
                    <div><p className='overview-stats'>{wins}-{losses}</p></div>
                </div>
            </div>
        );
    });
    const tabs = leaguesFollowed.map((league, index) => {
        if (league !== "NBA") {
            return (<p className='nomargin' key={index}>No {league} content.</p>);
        }
        return (
            <div className='overviews'>
                {nba_overviews}
            </div>
        );
    });
    return (
        <Tabbed titles={leaguesFollowed} default={0}>
            {tabs}
        </Tabbed>
    );
}