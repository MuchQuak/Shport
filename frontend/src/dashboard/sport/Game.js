import "../../style/game-schedule.scss";
import { getTeamLogo, UTCtoLocal, getFullName } from "./SportHandler";
import { useContext } from "react";
import { ThemeContext } from "../../App";

function stream(league, homeFullName, awayFullName) {
  return "https://www.streameast.xyz/" + league.toLowerCase() + "/" +
      homeFullName.toLowerCase().replaceAll(" ", "-") + "-" +
      awayFullName.toLowerCase().replaceAll(" ", "-") + "-4/";
}

function score(game, score_info) {
  if (score_info === "" || game.status < 1) {
    return null;
  }
  return <p className="score">{score_info}</p>;
}

function getTeamName(homeOrAway, game, league, sports) {
  if (homeOrAway === "home" && game.home !== "") {
    return game.home;
  }
  if (homeOrAway === "away" && game.away !== "") {
    return game.away;
  }
  const teamCode = String(
    homeOrAway === "away" ? game.away_code : game.home_code
  );
  let fullName;
  try {
    fullName = getFullName(teamCode, league, sports);
  } catch (error) {
    fullName = teamCode;
  }
  return fullName;
}

export default function Game(props) {
  const { theme } = useContext(ThemeContext);
  if (!props || !props.game || !props.sports || !props.prefs) {
    return null;
  }
  const league = props.league ? props.league : "none";
  const game = props.game;
  const clock_data = String(game.clock).trim();
  //if (!props.sports[league] || !props.sports[league].teams.includes(game.home_code) || !props.sports[league].teams.includes(game.away_code)) {
  //    return null;
  //}
  function is_break() {
    return (
      game.status === 1 &&
      (game.break || (clock_data === "" && game.currentQtr === 2))
    );
  }
  function clock() {
    if (game.status === 2) {
      return <p className="nomargin">Final Score</p>;
    }
    if (is_break()) {
      return (
        <p className="nomargin" style={{ fontWeight: "bold" }}>
          {game.break_string}
        </p>
      );
    }
    if (clock_data === "" || game.status === 0) {
      return (
        <p className="nomargin">{UTCtoLocal(game.startTimeUTC, league)}</p>
      );
    }
    return (
      <>
        <p className="nomargin bold">{clock_data}</p>
        <p className="nomargin bold">
          {game.currentQtr} of {game.maxQtr}
        </p>
      </>
    );
  }
  function classes(current_code) {
    let classN = "game-team-name";
    if (!props.prefs || !props.prefs.sports) {
      return classN;
    }
    if (
      props.prefs.sports.hasOwnProperty(league) &&
      props.prefs.sports[league].hasOwnProperty("teams") &&
      props.prefs.sports[league].teams.includes(String(current_code))
    ) {
      classN = classN + " favorite";
    }
    return classN;
  }
  const numInSeries = game.numInSeries ? game.numInSeries : 0;
  const homePlayoffs = game.homePlayoffs ? game.homePlayoffs : false;
  const awayPlayoffs = game.awayPlayoffs ? game.awayPlayoffs : false;
  function winIcon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-check-circle-fill"
        viewBox="0 0 16 16"
      >
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
      </svg>
    );
  };
  const homeFullName = getTeamName("home", game, league, props.sports);
  const awayFullName = getTeamName("away", game, league, props.sports);
  return (
    <div
      className="game"
      style={{
        backgroundColor: theme.base,
        boxShadow: "0px 2px " + theme.border,
      }}
    >
      <div className="game-left">
        <div className="game-playoffs-wrapper">
          {getTeamLogo(league, game.home_code, "schedule-logo-container")}
          {homePlayoffs && (
            <p className="game-playoffs-record">{homePlayoffs}</p>
          )}
        </div>
        <p className={classes(game.home_code)}>
          {homeFullName}
        </p>
        <div className="score-win-icon">
          {score(game, game.home_score)}
          {parseInt(game.home_score) > parseInt(game.away_score) &&
            parseInt(game.status) === 2 &&
            winIcon()}
        </div>
      </div>
      <div className="game-center">
        {clock()}
        {numInSeries > 0 && <p className="game-series">Game {numInSeries}</p>}
        <p className="game-footer">
          {game.arena}
          {game.status < 2 &&
            <a href={stream(league, homeFullName, awayFullName)} className="stream" >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-play"
                   viewBox="0 0 16 16">
                <path
                    d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"/>
              </svg>
              <p className="nomargin">Stream</p>
            </a>}
        </p>
      </div>
      <div className="game-right">
        <div className="game-playoffs-wrapper">
          {awayPlayoffs && (
            <p className="game-playoffs-record">{awayPlayoffs}</p>
          )}
          {getTeamLogo(league, game.away_code, "schedule-logo-container")}
        </div>
        <p className={classes(game.away_code)}>
          {awayFullName}
        </p>
        <div className="score-win-icon">
          {parseInt(game.away_score) > parseInt(game.home_score) &&
            parseInt(game.status) === 2 &&
            winIcon()}
          {score(game, game.away_score)}
        </div>
      </div>
    </div>
  );
}
