import '../style/settings.scss'
import {useNavigate} from "react-router-dom";
import LeaguePreferenceSelector from "./LeaguePreferenceSelector";
import React, {useEffect, useState} from "react";
import {getAllTeamsFollowed, getSportsFollowed} from "./PrefHandler";
import TeamPreferenceSelector from "./TeamPreferenceSelector";
import {getLabels, sportsQuery} from "../dashboard/sport/SportHandler";
import Form from "react-bootstrap/Form";
import {useQuery} from "react-query";
import {setUserPrefs} from "../login-signup/UserHandler";

function createPrefsObject(allLeagues, leagues, teams) {
    const leagueLabels = getLabels(allLeagues);
    const followingAll = leagueLabels.length === leagues.length;
    const leagueObj = leagueLabels.reduce( (current, item) => {
        current[item] = {teams: []}
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
        if (leagueObj.hasOwnProperty(key) &&
            (!leagueObj[key].hasOwnProperty("following") || leagueObj[key].following === false) &&
            leagueObj[key].hasOwnProperty("teams") &&
            leagueObj[key].teams.length === 0){
            delete leagueObj[key];
        }
    }
    return {
        sports: leagueObj
    }
}

function SettingsBox(props) {
    const navigate = useNavigate();
    const [selectedLeagues, setSelectedLeagues] = useState([]);
    const [selectedTeams, setSelectedTeams] = useState([]);
    const [sports, setSports] = useState([]);
    const user = props.user;
    const spq = useQuery('sports', () => sportsQuery, {
        onSuccess: (data) => {
            data.then((sp) => {
                setSports(sp);
                setSelectedLeagues(getSportsFollowed(user.prefs));
                setSelectedTeams(getAllTeamsFollowed(user.prefs, sp.data));
            });
        }
    });
    function handleSubmit(event, allLeagues, leagues, teams) {
        event.preventDefault();
        user.prefs = createPrefsObject(allLeagues, leagues, teams);
        props.setUser(user);
        setUserPrefs(user.prefs).then(r => {
            if (r.status === 201) {
                navigate('/');
            } else {
                console.log("Error" + r.status);
            }
        });
    }
    return (
        <div className='boxed margin-bottom-10'>
            <h1 className='boxed-header'>Settings</h1>
                <div className='wrapper'>
                    <Form>
                        <Form.Group className="inputForm" id="usernameForm" size="lg" controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="username" value={user.info.name} readOnly={true}/>
                        </Form.Group>
                    </Form>
                </div>
                    <div className='wrapper'>
                    <p className='settings-category-header'>Preferences</p>
                        {spq.isLoading && <p className='nomargin'>Loading...</p>}
                        {spq.isSuccess && sports.length > 0 &&
                            <>
                                <LeaguePreferenceSelector sports={sports} prefs={user.prefs} selected={selectedLeagues} setSelected={setSelectedLeagues}/>
                                <TeamPreferenceSelector sports={sports} prefs={user.prefs} selected={selectedTeams} setSelected={setSelectedTeams}/>
                                <button className='themed-button' onClick={e => handleSubmit(e, sports, selectedLeagues, selectedTeams)}>Save Changes</button>
                            </>
                        }
                </div>
        </div>
    );
}

export default function Settings(props) {
    const navigate = useNavigate();
    /*useEffect(() => {
        if (location.state === undefined || location.state === null ||
            location.state.username === undefined || location.state.username === "" ||
            location.state.username === null || location.state.username === "[ Username ]"){
            // Navigate away if no user found
            navigate('/signup', {replace:true});
        }
    });*/
    return <SettingsBox user={props.user} setUser={props.setUser}/>;
}