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

function TableBody() {
    return (
        <tbody>
        <tr>
            <td>Kings</td>
            <td>18</td>
            <td>34</td>
        </tr>
        <tr>
            <td>Warriors</td>
            <td>39</td>
            <td>13</td>
        </tr>
        </tbody>
    );
}

function Table() {
    return (
        <table className='data'>
            <TableHeader />
            <TableBody />
        </table>
    );
}

export default Table;