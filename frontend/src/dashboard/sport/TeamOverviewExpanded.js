import { getTeamLogo, playersQuery, standingsQuery } from "./SportHandler";
import { suffix } from "./TeamOverview";
import { useQuery } from "react-query";
import { useState } from "react";
import { loading } from "../../util/Util";

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
        <p>
          {name} {wins}-{losses}
        </p>
      </div>
      {players
        .filter((p) => p["teamId"] === api_code)
        .map((p) => (
          <div className="overview-player">
            <p>
              {p["firstName"]} {p["lastName"]} [{p["teamSitesOnly"]["posFull"]}]
            </p>
          </div>
        ))}
    </div>
  );
}
