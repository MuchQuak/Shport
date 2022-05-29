import "../style/settings.scss";
import { useNavigate } from "react-router-dom";
import LeaguePreferenceSelector from "./LeaguePreferenceSelector";
import React, {useContext, useState} from "react";
import { getAllTeamsFollowed, getSportsFollowed } from "../user/PrefHandler";
import TeamPreferenceSelector from "./TeamPreferenceSelector";
import { getLabels, sportsQuery } from "../dashboard/sport/SportHandler";
import Form from "react-bootstrap/Form";
import { useQuery } from "react-query";
import {deleteUser, setUserPrefs} from "../user/UserHandler";
import { toast, Toaster } from "react-hot-toast";
import {Collapsible, errorSuffix, loading, PopIntoExistence} from "../util/Util";
import {css, StyleSheet} from "aphrodite";
import {ThemeContext, UserContext} from "../App";
import RedditPreferenceSelector from "../dashboard/reddit/RedditPreferenceSelector";
import {getLeaguePosts, getTeamPosts} from "../dashboard/reddit/RedditHandler";
import {accountIcon} from "../dashboard/NavBar";
import Modal from "react-modal";
import {modalStyle} from "../login-signup/SignUp";
import CloseButton from "react-bootstrap/CloseButton";

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

function createPrefsObject(allLeagues, leagues, teams, teamPosts, leaguePosts) {
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
    reddit: {
      teamPosts: teamPosts,
      leaguePosts: leaguePosts
    }
  };
}

function SettingsBox(props) {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const { user, setUser } = useContext(UserContext);
  const [selectedLeagues, setSelectedLeagues] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [sports, setSports] = useState([]);
  const [leaguePosts, setLeaguePosts] = useState(1);
  const [teamPosts, setTeamPosts] = useState(1);
  const [isAlertVisible, setAlertVisible] = useState(false);
  const [currentAlert, setCurrentAlert] = useState(<></>);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [usernameInputVisible, setUsernameInputVisible] = useState(false);
  const [passwordInputVisible, setPasswordInputVisible] = useState(false);
  const styled = styles(theme);
  const sportsResult = useQuery(["sports"], () => sportsQuery(), {
    onSuccess: (data) => {
      setSports(data);
      setSelectedLeagues(getSportsFollowed(user.prefs));
      setSelectedTeams(getAllTeamsFollowed(user.prefs, data));
      setTeamPosts(getTeamPosts(user.prefs));
      setLeaguePosts(getLeaguePosts(user.prefs));
    },
  });
  function handleSubmit(event) {
    event.preventDefault();
    user.prefs = createPrefsObject(sports, selectedLeagues, selectedTeams, teamPosts, leaguePosts);
    setUser(user);
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
  function openAlert() {
    setAlertVisible(true);
  }
  function closeAlert() {
    setAlertVisible(false);
  }
  function changePassword(event) {
    event.preventDefault();
    setPasswordInputVisible(true);
  }
  function changeUsername(event) {
    event.preventDefault();
    setUsernameInputVisible(true);
  }
  function changePasswordAlert(event) {
    event.preventDefault();
    setCurrentAlert(<ChangePasswordForm cookies={props.cookies} newpass={newPassword} />);
    openAlert();
  }
  function changeUsernameAlert(event) {
    event.preventDefault();
    setCurrentAlert(<ChangeUsernameForm cookies={props.cookies} newname={newUsername} />);
    openAlert();
  }
  function deleteAccount(event) {
    event.preventDefault();
    setCurrentAlert(<DeleteAccountForm cookies={props.cookies} />);
    openAlert();
  }
  return (
    <div className={css(styled.box) + " boxed settings"}>
      <h1 className="boxed-header">Settings</h1>
      <Modal
          isOpen={isAlertVisible}
          onRequestClose={closeAlert}
          style={modalStyle}
          contentLabel="alert"
      >
        <div className="dialog" id="error-dialog">
          <div className="dialog-header" id="error-header">
            <div className="leftSpace" />
            <div className="middleSpace">
              <p>Confirm an action.</p>
            </div>
            <div className="rightSpace">
              <CloseButton
                  className="closeButton"
                  variant="white"
                  aria-label="Hide"
                  onClick={closeAlert}
              />
            </div>
          </div>
          <div className="dialog-body">
            {currentAlert}
          </div>
        </div>
      </Modal>
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
        {sportsResult.isLoading && loading}
          {sportsResult.isSuccess && sports.length > 0 && (
              <Collapsible title="Preferences" default={true}>
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
              </Collapsible>
          )}
          <RedditPreferenceSelector
            prefs={user.prefs}
            leaguePosts={leaguePosts}
            setLeaguePosts={setLeaguePosts}
            teamPosts={teamPosts}
            setTeamPosts={setTeamPosts}
          />
          <Collapsible title="Account Settings" default={false} icon={accountIcon()}>
            <button
                className={"remove-button margin-top-5"}
                onClick={(e) => changePassword(e)}
            >
              Change Password
            </button>
            <PopIntoExistence visible={passwordInputVisible} >
              <div style={{display: "flex", flexFlow: "row nowrap", gap: "5px", justifyContent: "center", alignItems: "center"}}>
                <input
                    type="text"
                    placeholder="New password"
                    style={{flexBasis: "70%", padding: "2px"}}
                    onChange={(e) => setNewPassword(e.target.value)} />
                <button
                    className={css(styled.button) + " button margin-top-5 margin-bottom-5"}
                    style={{flexBasis: "30%"}}
                    onClick={(e) => changePasswordAlert(e)}
                >
                  Change Password
                </button>
              </div>
            </PopIntoExistence>
            <button
                className={"remove-button margin-top-5"}
                onClick={(e) => changeUsername(e)}
            >
              Change Username
            </button>
            <PopIntoExistence visible={usernameInputVisible} >
              <div style={{display: "flex", flexFlow: "row nowrap", gap: "5px", justifyContent: "center", alignItems: "center"}}>
                <input
                    type="text"
                    placeholder="New username"
                    style={{flexBasis: "70%", padding: "2px"}}
                    onChange={(e) => setNewUsername(e.target.value)} />
                <button
                    className={css(styled.button) + " button margin-top-5 margin-bottom-5"}
                    style={{flexBasis: "30%"}}
                    onClick={(e) => changeUsernameAlert(e)}
                >
                  Change Username
                </button>
              </div>
            </PopIntoExistence>
            <button
                className={"remove-button margin-top-5"}
                onClick={(e) => deleteAccount(e)}
            >
              Delete Account
            </button>
          </Collapsible>
          <button
            className={css(styled.button) + " button margin-top-5"}
            onClick={(e) => handleSubmit(e)}
          >
            Save Changes
          </button>
          <button className={css(styled.button) + " button margin-top-5"} onClick={() => navigate("/")}>
            Done
          </button>
      </div>
    </div>
  );
}

function ChangePasswordForm(props) {
  const { user } = useContext(UserContext);
  //const pass = props.newpass;
  function changePassword(event) {
    event.preventDefault();
  }
  return (
      <>
        <p className="nomargin">Do you really want to change your password?</p>
        <button className={"remove-button margin-top-5"}
                onClick={(e) => changePassword(e)}>
          Yes, change password: {user.info.name}
        </button>
      </>
  )
}

function ChangeUsernameForm(props) {
  const { user } = useContext(UserContext);
  const name = props.newname;
  function changeUsername(event) {
    event.preventDefault();
  }
  return (
      <>
        <p className="nomargin">Do you really want to change your username?</p>
        <p className="nomargin">From {user.info.name} to {name}</p>
        <button className={"remove-button margin-top-5"}
                onClick={(e) => changeUsername(e)}>
          Yes, change my username to: {name}
        </button>
      </>
  )
}

function DeleteAccountForm(props) {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  if (!props.cookies) {
    return errorSuffix("authenticating user!");
  }
  function deleteAccount(event) {
    event.preventDefault();
    toast.promise(deleteUser(props.cookies.auth_token), {
        loading: "Deleting...",
        success: "Account deleted!",
        error: "Could not delete account.",
    }).then(() => {
      navigate("/signup");
    });
  }
  return (
      <>
        <p>Do you really want to delete your account?</p>
        <button className={"remove-button margin-top-5"}
                onClick={(e) => deleteAccount(e)}>
          Yes, delete my account: {user.info.name}
        </button>
      </>
  )
}

export default function Settings(props) {
  if (!props.cookies || !props.cookies.auth_token) {
    return errorSuffix("authenticating user!");
  }
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <SettingsBox cookies={props.cookies} />
    </>
  );
}
