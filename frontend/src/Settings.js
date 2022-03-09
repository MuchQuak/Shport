import NavBar from './NavBar';
import {useLocation} from "react-router-dom";
import LeaguePreferenceSelector from "./LeaguePreferenceSelector";
import {Accordion} from "react-bootstrap";
import {useEffect, useState} from "react";
import {getSportsFollowed} from "./PrefHandler";

function prefDisplay(prefs) {
    if (prefs && Object.keys(prefs).length > 0) {
        return <p className='nomargin' style={{color:'#000000'}}>{JSON.stringify(prefs)}</p>;
    }
    return <p className='nomargin' style={{color:'#000000'}}>No preferences found!</p>;
}

export default function Settings() {
    const location = useLocation();
    const [selectedLeagues, setSelectedLeagues] = useState([]);

    if (location.state === null) {
        location.state = {};
        location.state.username = "[ Username ]";
        location.state.prefs = {sports: {}};
    }
    const prefs = location.state.prefs;

    useEffect(() => {
        setSelectedLeagues(getSportsFollowed(prefs));
    }, [] );

    return (
      <main>
        <NavBar/>
        <div className='boxed'>
            <h1>Settings</h1>
            <LeaguePreferenceSelector prefs={prefs} selected={selectedLeagues} setSelected={setSelectedLeagues}/>
            <button onClick={() => alert("Selected:" + selectedLeagues.toString())}>Test Selections</button>
            <Accordion style={{margin: '10px'}}>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>View Raw JSON</Accordion.Header>
                    <Accordion.Body>
                        {prefDisplay(prefs)}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
      </main>
    );
}