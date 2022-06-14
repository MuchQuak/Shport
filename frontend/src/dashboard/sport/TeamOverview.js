import "../../style/overview.scss";
import { getAllTeamsFollowed } from "../../user/PrefHandler";
import {
  capitalizeFirstLetter,
  getLeagueLogo,
  getTeamLogo,
  standingsQuery,
} from "./SportHandler";
import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import Modal from "react-modal";
import CloseButton from "react-bootstrap/CloseButton";
import { TeamOverviewExpanded } from "./TeamOverviewExpanded";
import { loading, suffix } from "../../util/Util";
import { ThemeContext } from "../../App";
import {isMobile} from "react-device-detect";
import { modalStyle } from "../../login-signup/SignUp";

function Overview(props) {
  const { theme } = useContext(ThemeContext);
  const [isAlertVisible, setAlertVisible] = useState(false);
  const standings = props.standings;
  const team = props.team;
  const stats = standings[team.sport];
  const code = String(team.code).trim().toUpperCase();
  const espn = String(team.espn).trim().toUpperCase();

  Modal.setAppElement("#root");
  if (standings && stats && stats.hasOwnProperty(code)) {
    const stat = stats[code];
    const rank = suffix(stat["rank"]);
    const wins = stat["wins"];
    const losses = stat["losses"];
    const name = stat["city"] + " " + stat["name"];
    const conference = capitalizeFirstLetter(stat["conference"]);
    return (
      <>
        <Modal
          isOpen={isAlertVisible}
          onRequestClose={() => setAlertVisible(false)}
          style={modalStyle}
          contentLabel="alert"
        >
          <div
            className="dialog"
            id="expanded-team-overview"
            style={{ border: "2px solid " + theme.border }}
          >
            <div
              className="dialog-header"
              id="expanded-team-overview-header"
              style={{ backgroundColor: theme.base }}
            >
              <div className="leftSpace" />
              <div className="middleSpace">
                <p>Team Overview</p>
              </div>
              <div className="rightSpace">
                <CloseButton
                  className="closeButton"
                  variant="white"
                  aria-label="Hide"
                  onClick={() => setAlertVisible(false)}
                />
              </div>
            </div>
            <div className="dialog-body">
              <TeamOverviewExpanded
                team={code}
                espn={espn}
                league={team.sport}
                stats={stats}
              />
            </div>
          </div>
        </Modal>
        <div
          className="overview"
          onClick={() => setAlertVisible(true)}
          style={{
            backgroundColor: theme.base,
            boxShadow: "0px 2px " + theme.border,
          }}
        >
          {getTeamLogo(team.sport, code, isMobile ? "overview-logo-mobile" : "overview-logo")}
          <div className="overview-header">
            <div className={"noselect " + (isMobile ? "overview-team-name-mobile" : "overview-team-name")}>
              {getLeagueLogo(team.sport)}
              {name}
            </div>
            <p className="overview-stats noselect">
              {rank} in the {conference}
            </p>
            <p className="overview-stats noselect">
              {wins}-{losses}
            </p>
          </div>
        </div>
      </>
    );
  }
  return null;
}

export default function TeamOverview(props) {
  const [standings, setStandings] = useState({});
  const nba = useQuery(["NBAStandings", "NBA"], () => standingsQuery("NBA"), {
    onSuccess: (data) => {
      const temp = { ...standings };
      temp["NBA"] = data;
      setStandings(temp);
    },
  });
  const nhl = useQuery(["NHLStandings", "NHL"], () => standingsQuery("NHL"), {
    onSuccess: (data) => {
      const temp = { ...standings };
      temp["NHL"] = data;
      setStandings(temp);
    },
  });
  const mlb = useQuery(["MLBStandings", "MLB"], () => standingsQuery("MLB"), {
    onSuccess: (data) => {
      const temp = { ...standings };
      temp["MLB"] = data;
      setStandings(temp);
    },
  });
  const nfl = useQuery(["NFLStandings", "NFL"], () => standingsQuery("NFL"), {
    onSuccess: (data) => {
      const temp = { ...standings };
      temp["NFL"] = data;
      setStandings(temp);
    },
  });
  Modal.setAppElement("#root");
  if (
    !nfl.isSuccess ||
    !mlb.isSuccess ||
    !nba.isSuccess ||
    !nhl.isSuccess ||
    !props ||
    !props.prefs
  ) {
    return loading;
  }
  const teams = getAllTeamsFollowed(props.prefs, props.sports);
  if (teams.length < 1) {
    return <p className="nomargin">No teams followed.</p>;
  }
  return (
    <div className="overviews">
      {teams.map((team, index) => (
        <Overview team={team} standings={standings} key={index} />
      ))}
    </div>
  );
}
