import React from 'react';
import './App.css';

function TableHeader() {
    return (
        <thead>
        <tr>
            <th>Team Name</th>
            <th>Wins</th>
            <th>Losses</th>
        </tr>
        </thead>
    );
}

function TableBody(props) {
    const rows = props.teamData.map((row, index) => {
        return (
            <tr key={index}>
                <td>{row.name}</td>
                <td>{row.wins}</td>
                <td>{row.losses}</td>
            </tr>
        );
    });
    return (
        <tbody>{rows}</tbody>
    );
}

function Table(props) {
    return (
        <table className='data'>
            <TableHeader />
            <TableBody teamData={props.teamData} />
        </table>
    );
}

export default Table;