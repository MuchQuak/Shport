import React, {useEffect, useState} from "react";
import './style/Dashboard.css';
import TeamOverview from "./TeamOverview";
import CloseableItem from "./CloseableItem";
import ThirdContent from "./ThirdContent";
import StandingsTable from './StandingsTable';
import Schedule from './Schedule';
import Article from './Article';
import {fetchNBAStats, fetchSports} from "./SportHandler";

export default function Dashboard(props) {
    const [stats, setStats] = useState({});
    const [sports, setSports] = useState([]);

    useEffect(() => {
        fetchNBAStats().then( result => {
            if (result)
                setStats(result);
        });
        fetchSports().then( result => {
            if (result)
                setSports(result);
        });
    }, [] );
    // const nbaLogo = <div className='logo-container'><img className='logo' id='sport-logo' src='https://cdn.nba.com/logos/nba/nba-logoman.svg' alt='nba-logo'/></div>;
    if (props) {
        if (props.prefs) {
            const prefs = props.prefs;
            const thirds = {
                1: [],
                2: [],
                3: []
            };
            const items = [
                (<CloseableItem title='Schedule' prefs={prefs} sports={sports}>
                    <Schedule className='nbaSchedule' stats={stats} />
                </CloseableItem>),
                (<CloseableItem title='Teams' prefs={prefs}>
                    <TeamOverview stats={stats}/>
                </CloseableItem>),
                (<CloseableItem title='Standings' prefs={prefs} sports={sports}>
                    <StandingsTable stats={stats}/>
                </CloseableItem>),
                (<CloseableItem title='Kings Trade for Sabonis' prefs={prefs}>
                    <Article date='8 February 2022'
                             body='The Sacramento Kings have traded away Tyrese Haliburton, Buddy Hield, and Tristan Thompson in a shocking move early this Tuesday. In return, they received Indiana Pacers center Domantas Sabonis, along with players Jeremy Lamb and Justin Holiday.'/>
                </CloseableItem>),
                (<CloseableItem title='News Article' prefs={prefs}>
                    <Article date='3 February 2022' body='test number 2'/>
                </CloseableItem>)
            ]
            items.forEach((item, index) => {
                if (index % 3 === 0){
                    thirds[1].push(item);
                } else if (index % 3 === 1) {
                    thirds[2].push(item);
                } else if (index % 3 === 2) {
                    thirds[3].push(item);
                }
            });
            return (
                <div className='dashboard'>
                    <ThirdContent>{thirds[1]}</ThirdContent>
                    <ThirdContent>{thirds[2]}</ThirdContent>
                    <ThirdContent>{thirds[3]}</ThirdContent>
                </div>
            );
        }
    }
    return (<p className='nomargin'>Loading...</p>);
}