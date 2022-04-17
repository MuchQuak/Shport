import { getTeamLogo, playersQuery, standingsQuery } from "./SportHandler";
import { useQuery } from "react-query";
import { useState } from "react";
import { loading, suffix } from "../../util/Util";

export function TeamOverviewExpanded(props) {
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
          <p className="nomargin">
            {name}
          </p>
          <p className="nomargin">
            {rank}
          </p>
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
            <div className="overview-player">
              {p["firstName"]} {p["lastName"]}
              <div className="overview-player-position">
                {p["teamSitesOnly"]["posFull"]}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
