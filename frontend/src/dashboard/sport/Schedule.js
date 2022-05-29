import "../../style/game-schedule.scss";
import Tabbed from "../Tabbed";
import {
  getAllTeamsFollowed,
  getInterestedSports,
  getPreferredSportIndex,
  followsEitherTeam
} from "../../user/PrefHandler";
import {
  dayName,
  favoriteIcon,
  getLeagueLogo,
  informativeGamesQuery,
} from "./SportHandler";
import Game from "./Game";
import {isOneLoading, cartesian, loading} from "../../util/Util";
import { useQueries } from "react-query";

const noGames = <p className="nomargin">No games.</p>;

function Games(games, props, leagueTab) {
  if (games.length > 0) { // At least one object containing a league's games for the day
    const allGames = games.map((g) => { // Each day of games
      const league = g.sport;
      return g.data // Actual array of games
          .filter((data) => { // If we are on the favorite tab, then ensure they follow a team
            return (leagueTab === favoriteIcon ? followsEitherTeam(props.prefs, props.sports, league, data.home_code, data.away_code) : true)
          })
          .map((game, index) =>
              <Game
                  game={game}
                  key={index}
                  sports={props.sports}
                  prefs={props.prefs}
                  league={league}
                  extra={leagueTab === favoriteIcon && g.dayName === "Tomorrow" ? "Tomorrow" : false}
              />
          );
    }).filter((g) => g.length > 0).flat();
    if (allGames.length > 0) {
      return allGames;
    }
  }
  return noGames;
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
  if (games !== undefined) {
      const gamesToSee = (league === favoriteIcon) ? games : games.filter((g) => g.sport === league);
      if (gamesToSee.length > 0 && gamesToSee.map((g) => g.data).flat().length > 0) { // Ensure that one day is available, and at least one game within
          if (league === favoriteIcon) {
              return (
                  <div className="schedule">
                      <p className="nomargin bold">Live & Upcoming</p>
                      {Games(gamesToSee
                          .filter((d) => d.dayName === "Today" || d.dayName === "Tomorrow")
                          .sort((a, b) => {
                              if (a.dayName === "Today" && b.dayName === "Tomorrow") {
                                  return -1
                              } else {
                                  return 0
                              }
                          }), props, league)}
                  </div>
              );
          } else {
              const dayNames = [...new Set(gamesToSee.filter((d) => d.data.length > 0).map((d) => d.dayName))];
              return (
                  <Tabbed
                      titles={dayNames}
                      default={getTabIndex(dayNames, "Today")}
                      key={index}
                  >
                      {dayNames.map((d) => (
                          <div className="schedule" key={d}>
                              {Games(gamesToSee.filter((g) => g.dayName === d && g.data.length > 0), props, league)}
                          </div>
                      ))}
                  </Tabbed>
              );
          }
      }
  }
  return (
    <p className="nomargin" key={index}>
      No {league} content.
    </p>
  );
}

export default function Schedule(props) {
  const leaguesFollowed = getInterestedSports(props.prefs);
  const gamesQuery = useQueries(
    cartesian(leaguesFollowed, [-1, 0 , 1]).map((pair) => {
      const league = pair[0];
      const dayOffset = pair[1];
      const dayNameStr = dayName(dayOffset);
      const qObj = {
        queryKey: [league, dayOffset],
        queryFn: () => informativeGamesQuery(league, dayOffset, dayNameStr),
      };
      if (dayOffset === 0) { // Only refetch information on today's games
        qObj.refetchInterval = 10000
      } else { // Do not refetch on yesterday or tomorrow's games
        qObj.refetchOnMount = false;
        qObj.refetchOnReconnect = false;
        qObj.refetchOnWindowFocus = false;
      }
      return qObj;
    })
  );
  if (isOneLoading(gamesQuery)) {
    return loading;
  }
  if (leaguesFollowed.length === 0) {
    return <p className="nomargin bold">No interested sports.</p>;
  }
  if (getAllTeamsFollowed(props.prefs, props.sports).length > 0) {
    leaguesFollowed.unshift(favoriteIcon);
  }
  return (
    <Tabbed
      titles={leaguesFollowed}
      icons={leaguesFollowed.map((league) => getLeagueLogo(league))}
      default={getPreferredSportIndex(props.prefs, leaguesFollowed)}
    >
      {leaguesFollowed.map((league, idx) =>
        tab(
          gamesQuery.map((g) => g.data),
          props,
          league,
          idx
        )
      )}
    </Tabbed>
  );
}
