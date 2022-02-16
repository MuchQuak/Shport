import './style/GameSchedule.css';
import NBAGame from "./NBAGame";
import NHLGame from "./NHLGame";
import Tabbed from "./Tabbed";
import {all_prefs, getSportsFollowed} from "./PrefHandler";
import {useEffect, useState} from "react";
import {fetchTodayNBAGames, fetchTomorrowNBAGames, fetchYesterdayNBAGames, fetchTodayNHLGames} from "./SportHandler";

export default function Schedule(props) {
    const [todayNBAGames, setTodayNBAGames] = useState([]);
    const [yesterdayNBAGames, setYesterdayNBAGames] = useState([]);
    const [tomorrowNBAGames, setTomorrowNBAGames] = useState([]);
    const [todayNHLGames, setTodayNHLGames] = useState([]);

    useEffect(() => {
        fetchTodayNBAGames().then(result => {
            if (result)
                setTodayNBAGames(result);
        });
        fetchYesterdayNBAGames().then(result => {
            if (result)
                setYesterdayNBAGames(result);
        });
        fetchTomorrowNBAGames().then(result => {
            if (result)
                setTomorrowNBAGames(result);
        });
        fetchTodayNHLGames().then(result => {
            if (result)
                setTodayNHLGames(result);
        });
    }, [] );

    if (!props || !props.prefs || !props.sports || !props.stats) {
        return null;
    }

    const noGames = (
        <p className='game-empty nomargin'>No Games</p>
    );
    function NBAGames(day) {
        if (day.length < 1) {
            return noGames;
        }
        return day.map((game, index) => {
            return (<NBAGame game={game} key={index} stats={props.stats} />);
        });
    }
    function NHLGames(day) {
        if (day.length < 1) {
            return noGames;
        }
        return day.map((game, index) => {
            return (<NHLGame game={game} key={index} />);
        });
    }
    const sports = props.sports.map((sport) => {
        return sport["sport"];
    });
    const leaguesFollowed = getSportsFollowed(all_prefs); // should be replaced with user's prefs when those are fixed...
    // const teamsFollowed = getTeamsFollowedForSport(all_prefs, 'NBA'); // This check will go inside individual game code instead...
    // Code below is not dynamic yet, but leaguesFollowed will need to be map()ed to provide each page.
    const tabs = leaguesFollowed.map((league, index) => {
        if (league === "NBA") {
            return (
                <Tabbed titles={['Yesterday', 'Today', 'Tomorrow']} default={1} key={index}>
                    <div className='schedule'>{NBAGames(yesterdayNBAGames)}</div>
                    <div className='schedule'>{NBAGames(todayNBAGames)}</div>
                    <div className='schedule'>{NBAGames(tomorrowNBAGames)}</div>
                </Tabbed>
            )
        } else if (league === "NHL") {
            return (
                <Tabbed titles={['Yesterday', 'Today', 'Tomorrow']} default={1} key={index}>
                    <div className='schedule'>{NHLGames(todayNHLGames)}</div>
                    <div className='schedule'>{NHLGames(todayNHLGames)}</div>
                    <div className='schedule'>{NHLGames(todayNHLGames)}</div>
                </Tabbed>
            )
        }
        return <p className='nomargin' key={index}>No {league} content.</p>;
    });
    return (
        <Tabbed titles={leaguesFollowed} default={0}>
            {tabs}
        </Tabbed>
    );
}