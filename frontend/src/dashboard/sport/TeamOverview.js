import "../../style/overview.scss";
import {
  getSportsWithOneTeamFollowed,
  getTeamsFollowedForSport,
} from "../../settings/PrefHandler";
import Tabbed from "../Tabbed";
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
import { loading } from "../../util/Util";

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

export function suffix(i) {
  const j = i % 10,
    k = i % 100;
  if (j === 1 && k !== 11) {
    return i + "st";
  }
  if (j === 2 && k !== 12) {
    return i + "nd";
  }
  if (j === 3 && k !== 13) {
    return i + "rd";
  }
  return i + "th";
}

function overviews(prefs, standings, league, isAlertVisible, setAlertVisible) {
  const teams = getTeamsFollowedForSport(prefs, league);
  if (teams.length < 1) {
    return <p className="nomargin">No teams followed.</p>;
  }
  const stats = standings[league];
  return teams.map((team, index) => {
    const code = String(team).trim().toUpperCase();
    if (stats.hasOwnProperty(code)) {
      const stat = stats[code];
      const rank = suffix(stat["rank"]);
      const wins = stat["wins"];
      const losses = stat["losses"];
      const name = stat["city"] + " " + stat["name"];
      const conference = capitalizeFirstLetter(stat["conference"]);
      return (
        <div key={index}>
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
                  league={league}
                  stats={stats}
                />
              </div>
            </div>
          </Modal>
          <div
            className="overview"
            key={index}
            onClick={() => setAlertVisible(true)}
          >
            {getTeamLogo(league, code, "overview-logo")}
            <div className="overview-header">
              <div>
                <p className="overview-team-name noselect">{name}</p>
              </div>
              <div className="break" />
              <div>
                <p className="overview-stats noselect">
                  {rank} in the {conference}
                </p>
              </div>
              <div>
                <p className="overview-stats noselect">
                  {wins}-{losses}
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  });
}

function tabs(
  prefs,
  standings,
  tabNames,
  isAlertVisible,
  openAlert,
  closeAlert
) {
  return tabNames.map((league, index) => {
    if (standings.hasOwnProperty(league)) {
      return (
        <div className="overviews" key={index}>
          {overviews(
            prefs,
            standings,
            league,
            isAlertVisible,
            openAlert,
            closeAlert
          )}
        </div>
      );
    }
    return (
      <p className="nomargin" key={index}>
        No {league} content.
      </p>
    );
  });
}

export default function TeamOverview(props) {
  const [standings, setStandings] = useState({});
  const [isAlertVisible, setAlertVisible] = useState(false);
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
  Modal.setAppElement("#root");
  if (nba.isLoading || nhl.isLoading || !props || !props.prefs) {
    return loading;
  }
  const leaguesFollowed = getSportsWithOneTeamFollowed(props.prefs);
  if (leaguesFollowed.length === 0 || Object.keys(standings).length === 0) {
    return <p className="nomargin bold">No teams followed</p>;
  }
  const icons = leaguesFollowed.map((league, index) => {
    return getLeagueLogo(String(league));
  });

  return (
    <Tabbed titles={leaguesFollowed} icons={icons} default={0}>
      {tabs(
        props.prefs,
        standings,
        leaguesFollowed,
        isAlertVisible,
        setAlertVisible
      )}
    </Tabbed>
  );
}
