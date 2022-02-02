import React from 'react';
import Table from './Table';
import './App.css';

const teams = [
    {
        name: 'Kings',
        wins: 18,
        losses: 34,
    },
    {
        name: 'Warriors',
        wins: 39,
        losses: 13
    },
    {
        name: 'Pelicans',
        wins: 19,
        losses: 32
    }
];

function App() {
  return (
      <div className='container'>
        <h1>Sports Dashboard</h1>
        <Table teamData={teams} />
      </div>
  );
}

export default App;