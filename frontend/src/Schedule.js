import React from 'react';
import './App.css';
import './GameSchedule.css';
import './NBAGame.js'
import NBAGame from "./NBAGame";

function Schedule(props) {
    if (!props.games) {
        return null;
    }
    const games = props.games.map((game, index) => {
        return (<NBAGame game={game} key={index} />);
    });
    return (
        <div className='schedule'>{games}</div>
    );
}

export default Schedule;