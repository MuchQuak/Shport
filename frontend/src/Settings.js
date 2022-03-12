import NavBar from './NavBar';
import {useLocation} from "react-router-dom";
import LeaguePreferenceSelector from "./LeaguePreferenceSelector";
import React, {useState} from "react";
import {all_prefs, fromLocation, getAllTeamsFollowed, getSportsFollowed} from "./PrefHandler";
import TeamPreferenceSelector from "./TeamPreferenceSelector";
import {sportsQuery} from "./SportHandler";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {useQuery} from "react-query";

function prefDisplay(prefs) {
    if (prefs && Object.keys(prefs).length > 0) {
        return <p className='nomargin' style={{color:'#000000'}}>{JSON.stringify(prefs)}</p>;
    }
    return <p className='nomargin' style={{color:'#000000'}}>No preferences found!</p>;
}

function SettingsBox() {
    const location = useLocation();
    const [selectedLeagues, setSelectedLeagues] = useState([]);
    const [selectedTeams, setSelectedTeams] = useState([]);
    const prefs = fromLocation(location);
    const { isLoading, isError, error } = useQuery('sports', sportsQuery, {
        onSuccess: (data) => {
            setSelectedLeagues(getSportsFollowed(prefs));
            setSelectedTeams(getAllTeamsFollowed(prefs, data));
        }
    })
    if (isLoading) {
        return <span>Loading...</span>
    }
    if (isError) {
        return <span>Error: {error.message}</span>
    }
    return (
        <div className='boxed margin-bottom-10'>
            <h1 className='boxed-header'>Settings</h1>
            <div className='wrapper'>
                <Form.Group className="inputForm" id="usernameForm" size="lg" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="username" value={location.state.username}/>
                </Form.Group>
                <Form.Group className="inputForm" id="passwordForm" size="lg" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={"pass"}/>
                </Form.Group>
            </div>
            <div className='wrapper'>
                <p className='settings-category-header'>Preferences</p>
                <LeaguePreferenceSelector prefs={prefs} selected={selectedLeagues} setSelected={setSelectedLeagues}/>
                <TeamPreferenceSelector prefs={prefs} selected={selectedTeams} setSelected={setSelectedTeams}/>
                <Button className='themed-button' size='md'>Save Changes</Button>
            </div>
        </div>
    )
}

export default function Settings() {
    return (
      <main>
        <NavBar />
        <SettingsBox />
      </main>
    );
}