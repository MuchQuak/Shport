import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Table from './Table';
import Schedule from './Schedule';
import Article from './Article';
import './App.css';
import TeamOverview from "./TeamOverview";

function App() {
    const [teams, setTeams] = useState([]);
    const [games, setGames] = useState([]);
    const [nbaTeams, setNbaTeams] = useState([]);
    const [favTeam, setFavTeam] = useState([]);
    const [favTeamStatistics, setFavTeamStatistics] = useState([]);
    const [favTeam2, setFavTeam2] = useState([]);
    const [favTeamStatistics2, setFavTeamStatistics2] = useState([]);
    const [favTeam3, setFavTeam3] = useState([]);
    const [favTeamStatistics3, setFavTeamStatistics3] = useState([]);

    useEffect(() => {
        fetchTeams().then( result => {
            if (result)
                setTeams(result);
        });
        fetchGames().then( result => {
            if (result)
                setGames(result);
        });
        fetchNbaTeams().then( result => {
            if (result)
                setNbaTeams(result);
        });
        var favorite1 = 'SAC'
        var favorite2 = 'CHI'
        var favorite3 = 'LAL'
        fetchFavTeam(favorite1).then( result => {
            if (result)
                setFavTeam(result);
        });
        fetchFavTeamStatistics(favorite1).then( result => {
            if (result)
                setFavTeamStatistics(result);
        });
        fetchFavTeam(favorite2).then( result => {
            if (result)
                setFavTeam2(result);
        });
        fetchFavTeamStatistics(favorite2).then( result => {
            if (result)
                setFavTeamStatistics2(result);
        });
        fetchFavTeam(favorite3).then( result => {
            if (result)
                setFavTeam3(result);
        });
        fetchFavTeamStatistics(favorite3).then( result => {
            if (result)
                setFavTeamStatistics3(result);
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
    async function fetchNbaTeams(){
        try {
            const response = await axios.get('http://localhost:5000/nba/teams');
            return response.data;
        }
        catch (error){
            //Log error to console
            console.log(error);
            return false;
        }
    }
    async function fetchFavTeam(interest){
        try {
            const response = await axios.get('http://localhost:5000/nba/teams/' + interest);
            return response.data;
        }
        catch (error){
            //Log error to console
            console.log(error);
            return false;
        }
    }
    async function fetchFavTeamStatistics(interest){
        try {
            const response = await axios.get('http://localhost:5000/nba/standings/' + interest);
            return response.data;
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
                      <p className='item-title'>Team Overview</p>
                      <div className='item-body'>
                          <TeamOverview team={favTeam} stats={favTeamStatistics}/>
                      </div>
                  </div>
                  <div className='item'>
                      <p className='item-title'>Team Overview</p>
                      <div className='item-body'>
                          <TeamOverview team={favTeam2} stats={favTeamStatistics2}/>
                      </div>
                  </div>
                  <div className='item'>
                      <p className='item-title'>Team Overview</p>
                      <div className='item-body'>
                          <TeamOverview team={favTeam3} stats={favTeamStatistics3}/>
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
                          <Article about='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non ante nisl. Vestibulum porttitor sed purus ac facilisis. Proin pharetra tellus sem, venenatis interdum mauris iaculis non. In id velit at ligula fermentum aliquet. Aenean tincidunt ac nisl nec feugiat. Vestibulum sodales elit lectus, non tristique tortor ullamcorper eu. Fusce pharetra pulvinar diam ut faucibus. Etiam vestibulum fermentum mauris, quis dapibus nibh tempus ut.'/>
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
      </div>
  );
}

export default App;
