import NavBar from './NavBar';
import {useLocation} from "react-router-dom";
import LeaguePreferenceSelector from "./LeaguePreferenceSelector";
import React, {useEffect, useState} from "react";
import {all_prefs, getAllTeamsFollowed, getSportsFollowed} from "./PrefHandler";
import TeamPreferenceSelector from "./TeamPreferenceSelector";
import {fetchSports} from "./SportHandler";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function prefDisplay(prefs) {
    if (prefs && Object.keys(prefs).length > 0) {
        return <p className='nomargin' style={{color:'#000000'}}>{JSON.stringify(prefs)}</p>;
    }
    return <p className='nomargin' style={{color:'#000000'}}>No preferences found!</p>;
}

export default function Settings() {
    const location = useLocation();
    const [selectedLeagues, setSelectedLeagues] = useState([]);
    const [selectedTeams, setSelectedTeams] = useState([]);
    const [sports, setSports] = useState([]);
    useEffect(() => {
        fetchSports().then(result => {
            if (result)
                setSports(result);
        });
    }, [] );

    if (location.state === null) {
        location.state = {};
        location.state.username = "[ Username ]";
        location.state.prefs = all_prefs;
    }
    const prefs = location.state.prefs;

    useEffect(() => {
        setSelectedLeagues(getSportsFollowed(prefs));
        setSelectedTeams(getAllTeamsFollowed(prefs, sports));
    }, [prefs, sports] );

    return (
      <main>
        <NavBar/>
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
      </main>
    );
}