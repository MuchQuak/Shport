import './style/GameSchedule.css';
import NBAGame from "./NBAGame";
import Tabbed from "./Tabbed";
import {all_prefs, getSportsFollowed} from "./PrefHandler";
import {useEffect, useState} from "react";
import {fetchTodayNBAGames, fetchTomorrowNBAGames, fetchYesterdayNBAGames} from "./SportHandler";

export default function Schedule(props) {
    const [todayNBAGames, setTodayNBAGames] = useState([]);
    const [yesterdayNBAGames, setYesterdayNBAGames] = useState([]);
    const [tomorrowNBAGames, setTomorrowNBAGames] = useState([]);

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
    }, [] );

    if (!props || !props.prefs || !props.sports || !props.stats) {
        return null;
    }

    const noGames = (
        <p className='game-empty nomargin'>No Games</p>
    );
    function games(day) {
        if (day.length < 1) {
            return noGames;
        }
        return day.map((game, index) => {
            return (<NBAGame game={game} key={index} stats={props.stats} />);
        });
    }
    const sports = props.sports.map((sport) => {
        return sport["sport"];
    });
    const leaguesFollowed = getSportsFollowed(all_prefs); // should be replaced with user's prefs when those are fixed...
    // const teamsFollowed = getTeamsFollowedForSport(all_prefs, 'NBA'); // This check will go inside individual game code instead...
    // Code below is not dynamic yet, but leaguesFollowed will need to be map()ed to provide each page.
    return (
        <Tabbed titles={leaguesFollowed} default={0}>
            <Tabbed titles={['Yesterday', 'Today', 'Tomorrow']} default={1}>
                <div className='schedule'>{games(yesterdayNBAGames)}</div>
                <div className='schedule'>{games(todayNBAGames)}</div>
                <div className='schedule'>{games(tomorrowNBAGames)}</div>
            </Tabbed>
            <p className='nomargin'>NFL</p>
            <p className='nomargin'>NHL</p>
            <p className='nomargin'>MLB</p>
        </Tabbed>
    );
}