import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Table from './Table';
import Schedule from './Schedule';
import Article from './Article';
import './App.css';

function App() {
    const [teams, setTeams] = useState([]);
    const [games, setGames] = useState([]);

    useEffect(() => {
        fetchTeams().then( result => {
            if (result)
                setTeams(result);
        });
        fetchGames().then( result => {
            if (result)
                setGames(result);
        });
    }, [] );
    async function fetchTeams(){
        try {
            const response = await axios.get('http://localhost:5000/teams');
            return response.data.team_list;
        }
        catch (error){
            //Log error to console
            console.log(error);
            return false;
        }
    }
    async function fetchGames(){
        try {
            const response = await axios.get('http://localhost:5000/nba');
            return response.data.games;
        }
        catch (error){
            //Log error to console
            console.log(error);
            return false;
        }
    }
  return (
      <div className='container'>
          <h1 className='header'>Sports Dashboard</h1>
          <div className='third'>
              <div className='items'>
                  <div className='item'>
                      <p className='item-title'>Today's NBA Schedule</p>
                      <div className='item-body'>
                        <Schedule className='nbaSchedule' gameData={games} />
                      </div>
                  </div>
              </div>
          </div>
          <div className='third'>
              <div className='items'>
                  <div className='item'>
                      <p className='item-title'>News Article</p>
                      <div className='item-body'>
                          <Article about='test'/>
                      </div>
                  </div>
                  <div className='item'>
                      <p className='item-title'>News Article</p>
                      <div className='item-body'>
                          <Article about='test number 2'/>
                      </div>
                  </div>
              </div>
          </div>
          <div className='third'>
              <div className='items'>
                  <div className='item'>
                      <p className='item-title'>NBA Team Standings</p>
                      <div className='item-body'>
                          <Table teamData={teams} />
                      </div>
                  </div>
                  <div className='item'>
                      <p className='item-title'>News Article</p>
                      <div className='item-body'>
                          <Article about='test number 3'/>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  );
}

export default App;
