import '../../style/game-schedule.scss';
import Tabbed from "../Tabbed";
import {getInterestedSports, getPreferredSportIndex} from "../../settings/PrefHandler";
import {capitalizeFirstLetter, getLeagueLogo, informativeGamesQuery} from "./SportHandler";
import Game from "./Game";
import {allQueriesSuccessful, cartesian, loading} from "../../util/Util";
import {useQueries} from "react-query";

const noGames = <p className='nomargin bold'>No games.</p>;

function Games(gameData, league, props) {
    if (gameData.length < 1) {
        return noGames;
    }
    return gameData.map((game, index) => {
        return (<Game game={game} key={index} sports={props.sports} prefs={props.prefs} league={league} />);
    });
}

function getTabIndex(tabNames, preferred) {
    if (tabNames.length <= 2) {
        return 0;
    }
    if (tabNames.includes(preferred)) {
        return tabNames.indexOf(preferred);
    }
    return 1;
}

function tab(games, props, league, index) {
    const dates = games.filter(g => g.sport === league);
    if (games.length > 0 && dates.length > 0) {
        const dayNames = dates.map(d => d.dayName);
        return (
            <Tabbed titles={dayNames.map(capitalizeFirstLetter)} default={getTabIndex(dayNames, "Today")} key={index}>
                {dayNames.map(d =>
                    <div className='schedule' key={d}>
                        {Games(dates.find(e => e.dayName === d).data, league, props)}
                    </div>
                )}
            </Tabbed>
        );
    }
    return <p className='nomargin' key={index}>No {league} content.</p>;
}

export default function Schedule(props) {
    const leagues = ["NBA", "NHL"];
    const days = [{"Yesterday": -1}, {"Today": 0}, {"Tomorrow": 1}];
    const gamesQuery = useQueries(cartesian(leagues, days).map((pair) => {
        const league = pair[0];
        const dayInfo = pair[1];
        const dayName = Object.keys(dayInfo)[0]; // Object has a single entry
        const dayOffset = dayInfo[dayName];
        return {
            queryKey: [league, dayOffset],
            queryFn: () => informativeGamesQuery(league, dayOffset, dayName)
        }
    }));
    if (!allQueriesSuccessful(gamesQuery) || !props || !props.prefs || !props.sports) {
        return loading;
    }
    const leaguesFollowed = getInterestedSports(props.prefs);
    if (leaguesFollowed.length === 0) {
        return <p className='nomargin bold'>No leagues followed.</p>;
    }
    return (
        <Tabbed titles={leaguesFollowed}
                icons={leaguesFollowed.map(league => getLeagueLogo(league))}
                default={getPreferredSportIndex(props.prefs, leaguesFollowed)}>
            {leaguesFollowed.map((league, idx) => tab(gamesQuery.map(g => g.data), props, league, idx))}
        </Tabbed>
    );
}