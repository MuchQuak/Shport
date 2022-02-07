import React, {Component} from 'react';
import './App.css';
import './TeamOverview.css';

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
    var logo = 'https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/' + abbreviation.toLowerCase() + '.png';
    return (<div className='logo-container' id='overview-logo'><img src={logo} alt='logo'/></div>)
}

export default class TeamOverview extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        if (!(this.props.teams && this.props.stats)) {
            return null;
        }
        const stats = this.props.stats;
        const overviews = this.props.teams.map((team, index) => {
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
        return <>{overviews}</>;
    }
}