import { getTeamLogo, playersQuery, standingsQuery } from "./SportHandler";
import { useQuery } from "react-query";
import {useContext, useState} from "react";
import { loading, suffix } from "../../util/Util";
import {ThemeContext} from "../../App";

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
  const [players, setPlayers] = useState([]);
  const pq = useQuery(["players", "NBA"], () => playersQuery("NBA"), {
    onSuccess: (data) => setPlayers(data),
  });
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
  const api_code = stat["api_code"];
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
      <p style={{ fontWeight: "bold", textDecoration: "underline" }}>Roster</p>
      <div className="expanded-team-overview-players">
        {players
          .filter((p) => p["teamId"] === api_code)
          .map((p) => (
            <div className="overview-player" style={{ backgroundColor: theme.accent }}>
              {silhouette(league, stat["city"], stat["name"])}
              {p["firstName"]} {p["lastName"]}
              <div className="overview-player-position" style={{ color: theme.border }}>
                {p["teamSitesOnly"]["posFull"]}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
