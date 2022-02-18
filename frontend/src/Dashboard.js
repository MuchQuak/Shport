import React, {useEffect, useState} from "react";
import './style/Dashboard.css';
import TeamOverview from "./TeamOverview";
import CloseableItem from "./CloseableItem";
import ThirdContent from "./ThirdContent";
import StandingsTable from './StandingsTable';
import Schedule from './Schedule';
import Article from './Article';
import {fetchNBAStandings, fetchSports} from "./SportHandler";

function default_items(prefs, sports, stats) {
    return [
        (<CloseableItem title='Schedule' prefs={prefs} sports={sports}>
            <Schedule className='nbaSchedule' sports={sports}/>
        </CloseableItem>),
        (<CloseableItem title='Teams' prefs={prefs}>
            <TeamOverview sports={sports}/>
        </CloseableItem>),
        (<CloseableItem title='Standings' prefs={prefs} sports={sports}>
            <StandingsTable />
        </CloseableItem>)
    ]
}

//

function article_items(prefs) {
    return [
        (<CloseableItem title='Kings Trade for Sabonis' prefs={prefs}>
            <Article date='8 February 2022'
                     body='The Sacramento Kings have traded away Tyrese Haliburton, Buddy Hield, and Tristan Thompson in a shocking move early this Tuesday. In return, they received Indiana Pacers center Domantas Sabonis, along with players Jeremy Lamb and Justin Holiday.'/>
        </CloseableItem>),
        (<CloseableItem title='News Article' prefs={prefs}>
            <Article date='3 February 2022' body='test number 2'/>
        </CloseableItem>)
    ]
}

function partitionItems(items) {
    const one = [];
    const two = [];
    const three = [];
    items.forEach((item, index) => {
        if (index % 3 === 0){
            one.push(item);
        } else if (index % 3 === 1) {
            two.push(item);
        } else if (index % 3 === 2) {
            three.push(item);
        }
    });
    return (
        <>
            <ThirdContent key={0}>{one}</ThirdContent>
            <ThirdContent key={1}>{two}</ThirdContent>
            <ThirdContent key={2}>{three}</ThirdContent>
        </>
    );
}

export default function Dashboard(props) {
    const [stats, setStats] = useState({});
    const [sports, setSports] = useState([]);

    useEffect(() => {
        fetchNBAStandings().then( result => {
            if (result)
                setStats(result);
        });
        fetchSports().then( result => {
            if (result)
                setSports(result);
        });
    }, [] );
    if (props) {
        if (props.prefs) {
            const all_items = default_items(props.prefs, sports, stats).concat(article_items(props.prefs));
            return (
                <div className='dashboard'>
                    {partitionItems(all_items)}
                </div>
            );
        }
    }
    return (<p className='nomargin'>Loading...</p>);
}