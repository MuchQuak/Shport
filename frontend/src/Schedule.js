import './style/GameSchedule.scss';
import Tabbed from "./Tabbed";
import {getInterestedSports, getPreferredSportIndex} from "./PrefHandler";
import {useEffect, useState} from "react";
import {
    capitalizeFirstLetter,
    fetchNBAGames,
    fetchNHLGames,
    getLeagueLogo
} from "./SportHandler";
import Game from "./Game";

export default function Schedule(props) {
    const [games, setGames] = useState({"NBA": {}, "NHL": {}});

    useEffect(() => {
        fetchNBAGames(0).then(result => {
            const temp = games;
            if (result)
                temp["NBA"]["today"] = result;
                setGames(temp);
        });
        fetchNBAGames(-1).then(result => {
            const temp = games;
            if (result)
                temp["NBA"]["yesterday"] = result;
                setGames(temp);
        });
        fetchNBAGames(1).then(result => {
            const temp = games;
            if (result)
                temp["NBA"]["tomorrow"] = result;
                setGames(temp);
        });
        fetchNHLGames(0).then(result => {
            const temp = games;
            if (result)
                temp["NHL"]["today"] = result;
                setGames(temp);
        });
        fetchNHLGames(-1).then(result => {
            const temp = games;
            if (result)
                temp["NHL"]["yesterday"] = result;
                setGames(temp);
        });
        fetchNHLGames(1).then(result => {
            const temp = games;
            if (result)
                temp["NHL"]["tomorrow"] = result;
                setGames(temp);
        });
    }, [games] );

    if (!props || !props.prefs || !props.sports || !games) {
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
    function getTabIndex(tabNames) {
        if (tabNames.length <= 2) {
            return 0;
        }
        if (tabNames.includes("today")) {
            return tabNames.indexOf("today");
        }
        return 1;
    }
    function tab(league){
        if (games.hasOwnProperty(league) && Object.keys(games[league]).length > 0) {
            const dates = ["yesterday", "today", "tomorrow"];
            const league_games = games[league];
            return (
                <Tabbed titles={dates.map((d) => {return capitalizeFirstLetter(d)})} default={getTabIndex(dates)}>
                    {dates.map((d) => {
                        if (!(league_games.hasOwnProperty(d))) {
                            return null;
                        }
                        return <div className='schedule'>{Games(league_games[d], league)}</div>
                    })}
                </Tabbed>
            );
        }
        return <p className='nomargin'>No {league} content.</p>;
    }
    const icons = leaguesFollowed.map((league) => {
        return getLeagueLogo(league);
    });
    return (
        <Tabbed titles={leaguesFollowed} icons={icons} default={getPreferredSportIndex(props.prefs, leaguesFollowed)}>
            {leaguesFollowed.map((league) => {
                return tab(league);
            })}
        </Tabbed>
    );
}