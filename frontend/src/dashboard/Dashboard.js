import React, {useEffect, useState} from "react";
import './style/dashboard.scss';
import TeamOverview from "./sport/TeamOverview";
import CloseableItem from "./CloseableItem";
import ThirdContent from "./ThirdContent";
<<<<<<< HEAD:frontend/src/dashboard/Dashboard.js
import StandingsTable from './sport/StandingsTable';
import Schedule from '../Schedule';
import Article from './news/Article';
import {fetchNBAStandings, fetchSports} from "../SportHandler";
import {fetchNews} from "./news/NewsHandler";
import {all_prefs, getInterestedSports, getSportsWithOneTeamFollowed} from "../PrefHandler";
=======
import StandingsTable from './StandingsTable';
import Schedule from './Schedule';
import Article from './Article';
import {fetchSports} from "./SportHandler";
import {fetchNews} from "./NewsHandler";
import {all_prefs, getInterestedSports} from "./PrefHandler";
>>>>>>> 2ac40d9b84989206b2976c79873366fa6a884356:frontend/src/Dashboard.js

function default_items(prefs, sports) {
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
    const [sports, setSports] = useState([])
    const [news, setNews] = useState([])

    const prefs = props.prefs ? props.prefs : all_prefs;

    useEffect(() => {
        fetchSports().then( result => {
            if (result)
                setSports(result);
        });
    }, [] );
    useEffect(() => {
        fetchNews(getInterestedSports(prefs)).then( result => {
            if (result)
                setNews(result);
        });
    }, [prefs] );

    if (!props || !props.prefs) {
        return (
            <div className='content'>
                <div className='dashboard'>
                    <p className='nomargin'>Loading...</p>
                </div>
            </div>
        );
    }
    const all_items = default_items(prefs, sports).concat(article_items(prefs, news));
    return (
        <div className='content'>
            <div className='dashboard'>
                {partitionItems(all_items)}
            </div>
        </div>
    );
}