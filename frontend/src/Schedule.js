import './style/GameSchedule.css';
import Tabbed from "./Tabbed";
import {getInterestedSports} from "./PrefHandler";
import {useEffect, useState} from "react";
import {
    fetchNBAGames,
    fetchNHLGames,
    getLeagueLogo
} from "./SportHandler";
import Game from "./Game";

export default function Schedule(props) {
    const [todayNBAGames, setTodayNBAGames] = useState([]);
    const [yesterdayNBAGames, setYesterdayNBAGames] = useState([]);
    const [tomorrowNBAGames, setTomorrowNBAGames] = useState([]);
    const [todayNHLGames, setTodayNHLGames] = useState([]);
    const [yesterdayNHLGames, setYesterdayNHLGames] = useState([]);
    const [tomorrowNHLGames, setTomorrowNHLGames] = useState([]);

    useEffect(() => {
        fetchNBAGames(0).then(result => {
            if (result)
                setTodayNBAGames(result);
        });
        fetchNBAGames(-1).then(result => {
            if (result)
                setYesterdayNBAGames(result);
        });
        fetchNBAGames(1).then(result => {
            if (result)
                setTomorrowNBAGames(result);
        });
        fetchNHLGames(0).then(result => {
            if (result)
                setTodayNHLGames(result);
        });
        fetchNHLGames(-1).then(result => {
            if (result)
                setYesterdayNHLGames(result);
        });
        fetchNHLGames(1).then(result => {
            if (result)
                setTomorrowNHLGames(result);
        });
    }, [todayNBAGames, todayNHLGames] );

    if (!props || !props.prefs || !props.sports) {
        return null;
    }

    const noGames = (
        <p className='nomargin bold'>No Games</p>
    );
    function Games(gameData, league) {
        if (gameData.length < 1) {
            return noGames;
        }
        return gameData.map((game, index) => {
            return (<Game game={game} key={index} sports={props.sports} prefs={props.prefs} league={league} />);
        });
    }
    const leaguesFollowed = getInterestedSports(props.prefs);
    const tabs = leaguesFollowed.map((league, index) => {
        if (league === "NBA") {
            return (
                <Tabbed titles={['Yesterday', 'Today', 'Tomorrow']} default={1} key={index}>
                    <div className='schedule' key={index}>{Games(yesterdayNBAGames, "NBA")}</div>
                    <div className='schedule' key={index}>{Games(todayNBAGames, "NBA")}</div>
                    <div className='schedule' key={index}>{Games(tomorrowNBAGames, "NBA")}</div>
                </Tabbed>
            )
        } else if (league === "NHL") {
            return (
                <Tabbed titles={['Yesterday', 'Today', 'Tomorrow']} default={1} key={index}>
                    <div className='schedule' key={index}>{Games(yesterdayNHLGames, "NHL")}</div>
                    <div className='schedule' key={index}>{Games(todayNHLGames, "NHL")}</div>
                    <div className='schedule' key={index}>{Games(tomorrowNHLGames, "NHL")}</div>
                </Tabbed>
            )
        }
        return <p className='nomargin' key={index}>No {league} content.</p>;
    });
    const icons = leaguesFollowed.map((league, index) => {
        return getLeagueLogo(String(league));
    });
    return (
        <Tabbed titles={leaguesFollowed} icons={icons} default={0}>
            {tabs}
        </Tabbed>
    );
}