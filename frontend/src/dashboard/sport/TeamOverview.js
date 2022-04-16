import "../../style/overview.scss";
import { getAllTeamsFollowed } from "../../settings/PrefHandler";
import {
  capitalizeFirstLetter,
  getLeagueLogo,
  getTeamLogo,
  standingsQuery,
} from "./SportHandler";
import React, { useState } from "react";
import { useQuery } from "react-query";
import Modal from "react-modal";
import CloseButton from "react-bootstrap/CloseButton";
import { TeamOverviewExpanded } from "./TeamOverviewExpanded";
import { loading, suffix } from "../../util/Util";

const modalStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: "auto",
    width: "45%",
    border: "none",
    padding: "0",
  },
};

function Overview(props) {
  const [isAlertVisible, setAlertVisible] = useState(false);
  const standings = props.standings;
  const team = props.team;
  const stats = standings[team.sport];
  const code = String(team.code).trim().toUpperCase();
  const index = props.index;
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
          <div className="dialog" id="expanded-team-overview">
            <div className="dialog-header" id="expanded-team-overview-header">
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
                league={team.sport}
                stats={stats}
              />
            </div>
          </div>
        </Modal>
        <div className="overview" onClick={() => setAlertVisible(true)}>
          {getTeamLogo(team.sport, code, "overview-logo")}
          <div className="overview-header">
            <div className="overview-team-name noselect">
              {getLeagueLogo(team.sport)}
              <p>{name}</p>
            </div>
            <div className="break" />
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
  if (nba.isLoading || nhl.isLoading || !props || !props.prefs) {
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
