import axios from 'axios';
import React, {useState, useEffect} from 'react';
import Table from './Table';
import './App.css';

function App() {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        fetchTeams().then( result => {
            if (result)
                setTeams(result);
        });
    }, [] );
    
    async function fetchTeams(){
        try {
            const response = await axios.get('http://localhost:5000/teams');
            return response.data.teams_list;
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
          <div className='items'>
              <div className='item'>
                <p className='item-title'>Team Standings</p>
                <div className='item-body'>
                  <Table teamData={teams} />
                </div>
              </div>
              <div className='item'>
                  <p className='item-title'>News Article</p>
                  <div className='item-body'>
                      <p>BIG NBA NEWS!</p>
                  </div>
              </div>
          </div>
      </div>
  );
}

export default App;
