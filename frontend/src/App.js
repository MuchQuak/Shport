import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom'; // Might need again for later
import axios from 'axios';
import './App.css';
import StandingsTable from './StandingsTable';
import Schedule from './Schedule';
import Article from './Article';
import NavBar from './NavBar';
import TeamOverview from "./TeamOverview";
import CloseableItem from "./CloseableItem";
import ThirdContent from "./ThirdContent";
import NBAItem from "./NBAItem";
import NFLItem from "./NFLItem";
import MLBItem from "./MLBItem";

export default function App() {
    //const [teams, setTeams] = useState([]);
    const [games, setGames] = useState([]);
    const [stats, setStats] = useState({});
    const location = useLocation();

    useEffect(() => {
        /*fetchTeams().then( result => {
            if (result)
                setTeams(result);
        });*/
        fetchGames().then( result => {
            if (result)
                setGames(result);
        });
        fetchStats().then( result => {
            if (result)
                setStats(result);
        });
    }, [] );
    /*async function fetchTeams(){
        try {
            const response = await axios.get('http://localhost:5000/teams');
            return response.data.teams;
        }
        catch (error){
            console.log(error);
            return false;
        }
    }*/
    async function fetchGames(){
        try {
            const response = await axios.get('http://localhost:5000/NBA');
            return response.data.games;
        }
        catch (error){
            console.log(error);
            return false;
        }
    }
    async function fetchStats(){
        try {
            const response = await axios.get('http://localhost:5000/NBA/standings');
            return response.data.teams;
        }
        catch (error){
            console.log(error);
            return false;
        }
    }
    const nbaLogo = <div className='logo-container'><img className='logo' id='sport-logo' src='https://cdn.nba.com/logos/nba/nba-logoman.svg' alt='nba-logo'/></div>;

    if (location.state == null) {
        location.state = {};
        location.state.username = "[ Username ]";
        location.state.preferences = [];
    }
    const prefs = location.state.preferences;
    return (
      <>
          <NavBar/>
          <div className='content'>
              <ThirdContent>
                  <NBAItem prefs={prefs}>
                      <CloseableItem title='Schedule'><Schedule className='nbaSchedule' games={games} /></CloseableItem>
                  </NBAItem>
                  <NFLItem prefs={prefs}>
                      <CloseableItem title='Schedule'><p>NFL!</p></CloseableItem>
                  </NFLItem>
                  <MLBItem prefs={prefs}>
                      <CloseableItem title='Schedule'><p>MLB!</p></CloseableItem>
                  </MLBItem>
              </ThirdContent>
              <ThirdContent>
                  <CloseableItem title='Teams' logo={nbaLogo} prefs={prefs}><TeamOverview teams={["LAL", "CHA", "CHI"]} stats={stats}/></CloseableItem>
                  <CloseableItem title='Kings Trade for Sabonis' logo={nbaLogo} prefs={prefs}>
                      <Article date='8 February 2022' body='The Sacramento Kings have traded away Tyrese Haliburton, Buddy Hield, and Tristan Thompson in a shocking move early this Tuesday. In return, they received Indiana Pacers center Domantas Sabonis, along with players Jeremy Lamb and Justin Holiday.'/>
                  </CloseableItem>
                  <CloseableItem title='News Article' prefs={prefs}>
                      <Article date='3 February 2022' body='test number 2'/>
                  </CloseableItem>
              </ThirdContent>
              <ThirdContent>
                  <CloseableItem title='Standings' logo={nbaLogo} prefs={prefs}><StandingsTable stats={stats} /></CloseableItem>
                  <CloseableItem title='News Article 3' prefs={prefs}>
                      <Article date='9 February 2022' body='test number 3'/>
                  </CloseableItem>
              </ThirdContent>
          </div>
      </>
  );
}
