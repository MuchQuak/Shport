import NavBar from './NavBar';
import {useLocation} from "react-router-dom";
import LeaguePreferenceSelector from "./LeaguePreferenceSelector";
import {useEffect, useState} from "react";
import {getAllTeamsFollowed, getSportsFollowed} from "./PrefHandler";
import TeamPreferenceSelector from "./TeamPreferenceSelector";
import {fetchSports} from "./SportHandler";
import Button from "react-bootstrap/Button";

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
        location.state.prefs = {sports: {}};
    }
    const prefs = location.state.prefs;

    useEffect(() => {
        setSelectedLeagues(getSportsFollowed(prefs));
        setSelectedTeams(getAllTeamsFollowed(prefs, sports));
    }, [prefs, sports] );

    return (
      <main>
        <NavBar/>
        <div className='boxed'>
            <h1>Settings</h1>
            <LeaguePreferenceSelector prefs={prefs} selected={selectedLeagues} setSelected={setSelectedLeagues}/>
            <TeamPreferenceSelector prefs={prefs} selected={selectedTeams} setSelected={setSelectedTeams}/>
            <Button variant='light'>Save Changes</Button>
        </div>
      </main>
    );
}