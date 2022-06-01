import { getTeamLogo, playersQuery, injuriesQuery, transactionsQuery, topPlayersQuery, headlinesQuery} from "./SportHandler";
import { useQuery } from "react-query";
import { useContext } from "react";
import { loading, suffix } from "../../util/Util";
import { ThemeContext } from "../../App";
import Tabbed from "../Tabbed";

export function TeamOverviewExpanded(props) {
  const team = props.team;
  const stat = props.stats[team];
  const rank = suffix(stat["rank"]);
  const wins = stat["wins"];
  const losses = stat["losses"];
  const league = props.league;
  const name = stat["city"] + " " + stat["name"];

  const { theme } = useContext(ThemeContext);
  const pq = useQuery(["players", props.league, props.espn], () => playersQuery(league, props.espn), { refetchOnWindowFocus: false, refetchOnmount: false, refetchOnReconnect: false});
  const pi = useQuery(["injuries",props.league, props.espn], () => injuriesQuery(league, props.espn), { refetchOnWindowFocus: false, refetchOnmount: false, refetchOnReconnect: false});
  const pt = useQuery(["transactions",props.league, props.espn], () => transactionsQuery(league, props.espn), { refetchOnWindowFocus: false, refetchOnmount: false, refetchOnReconnect: false});
  const ptp = useQuery(["topPlayers",props.league, props.espn], () => topPlayersQuery(league, props.espn), { refetchOnWindowFocus: false, refetchOnmount: false, refetchOnReconnect: false});
  const ph = useQuery(["headlines",props.league, props.espn], () => headlinesQuery(league, name), { refetchOnWindowFocus: false, refetchOnmount: false, refetchOnReconnect: false});

  if (!props || !props.team || !props.league ||!props.espn) {
    return <p className="nomargin">No team information</p>;
  }
  if (pq.isLoading || pi.isLoading || pt.isLoading || ptp.isLoading || ph.isLoading) {
    return loading;
  }
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
      <Tabbed titles={["Roster", "Injuries", "Top Players", "Transactions", "Headlines"]} default={0}>
        {[<div className="expanded-team-overview-players">
          {pq.data.length === 0 &&
          <div className="overview-player" style={{ backgroundColor: theme.accent }} key={0}>No players.</div>}
          {pq.data
            .map((p, index) => (
              <div
                className="overview-player"
                style={{ backgroundColor: theme.accent }}
                key={index}
              >
                {p["position"] !== undefined &&
                <div className="overview-player-pos" style={{ color: "lightgray" , fontWeight: "lighter"}}>{p["position"]}</div>}
                {p["name"]}
                <div className="overview-player-num" style={{ color: "lightgray", fontWeight: "lighter" }}>{p["number"]}</div>
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
                  {p["position"] !== undefined &&
                  <div className="overview-player-pos" style={{ color: "lightgray" , fontWeight: "lighter"}}>{p["position"]}</div>}
                  {p["name"]}
                  <div className="overview-player-status" style={{ color: "lightgray" }}>status: {p["status"]}</div>
                  <div className="overview-player-description" style={{ color: "lightgray", fontWeight: "lighter"}}>{p["description"]}</div>
                </div>
              ))}</div>,
          <div className="expanded-team-overview-players">
            {ptp.data.length === 0 &&
            <div className="overview-player" style={{ backgroundColor: theme.accent }} key={0}>No top players.</div>}
            {ptp.data
              .map((p, index) => (
                <div
                  className="overview-player"
                  style={{ backgroundColor: theme.accent }}
                  key={index}
                >
                  {p["position"] !== undefined &&
                  <div className="overview-player-pos" style={{ color: "lightgray" , fontWeight: "lighter"}}>{p["position"]}</div>}
                  {p["name"]}
                  <div className="overview-player-value" style={{ color: "lightgray" }}>{p["value"]}</div>
                  <div className="overview-player-category" style={{ color: "lightgray" , fontWeight: "lighter"}}>{p["category"]}</div>
                </div>
              ))}</div>,
          <div className="expanded-team-overview-players">
            {pt.data.length === 0 &&
            <div className="overview-player" style={{ backgroundColor: theme.accent }} key={0}>No transactions.</div>}
            {pt.data
              .map((p, index) => (
                <div
                  className="overview-player"
                  style={{ backgroundColor: theme.accent }}
                  key={index}
                >
                  <div className="overview-player-date" style={{ color: "white" }}>{p["date"]}</div>
                  <div className="overview-player-description" style={{ color: "lightgray" , fontWeight: "lighter"}}>{p["description"]}</div>
                </div>
              ))}</div>,
          <div className="expanded-team-overview-players">
            {ph.data.length === 0 &&
            <div className="overview-player" style={{ backgroundColor: theme.accent }} key={0}>No transactions.</div>}
            {ph.data
              .map((p, index) => (
                <a href={p["url"]} target="_blank" rel="noreferrer" style={{ textDecorationLine: "none" }}>
                <div
                  className="overview-player"
                  style={{ backgroundColor: theme.accent }}
                  key={index}
                >
                  <p>
                  <div className="overview-player-date" style={{ color: "white" , float: "right" , fontSize: "large"}}>{p["title"]}<br/></div>
                  <div className="overview-player-description" style={{ color: "lightgray" , fontWeight: "lighter"}}>{p["timeElapsed"]}  ∙  {p["source"]}</div>
                  <br/><img srcSet={p["image"]} alt={p["title"]} style={{ float: "left"}} />
                  </p>
                </div>
                </a>
              ))}</div>
        ]}
      </Tabbed>
    </div>
  );
}