import React from 'react';
import './App.css';
import './GameSchedule.css';
import './NBAGame.js'
import NBAGame from "./NBAGame";

function Schedule(props) {
    const games = props.gameData.map((game, index) => {
        return (<NBAGame game={game} />);
    });
    return (
        <div className='schedule'>{games}</div>
    );
}

export default Schedule;