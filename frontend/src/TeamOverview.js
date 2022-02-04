import React from 'react';
import './App.css';
import './TeamOverview.css';

function TeamOverview(props) {
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    var favorite = props.team
    var stat = props.stats
    var code = String(favorite.code).toLowerCase()
    var wins = String(stat.wins)
    var losses = String(stat.losses)
    var rank = String(stat.rank)
    var conference = capitalizeFirstLetter(String(stat.conference))
    const logo = function(abbreviation) {
        var logo = 'https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/' + abbreviation + '.png';
        return (<div className='logo-container' id='overview-logo'><img src={logo} alt='logo'/></div>)
    }
    return (
        <div className='overview'>
            {logo(code)}
            <div className='overview-header'>
                <div><p className='overview-team-name'>{favorite.full_name}</p></div>
                <p className='break'></p>
                <div><p className='overview-stats'>{rank} in the {conference}</p></div>
                <div><p className='overview-stats'>{wins}-{losses}</p></div>
            </div>
        </div>
    );
}

export default TeamOverview;