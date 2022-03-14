import NavBar from './NavBar';
import {useLocation, useNavigate} from "react-router-dom";
import LeaguePreferenceSelector from "./LeaguePreferenceSelector";
import React, {useEffect, useState} from "react";
import {fromLocation, getAllTeamsFollowed, getSportsFollowed} from "./PrefHandler";
import TeamPreferenceSelector from "./TeamPreferenceSelector";
import {fetchSports, getLabels, sportsQuery} from "./SportHandler";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {useQuery} from "react-query";
import {setUserPrefs} from "./UserHandler";

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

function SettingsBox() {
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedLeagues, setSelectedLeagues] = useState([]);
    const [selectedTeams, setSelectedTeams] = useState([]);
    const prefs = fromLocation(location);
    const [sports, setSports] = useState([]);
    useEffect(() => {
        fetchSports().then(result => {
            if (result)
                setSports(result);
        });
    }, [] );
    const { isLoading, isError, error } = useQuery('sports', sportsQuery, {
        onSuccess: (data) => {
            setSelectedLeagues(getSportsFollowed(prefs));
            setSelectedTeams(getAllTeamsFollowed(prefs, data.data));
        }
    });
    if (isLoading) {
        return <span>Loading...</span>;
    }
    if (isError) {
        return <span>Error: {error.message}</span>;
    }
    function handleSubmit(event, allLeagues, leagues, teams) {
        event.preventDefault();
        const newUser = {
            "username": location.state.username,
            "password": location.state.password,
            "email": location.state.email,
            "prefs": createPrefsObject(allLeagues, leagues, teams)
        }
        setUserPrefs(newUser).then(r => {
            if (r.status === 201) {
                navigate('/', {replace:true, state: newUser});
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
                        <Form.Control type="username" value={location.state.username} readOnly={true}/>
                    </Form.Group>
                    <Form.Group className="inputForm" id="passwordForm" size="lg" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value={"pass"} readOnly={true}/>
                    </Form.Group>
                </Form>
            </div>
            <div className='wrapper'>
                <p className='settings-category-header'>Preferences</p>
                <LeaguePreferenceSelector prefs={prefs} selected={selectedLeagues} setSelected={setSelectedLeagues}/>
                <TeamPreferenceSelector prefs={prefs} selected={selectedTeams} setSelected={setSelectedTeams}/>
                <Button className='themed-button' size='md' onClick={e => handleSubmit(e, sports, selectedLeagues, selectedTeams)}>Save Changes</Button>
            </div>
        </div>
    );
}

export default function Settings() {
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        if (location.state === undefined || location.state === null ||
            location.state.username === undefined || location.state.username === "" ||
            location.state.username === null || location.state.username === "[ Username ]"){
            // Navigate away if no user found
            navigate('/SignUp', {replace:true});
        }
    });
    return (
      <main>
        <NavBar />
        <SettingsBox />
      </main>
    );
}