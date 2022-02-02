import axios from 'axios';
import React, {useState, useEffect} from 'react';
import Table from './Table';
import './App.css';

/*
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
*/

function App() {

    const [teams, setTeams] = useState([]);

    useEffect(() => {
        fetchAll().then( result => {
           if (result)
              setTeams(result);
         });
      }, [] );

    async function fetchAll(){
        try {
            const response = await axios.get('http://localhost:5000/teams');
            return response.data.team_list; 
        }
        catch (error){
            //We're not handling errors. Just logging into the console.
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