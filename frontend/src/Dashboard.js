import React, {useEffect, useState} from "react";
import './style/Dashboard.css';
import TeamOverview from "./TeamOverview";
import CloseableItem from "./CloseableItem";
import ThirdContent from "./ThirdContent";
import StandingsTable from './StandingsTable';
import Schedule from './Schedule';
import Article from './Article';
import {fetchNBAStandings, fetchSports} from "./SportHandler";
import {fetchNews} from "./NewsHandler";

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

function article_items(prefs, news) {
    //console.log("prefs " + prefs);
    const temp = news.map((article, idx) =>
        (<CloseableItem title={article.publishBy} key={article.url}>
            <Article news={article} key={article.url}/>
        </CloseableItem>)
        
    )
    return temp;
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
    const [news, setNews] = useState([]);

    useEffect(() => {
        fetchNBAStandings().then( result => {
            if (result)
                setStats(result);
        });
        fetchSports().then( result => {
            if (result)
                setSports(result);
        });
        fetchNews().then( result => {
            if (result)
                setNews(result);
        })
    }, [] );
    if (!props || !props.prefs) {
        return (<p className='nomargin'>Loading...</p>);
    }
    const all_items = default_items(props.prefs, sports, stats).concat(article_items(props.prefs, news));
    return (
        <div className='dashboard'>
            {partitionItems(all_items)}
        </div>
    );
}