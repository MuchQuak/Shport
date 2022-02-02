import React, {useState, useEffect} from 'react';
import Table from './Table';
import axios from 'axios';
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
        <h1>Sports Dashboard</h1>
        <Table teamData={teams} />
      </div>
  );
}

export default App;