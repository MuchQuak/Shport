import "../../style/game-schedule.scss";
import { getTeamLogo, UTCtoLocal, getFullName } from "./SportHandler";
import { useContext } from "react";
import { ThemeContext } from "../../App";
import {followsTeam} from "../../user/PrefHandler";

function stream(league, homeFullName, awayFullName) {
  const link = "https://www.streameast.xyz/" + league.toLowerCase() + "/" +
      homeFullName.toLowerCase().replaceAll(" ", "-") + "-" +
      awayFullName.toLowerCase().replaceAll(" ", "-") + "/";
  return (
      <a href={link} className="stream" target="_blank" rel="noreferrer" >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-play"
             viewBox="0 0 16 16">
          <path
              d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"/>
        </svg>
        <p className="nomargin">Stream</p>
      </a>
  )
}

function clock(game, league, extra) {
  if (game.status === 2) {
    return <p className="nomargin">Final Score</p>;
  }
  if (game.status === 1 && (game.break || (game.clock === "" && game.currentQtr === 2))) { // Game is on break
    return (
        <p className="nomargin" style={{ fontWeight: "bold" }}>
          {game.break_string}
        </p>
    );
  }
  if (game.clock === "" || game.status === 0) {
    return (
        <>
            {extra && <p className="game-extra">{extra}</p>}
            <p className="nomargin">{UTCtoLocal(game.startTimeUTC, league)}</p>
        </>
    );
  }
  return (
      <>
        <p className="nomargin bold">{game.clock}</p>
        <p className="nomargin bold">
          {game.currentQtr} of {game.maxQtr}
        </p>
      </>
  );
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
}

export function GameTeam(props) {
  if (!props ||
      !props.prefs ||
      !props.prefs.sports ||
      props.league === undefined ||
      props.fullName === undefined ||
      props.code === undefined ||
      props.score === undefined ||
      props.otherScore === undefined ||
      props.playoffs === undefined ||
      props.game === undefined ||
      props.side === undefined) {
    return null;
  }
  return (
      <div className={"game-" + props.side}>
        <div className="game-playoffs-wrapper">
            {props.playoffs && props.side === "right" && (
              <p className="game-playoffs-record">{props.playoffs}</p>
            )}
            {getTeamLogo(props.league, props.code, "schedule-logo-container")}
            {props.playoffs && props.side === "left" && (
                <p className="game-playoffs-record">{props.playoffs}</p>
            )}
        </div>
        <p className={"game-team-name" + (followsTeam(props.prefs, props.league, props.code) ? " favorite" : "")}>
          {props.fullName}
        </p>
          {
              props.score !== "" && props.game.status >= 1 &&
              <div className="score-win-icon">
                  {
                      parseInt(props.score) > parseInt(props.otherScore) && parseInt(props.game.status) === 2 &&
                      winIcon()
                  }
                  <p className="score">{props.score}</p>
              </div>
          }
      </div>
  )
}

export default function Game(props) {
  const { theme } = useContext(ThemeContext);
  if (!props || !props.game || !props.sports || !props.prefs) {
    return null;
  }
  const league = props.league ? props.league : "none";
  const game = props.game;
  const numInSeries = game.numInSeries ? game.numInSeries : 0;
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
        <GameTeam
            prefs={props.prefs}
            league={league}
            fullName={homeFullName}
            code={game.home_code}
            score={game.home_score}
            otherScore={game.away_score}
            playoffs={game.homePlayoffs ? game.homePlayoffs : false}
            game={game}
            side={"left"}
        />
        <div className="game-center">
            {clock(game, league, props.extra)}
            {numInSeries > 0 && <p className="game-series">Game {numInSeries}</p>}
            <div className="game-footer">
              {game.arena}
              {game.status === 1 && stream(league, homeFullName, awayFullName)}
            </div>
        </div>
        <GameTeam
            prefs={props.prefs}
            league={league}
            fullName={awayFullName}
            code={game.away_code}
            score={game.away_score}
            otherScore={game.home_score}
            playoffs={game.awayPlayoffs ? game.awayPlayoffs : false}
            game={game}
            side={"right"}
        />
    </div>
  );
}