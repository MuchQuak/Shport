import { getTeamLogo, playersQuery } from "./SportHandler";
import { useQuery } from "react-query";
import { useContext } from "react";
import { loading, suffix } from "../../util/Util";
import { ThemeContext } from "../../App";
import {StyleSheet} from "aphrodite";
import Tabbed from "../Tabbed";

function silhouette(league, city, name) {
  const source =
    "https://cdn.statmuse.com/img/" +
    league.toLowerCase() +
    "/teams/" +
    city.split(" ").join("-") +
    "-" +
    name.split(" ").join("-") +
    "-Silhouette.png";
  return (
    <div
      className="logo-container logo-container-sport"
      id={name + "-silhouette"}
    >
      <img className="logo" src={source} alt="logo" />
    </div>
  );
}

export function TeamOverviewExpanded(props) {
  const { theme } = useContext(ThemeContext);
  const pq = useQuery(["players", props.league, props.team], () => playersQuery(props.league, props.team));
  if (pq.isLoading) {
    return loading;
  }
  if (!props || !props.team || !props.league) {
    return <p className="nomargin">No team information</p>;
  }
  const team = props.team;
  const stat = props.stats[team];
  const rank = suffix(stat["rank"]);
  const wins = stat["wins"];
  const losses = stat["losses"];
  const name = stat["city"] + " " + stat["name"];
  //const api_code = stat["api_code"];
  const league = props.league;
  return (
    <div className="expanded-team-overview-info">
      <div className="expanded-team-overview-info-name">
        {getTeamLogo(league, team, "overview-logo")}
        <div className="expanded-team-overview-stats">
          <p className="nomargin">{name}</p>
          <p className="nomargin">{rank}</p>
          <p className="nomargin">
            {wins}-{losses}
          </p>
        </div>
      </div>
      <Tabbed titles={["Roster", "Injuries"]} default={0}>
        {[<div className="expanded-team-overview-players">
        {pq.data.sort((a, b) => (a.name > b.name) ? 1 : -1)
          .map((p, index) => (
            <div
              className="overview-player"
              style={{ backgroundColor: theme.accent }}
              key={index}
            >
              <div className="overview-player-position" style={{ color: theme.accent }}>{p["number"]}</div>
              {p["name"]}
              <div className="overview-player-position" style={{ color: theme.accent }}>{p["position"]}</div>
            </div>
          ))}</div>,
          <p>Injuries!</p>
        ]}
      </Tabbed>
    </div>
  );
}
