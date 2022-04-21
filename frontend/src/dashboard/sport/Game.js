import "../../style/game-schedule.scss";
import { getTeamLogo, UTCtoLocal, getFullName } from "./SportHandler";
import { useContext } from "react";
import { ThemeContext } from "../../App";

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
        <p>
          <b className="nomargin">{clock_data}</b>
        </p>
        <p className="nomargin bold">
          {game.currentQtr} of {game.maxQtr}
        </p>
      </>
    );
  }
  function classes(current_code, current, other) {
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
    if (parseInt(current) > parseInt(other) && parseInt(game.status) === 2) {
      classN = classN + " underline";
    }
    return classN;
  }
  const numInSeries = game.numInSeries ? game.numInSeries : 0;
  const homePlayoffs = game.homePlayoffs ? game.homePlayoffs : false;
  const awayPlayoffs = game.awayPlayoffs ? game.awayPlayoffs : false;
  return (
    <div
      className="game"
      style={{
        backgroundColor: theme.base,
        boxShadow: "0px 2px " + theme.border,
      }}
    >
      <div className="game-data">
        <div className="game-left">
          <div className="game-playoffs-wrapper">
            {getTeamLogo(league, game.home_code, "schedule-logo-container")}
            {homePlayoffs && (
              <p className="game-playoffs-record">{homePlayoffs}</p>
            )}
          </div>
          <p
            className={classes(
              game.home_code,
              game.home_score,
              game.away_score
            )}
          >
            {getTeamName("home", game, league, props.sports)}
          </p>
          {score(game, game.home_score)}
        </div>
        <div className="game-center">
          {clock()}
          {numInSeries > 0 && <p className="game-series">Game {numInSeries}</p>}
          <p className="game-footer">{game.arena}</p>
        </div>
        <div className="game-right">
          <div className="game-playoffs-wrapper">
            {awayPlayoffs && (
              <p className="game-playoffs-record">{awayPlayoffs}</p>
            )}
            {getTeamLogo(league, game.away_code, "schedule-logo-container")}
          </div>
          <p
            className={classes(
              game.away_code,
              game.away_score,
              game.home_score
            )}
          >
            {getTeamName("away", game, league, props.sports)}
          </p>
          {score(game, game.away_score)}
        </div>
      </div>
    </div>
  );
}
