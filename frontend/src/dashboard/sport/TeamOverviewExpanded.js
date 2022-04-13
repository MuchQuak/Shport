import { getTeamLogo } from "./SportHandler";
import { suffix } from "./TeamOverview";

export function TeamOverviewExpanded(props) {
  if (!props || !props.team || !props.league) {
    return <p className="nomargin">No team information</p>;
  }
  const team = props.team;
  const stat = props.stats[team];
  const rank = suffix(stat["rank"]);
  const wins = stat["wins"];
  const losses = stat["losses"];
  const name = stat["city"] + " " + stat["name"];
  const league = props.league;
  return (
    <div className="expanded-team-overview-info">
      {getTeamLogo(league, team, "overview-logo")}
      <p>
        {name} {wins}-{losses}
      </p>
    </div>
  );
}
