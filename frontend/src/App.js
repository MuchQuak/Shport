import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Table from './Table';
import Schedule from './Schedule';
import Article from './Article';
import './App.css';
import TeamOverview from "./TeamOverview";
import CloseableItem from "./CloseableItem";
import ThirdContent from "./ThirdContent";

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
        const teams = ['ATL', 'BOS', 'CHA', 'CHI', 'CLE', 'DAL',  'DEN', 'DET', 'GSW',  'HOU', 'IND', 'LAC', 'LAL', 'MEM', 'MIA', 'MIL', 'MIN', 'NOH', 'NYK', 'BKN', 'OKC', 'ORL', 'PHI', 'PHO', 'POR', 'SAC', 'TOR', 'UTH', 'WAS']
        var favorite1 = teams.splice(Math.floor(Math.random() * teams.length), 1);
        var favorite2 = teams.splice(Math.floor(Math.random() * teams.length), 1);
        var favorite3 = teams.splice(Math.floor(Math.random() * teams.length), 1);
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
    const teamOverview = (teamInfo, teamStats) => {
        return (<TeamOverview team={teamInfo} stats={teamStats}/>);
    }
  return (
      <div className='content'>
          <div className='header'><h1 className='header-text'>Sports Dashboard</h1></div>
          <ThirdContent>
              <CloseableItem title='Team Overview'><Schedule className='nbaSchedule' gameData={games} /></CloseableItem>
          </ThirdContent>
          <ThirdContent>
              <CloseableItem title='Team Overview'>{teamOverview(favTeam, favTeamStatistics)}</CloseableItem>
              <CloseableItem title='Team Overview'>{teamOverview(favTeam2, favTeamStatistics2)}</CloseableItem>
              <CloseableItem title='Team Overview'>{teamOverview(favTeam3, favTeamStatistics3)}</CloseableItem>
          </ThirdContent>
          <ThirdContent>
              <CloseableItem title='NBA Standings'><Table teamData={teams} /></CloseableItem>
              <CloseableItem title='News Article 1'>
                  <Article about='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non ante nisl. Vestibulum porttitor sed purus ac facilisis. Proin pharetra tellus sem, venenatis interdum mauris iaculis non. In id velit at ligula fermentum aliquet. Aenean tincidunt ac nisl nec feugiat. Vestibulum sodales elit lectus, non tristique tortor ullamcorper eu. Fusce pharetra pulvinar diam ut faucibus. Etiam vestibulum fermentum mauris, quis dapibus nibh tempus ut.'/>
              </CloseableItem>
              <CloseableItem title='News Article 2'>
                  <Article about='test number 2'/>
              </CloseableItem>
          </ThirdContent>
      </div>
  );
}

export default App;
