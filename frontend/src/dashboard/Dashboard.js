import React, {useEffect, useState} from "react";
import '../style/dashboard.scss';
import TeamOverview from "./sport/TeamOverview";
import CloseableItem from "./CloseableItem";
import ThirdContent from "./ThirdContent";
import StandingsTable from './sport/StandingsTable';
import Schedule from './sport/Schedule';
import Article from './news/Article';
import {sportsQuery} from "./sport/SportHandler";
import {fetchNews} from "./news/NewsHandler";
import {getInterestedSports} from "../settings/PrefHandler";
import {useQuery} from "react-query";
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
    const [sports, setSports] = useState([]);
    const [news, setNews] = useState([]);
    const user = props.user;

    const sportsResult = useQuery(['sports'], () => sportsQuery(), {
        onSuccess: (data) => {
            setSports(data);
        }
    });
    useEffect(() => {
        fetchNews(getInterestedSports(user.prefs)).then(result => {
            if (result)
                setNews(result);
        });
    }, [] );

    if (!props || sportsResult.isLoading) {
        return (
            <div className='content'>
                <div className='dashboard'>
                    {}
                    <p className='nomargin'>Loading...</p>
                </div>
            </div>
        );
    } else if (!user) {
        return (
            <div className='content'>
                <div className='dashboard'>
                    <p className='nomargin'>Loading user...</p>
                </div>
            </div>
        );
    } else if (!user.prefs) {
        return (
            <div className='content'>
                <div className='dashboard'>
                    <p className='nomargin'>Loading prefs...</p>
                </div>
            </div>
        );
    }
    const all_items = default_items(user.prefs, sports).concat(article_items(user.prefs, news));
    return (
        <div className='content'>
            <div className='dashboard'>
                {partitionItems(all_items)}
            </div>
        </div>
    );
}