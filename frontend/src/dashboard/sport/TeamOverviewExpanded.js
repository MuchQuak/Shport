import { getTeamLogo, playersQuery, injuriesQuery, transactionsQuery, topPlayersQuery } from "./SportHandler";
import { useQuery } from "react-query";
import { useContext } from "react";
import { loading, suffix } from "../../util/Util";
import { ThemeContext } from "../../App";
import Tabbed from "../Tabbed";

export function TeamOverviewExpanded(props) {
  const { theme } = useContext(ThemeContext);
  const pq = useQuery(["players", props.league, props.espn], () => playersQuery(props.league, props.espn), { refetchOnWindowFocus: false, refetchOnmount: false, refetchOnReconnect: false});
  const pi = useQuery(["injuries",props.league, props.espn], () => injuriesQuery(props.league, props.espn), { refetchOnWindowFocus: false, refetchOnmount: false, refetchOnReconnect: false});
  const pt = useQuery(["transactions",props.league, props.espn], () => transactionsQuery(props.league, props.espn), { refetchOnWindowFocus: false, refetchOnmount: false, refetchOnReconnect: false});
  const ptp = useQuery(["topPlayers",props.league, props.espn], () => topPlayersQuery(props.league, props.espn), { refetchOnWindowFocus: false, refetchOnmount: false, refetchOnReconnect: false});

  if (pq.isLoading || pi.isLoading || pt.isLoading || ptp.isLoading) {
    return loading;
  }
  if (!props || !props.team || !props.league ||!props.espn) {
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
      <Tabbed titles={["Roster", "Injuries", "Top Players", "Transactions"]} default={0}>
        {[<div className="expanded-team-overview-players">
          {pq.data.length === 0 &&
          <div className="overview-player" style={{ backgroundColor: theme.accent }} key={0}>No players.</div>}
          {pq.data.sort((a, b) => (a.name > b.name) ? 1 : -1)
            .map((p, index) => (
              <div
                className="overview-player"
                style={{ backgroundColor: theme.accent }}
                key={index}
              >
                <div className="overview-player-info" style={{ color: theme.accent }}>{p["number"]}</div>
                {p["name"]}
                {
                  p["position"] !== undefined &&
                  <div className="overview-player-info" style={{color: theme.accent}}>{p["position"]}</div>
                }
              </div>
            ))}</div>,
          <div className="expanded-team-overview-players">
            {pi.data.length === 0 &&
            <div className="overview-player" style={{ backgroundColor: theme.accent }} key={0}>No injuries.</div>}
            {pi.data.sort((a, b) => (a.name > b.name) ? 1 : -1)
              .map((p, index) => (
                <div
                  className="overview-player"
                  style={{ backgroundColor: theme.accent }}
                  key={index}
                >
                  {p["name"]}
                  {
                    p["position"] !== undefined &&
                    <div className="overview-player-info" style={{ color: theme.accent }}>{p["position"]}</div>
                  }
                  <div className="overview-player-info" style={{ color: theme.accent }}>{p["status"]}</div>
                </div>
              ))}</div>,
          <div className="expanded-team-overview-players">
            {ptp.data.length === 0 &&
            <div className="overview-player" style={{ backgroundColor: theme.accent }} key={0}>No top players.</div>}
            {ptp.data.sort((a, b) => (a.name > b.name) ? 1 : -1)
              .map((p, index) => (
                <div
                  className="overview-player"
                  style={{ backgroundColor: theme.accent }}
                  key={index}
                >
                  {p["name"]}
                  {
                    p["position"] !== undefined &&
                    <div className="overview-player-info" style={{ color: theme.accent }}>{p["position"]}</div>
                  }
                  <div className="overview-player-info" style={{ color: theme.accent }}>{p["value"]} {p["category"]}</div>
                </div>
              ))}</div>,
          <div className="expanded-team-overview-players">
            {pt.data.length === 0 &&
            <div className="overview-player" style={{ backgroundColor: theme.accent }} key={0}>No transactions.</div>}
            {pt.data.sort((a, b) => (a.name > b.name) ? 1 : -1)
              .map((p, index) => (
                <div
                  className="overview-player"
                  style={{ backgroundColor: theme.accent }}
                  key={index}
                >
                  <div className="overview-player-info" style={{ color: theme.accent }}>{p["date"]}</div>
                  {p["description"]}
                </div>
              ))}</div>
        ]}
      </Tabbed>
    </div>
  );
}