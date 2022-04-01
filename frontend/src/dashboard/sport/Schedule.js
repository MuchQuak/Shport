import '../../style/game-schedule.scss';
import Tabbed from "../Tabbed";
import {getInterestedSports, getPreferredSportIndex} from "../../settings/PrefHandler";
import {useState} from "react";
import {
    capitalizeFirstLetter,
    gamesQuery,
    getLeagueLogo
} from "./SportHandler";
import Game from "./Game";
import {useQuery} from "react-query";

export default function Schedule(props) {
    const [games, setGames] = useState({"NBA": {}, "NHL": {}});
    const nbaToday = useQuery(['NBAGamesToday', "NBA", 0], () => gamesQuery("NBA", 0), {
        onSuccess: (data) => {
            const temp = { ...games };
            temp["NBA"]["today"] = data;
            setGames(temp);
        }
    });
    const nbaYesterday = useQuery(['NBAGamesYesterday', "NBA", -1], () => gamesQuery("NBA", -1), {
        onSuccess: (data) => {
            const temp = { ...games };
            temp["NBA"]["yesterday"] = data;
            setGames(temp);
        }
    });
    const nbaTomorrow = useQuery(['NBAGamesTomorrow', "NBA", 1], () => gamesQuery("NBA", 1), {
        onSuccess: (data) => {
            const temp = { ...games };
            temp["NBA"]["tomorrow"] = data;
            setGames(temp);
        }
    });
    const nhlToday = useQuery(['NHLGamesToday', "NHL", 0], () => gamesQuery("NHL", 0), {
        onSuccess: (data) => {
            const temp = { ...games };
            temp["NHL"]["today"] = data;
            setGames(temp);
        }
    });
    const nhlYesterday = useQuery(['NHLGamesYesterday', "NHL", -1], () => gamesQuery("NHL", -1), {
        onSuccess: (data) => {
            const temp = { ...games };
            temp["NHL"]["yesterday"] = data;
            setGames(temp);
        }
    });
    const nhlTomorrow = useQuery(['NHLGamesTomorrow', "NHL", 1], () => gamesQuery("NHL", 1), {
        onSuccess: (data) => {
            const temp = { ...games };
            temp["NHL"]["tomorrow"] = data;
            setGames(temp);
        }
    });
    if (nbaYesterday.isLoading || nbaToday.isLoading || nbaTomorrow.isLoading ||
        nhlYesterday.isLoading || nhlToday.isLoading || nhlTomorrow.isLoading ||
        !props || !props.prefs || !props.sports || !games) {
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
    if (leaguesFollowed.length === 0) {
        return <p className='nomargin bold'>No Leagues Followed</p>;
    }
    function getTabIndex(tabNames) {
        if (tabNames.length <= 2) {
            return 0;
        }
        if (tabNames.includes("today")) {
            return tabNames.indexOf("today");
        }
        return 1;
    }
    function tab(league, index){
        if (games.hasOwnProperty(league) && Object.keys(games[league]).length > 0) {
            const dates = ["yesterday", "today", "tomorrow"];
            const league_games = games[league];
            return (
                <Tabbed titles={dates.map(capitalizeFirstLetter)} default={getTabIndex(dates)} key={index}>
                    {dates.map((d, idx) => {
                        if (!(league_games.hasOwnProperty(d))) {
                            return null;
                        }
                        return <div className='schedule' key={idx}>{Games(league_games[d], league)}</div>
                    })}
                </Tabbed>
            );
        }
        return <p className='nomargin' key={index}>No {league} content.</p>;
    }
    const icons = leaguesFollowed.map((league) => {
        return getLeagueLogo(league);
    });
    return (
        <Tabbed titles={leaguesFollowed} icons={icons} default={getPreferredSportIndex(props.prefs, leaguesFollowed)}>
            {leaguesFollowed.map((league, idx) => {
                return tab(league, idx);
            })}
        </Tabbed>
    );
}