import "../style/settings.scss";
import { useNavigate } from "react-router-dom";
import LeaguePreferenceSelector from "./LeaguePreferenceSelector";
import React, {useContext, useState} from "react";
import { getAllTeamsFollowed, getSportsFollowed } from "./PrefHandler";
import TeamPreferenceSelector from "./TeamPreferenceSelector";
import { getLabels, sportsQuery } from "../dashboard/sport/SportHandler";
import Form from "react-bootstrap/Form";
import { useQuery } from "react-query";
import { setUserPrefs } from "../login-signup/UserHandler";
import { toast, Toaster } from "react-hot-toast";
import { loading } from "../util/Util";
import {css, StyleSheet} from "aphrodite";
import {ThemeContext} from "../App";

const styles = (th) =>
    StyleSheet.create({
      box: {
        backgroundColor: th.base
      },
      button: {
        backgroundColor: th.base,
        border: "2px solid " + th.border,
        ":active": {
          backgroundColor: th.accent,
        },
        ":hover": {
          backgroundColor: th.accent,
        }
      }
    });

function createPrefsObject(allLeagues, leagues, teams) {
  const leagueLabels = getLabels(allLeagues);
  const followingAll = leagueLabels.length === leagues.length;
  const leagueObj = leagueLabels.reduce((current, item) => {
    current[item] = { teams: [] };
    if (leagues.includes(item) && !followingAll) {
      current[item].following = true;
    }
    return current;
  }, {});
  if (followingAll) {
    leagueObj.following = true;
  }
  teams.forEach((team) => leagueObj[team.sport].teams.push(team.code));
  for (let key in leagueObj) {
    if (
      leagueObj.hasOwnProperty(key) &&
      (!leagueObj[key].hasOwnProperty("following") ||
        leagueObj[key].following === false) &&
      leagueObj[key].hasOwnProperty("teams") &&
      leagueObj[key].teams.length === 0
    ) {
      delete leagueObj[key];
    }
  }
  return {
    sports: leagueObj,
  };
}

function SettingsBox(props) {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const [selectedLeagues, setSelectedLeagues] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [sports, setSports] = useState([]);
  const user = props.user;
  const styled = styles(theme);
  const sportsResult = useQuery(["sports"], () => sportsQuery(), {
    onSuccess: (data) => {
      setSports(data);
      setSelectedLeagues(getSportsFollowed(user.prefs));
      setSelectedTeams(getAllTeamsFollowed(user.prefs, data));
    },
  });
  function handleSubmit(event, allLeagues, leagues, teams) {
    event.preventDefault();
    user.prefs = createPrefsObject(allLeagues, leagues, teams);
    props.setUser(user);
    toast
      .promise(setUserPrefs(user), {
        loading: "Saving...",
        success: <b>Settings saved!</b>,
        error: <b>Could not save.</b>,
      })
      .then((r) => {
        if (r.status !== 201) {
          console.log("Error" + r.status);
        }
      });
  }
  return (
    <div className={css(styled.box) + " boxed settings"}>
      <h1 className="boxed-header">Settings</h1>
      <div className="wrapper">
        <Form.Group
          className="inputForm"
          id="usernameForm"
          size="lg"
          controlId="username"
        >
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="username"
            value={user.info.name}
            readOnly={true}
          />
        </Form.Group>
        <p className="settings-category-header">Preferences</p>
        {sportsResult.isLoading && loading}
        {sportsResult.isSuccess && sports.length > 0 && (
          <>
            <LeaguePreferenceSelector
              sports={sports}
              prefs={user.prefs}
              selected={selectedLeagues}
              setSelected={setSelectedLeagues}
            />
            <TeamPreferenceSelector
              sports={sports}
              prefs={user.prefs}
              selected={selectedTeams}
              setSelected={setSelectedTeams}
            />
            <button
              className={css(styled.button) + " button margin-bottom-5"}
              onClick={(e) =>
                handleSubmit(e, sports, selectedLeagues, selectedTeams)
              }
            >
              Save Changes
            </button>
            <button className={css(styled.button) + " button"} onClick={() => navigate("/")}>
              Done
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function Settings(props) {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <SettingsBox user={props.user} setUser={props.setUser} />
    </>
  );
}
