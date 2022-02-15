import React, {useEffect, useState} from "react";
import './style/Dashboard.css';
import TeamOverview from "./TeamOverview";
import CloseableItem from "./CloseableItem";
import ThirdContent from "./ThirdContent";
import StandingsTable from './StandingsTable';
import Schedule from './Schedule';
import Article from './Article';
import axios from "axios";

export default function Dashboard(props) {
    const [todayNBAGames, setTodayNBAGames] = useState([]);
    const [yesterdayNBAGames, setYesterdayNBAGames] = useState([]);
    const [tomorrowNBAGames, setTomorrowNBAGames] = useState([]);
    const [stats, setStats] = useState({});

    useEffect(() => {
        /*fetchTeams().then( result => {
            if (result)
                setTeams(result);
        });*/
        fetchTodayNBAGames().then( result => {
            if (result)
                setTodayNBAGames(result);
        });
        fetchYesterdayNBAGames().then( result => {
            if (result)
                setYesterdayNBAGames(result);
        });
        fetchTomorrowNBAGames().then( result => {
            if (result)
                setTomorrowNBAGames(result);
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
    async function fetchTodayNBAGames(){
        try {
            const response = await axios.get('http://localhost:5000/NBA');
            return response.data.games;
        }
        catch (error){
            console.log(error);
            return false;
        }
    }
    async function fetchYesterdayNBAGames(){
        try {
            const response = await axios.get('http://localhost:5000/NBA/yesterday');
            return response.data.games;
        }
        catch (error){
            console.log(error);
            return false;
        }
    }
    async function fetchTomorrowNBAGames(){
        try {
            const response = await axios.get('http://localhost:5000/NBA/tomorrow');
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
    // const nbaLogo = <div className='logo-container'><img className='logo' id='sport-logo' src='https://cdn.nba.com/logos/nba/nba-logoman.svg' alt='nba-logo'/></div>;
    if (props) {
        if (props.prefs) {
            const prefs = props.prefs;
            return (
                <div className='dashboard'>
                    <ThirdContent>
                        <CloseableItem title='Schedule'>
                            <Schedule className='nbaSchedule'
                                      today={todayNBAGames}
                                      yesterday={yesterdayNBAGames}
                                      tomorrow={tomorrowNBAGames}
                                      stats={stats} />
                        </CloseableItem>
                        <CloseableItem title='Schedule'><p className='nomargin'>NFL!</p></CloseableItem>
                        <CloseableItem title='Schedule'><p className='nomargin'>MLB!</p></CloseableItem>
                    </ThirdContent>
                    <ThirdContent>
                        <CloseableItem title='Teams' prefs={prefs}>
                            <TeamOverview stats={stats}/>
                        </CloseableItem>
                        <CloseableItem title='Kings Trade for Sabonis' prefs={prefs}>
                            <Article date='8 February 2022'
                                     body='The Sacramento Kings have traded away Tyrese Haliburton, Buddy Hield, and Tristan Thompson in a shocking move early this Tuesday. In return, they received Indiana Pacers center Domantas Sabonis, along with players Jeremy Lamb and Justin Holiday.'/>
                        </CloseableItem>
                        <CloseableItem title='News Article' prefs={prefs}>
                            <Article date='3 February 2022' body='test number 2'/>
                        </CloseableItem>
                    </ThirdContent>
                    <ThirdContent>
                        <CloseableItem title='Standings' prefs={prefs}>
                            <StandingsTable stats={stats}/>
                        </CloseableItem>
                        <CloseableItem title='News Article 3' prefs={prefs}>
                            <Article date='9 February 2022' body='test number 3'/>
                        </CloseableItem>
                    </ThirdContent>
                </div>
            );
        }
    }
    return (<p className='nomargin'>Loading...</p>);
}