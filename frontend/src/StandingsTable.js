import React from 'react';

function logo(abbreviation) {
    const url = 'https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/' + abbreviation.toLowerCase() + '.png';
    return (<div className='logo-container'><img className='logo' src={url} alt='logo'/></div>)
}

function StandingsTable(props) {
    if (!props.stats) {
        return null;
    }
    function get_teams(conference) {
        const team_stats = [];
        for (let team in props.stats) {
            const stat = props.stats[team];
            if (stat['conference'] === conference) {
                const new_team = {};
                new_team.rank = stat['rank'];
                new_team.name = stat['name'];
                new_team.wins = stat['wins'];
                new_team.losses = stat['losses'];
                new_team.code = stat['code'];
                team_stats.push(new_team)
            }
        }
        return team_stats;
    }
    function conf(conference) {
        return get_teams(conference).map((row, index) => {
            return (
                <tr key={index}>
                    <td>{row.rank}</td>
                    <td><div className='logo-name-record'>{logo(row.code)}{row.name}</div></td>
                    <td>{row.wins}-{row.losses}</td>
                </tr>
            );
        });
    }
    return (
        <table className='standings-data'>
          <tbody className='standings-body'>
            {conf('west')}
            <br />
            {conf('east')}
          </tbody>
        </table>
    );
}

export default StandingsTable;