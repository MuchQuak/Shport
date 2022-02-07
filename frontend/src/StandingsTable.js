import React from 'react';

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
                team_stats.push(new_team)
            }
        }
        return team_stats;
    }
    const west = get_teams('west').map((row, index) => {
        return (
            <tr key={index}>
                <td>{row.rank}</td>
                <td>{row.name}</td>
                <td>{row.wins}</td>
                <td>{row.losses}</td>
            </tr>
        );
    });
    const east = get_teams('east').map((row, index) => {
        return (
            <tr key={index}>
                <td>{row.rank}</td>
                <td>{row.name}</td>
                <td>{row.wins}</td>
                <td>{row.losses}</td>
            </tr>
        );
    });
    return (
        <table className='data'>
            <thead>
            <tr>
                <th>Rank</th>
                <th>Team</th>
                <th>Wins</th>
                <th>Losses</th>
            </tr>
            </thead>
            <tbody>
              {west}
              <br />
              {east}
            </tbody>
        </table>
    );
}

export default StandingsTable;