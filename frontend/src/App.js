import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import axios from 'axios';
import Table from './Table';
import Schedule from './Schedule';
import Article from './Article';
import './App.css';
import NavBar from './NavBar';
import TeamOverview from "./TeamOverview";
import CloseableItem from "./CloseableItem";
import ThirdContent from "./ThirdContent";

function App() {
    // -- See input from login or sign up --
    const location = useLocation();
    if(location.state != null){
        alert("User landing page\n\nusername:\t" + location.state.username +"\nemail:\t\t" + location.state.email + "\npassword:\t" + location.state.password);
    }

    const [teams, setTeams] = useState([]);
    const [games, setGames] = useState([]);
    const [stats, setStats] = useState({});

    useEffect(() => {
        fetchTeams().then( result => {
            if (result)
                setTeams(result);
        });
        fetchGames().then( result => {
            if (result)
                setGames(result);
        });
        fetchStats().then( result => {
            if (result)
                setStats(result);
        });
    }, [] );
    async function fetchTeams(){
        try {
            const response = await axios.get('http://localhost:5000/teams');
            return response.data.team_list;
        }
        catch (error){
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
            console.log(error);
            return false;
        }
    }
    async function fetchStats(){
        try {
            const response = await axios.get('http://localhost:5000/nba/standings');
            return response.data.teams;
        }
        catch (error){
            console.log(error);
            return false;
        }
    }
  return (
      <>
          <NavBar/>
          <div className='content'>
              <ThirdContent>
                  <CloseableItem title='NBA Schedule'><Schedule className='nbaSchedule' games={games} /></CloseableItem>
              </ThirdContent>
              <ThirdContent>
                  <CloseableItem title='Team Overview'><TeamOverview teams={["SAC", "GSW", "CHI"]} stats={stats}/></CloseableItem>
              </ThirdContent>
              <ThirdContent>
                  <CloseableItem title='NBA Standings'><Table teams={teams} /></CloseableItem>
                  <CloseableItem title='News Article 1'>
                      <Article date='2022-02-03' about='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non ante nisl. Vestibulum porttitor sed purus ac facilisis. Proin pharetra tellus sem, venenatis interdum mauris iaculis non. In id velit at ligula fermentum aliquet. Aenean tincidunt ac nisl nec feugiat. Vestibulum sodales elit lectus, non tristique tortor ullamcorper eu. Fusce pharetra pulvinar diam ut faucibus. Etiam vestibulum fermentum mauris, quis dapibus nibh tempus ut.'/>
                  </CloseableItem>
                  <CloseableItem title='News Article 2'>
                      <Article date='2022-02-03' about='test number 2'/>
                  </CloseableItem>
              </ThirdContent>
          </div>
      </>
  );
}

export default App;
