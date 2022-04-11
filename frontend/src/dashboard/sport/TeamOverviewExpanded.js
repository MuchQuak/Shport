import { getTeamLogo } from "./SportHandler";

export function TeamOverviewExpanded(props) {
  if (!props || !props.team || !props.league) {
    return <p className="nomargin">No team information</p>;
  }
  const team = props.team;
  const league = props.league;
  return (
    <div className="expanded-team-overview-info">
      <p>Expanded team information.</p>
      {getTeamLogo(league, team, "overview-logo")}
      <p>{team}</p>
    </div>
  );
}
