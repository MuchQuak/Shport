import NavBar from './NavBar';
import {useLocation} from "react-router-dom";
import LeaguePreferenceSelector from "./LeaguePreferenceSelector";

function prefDisplay(prefs) {
    if (prefs && Object.keys(prefs).length > 0) {
        return <p className='nomargin'>{JSON.stringify(prefs)}</p>;
    }
    return <p className='nomargin'>No preferences found!</p>;
}

export default function Settings() {
    const location = useLocation();

    if (location.state === null) {
        location.state = {};
        location.state.username = "[ Username ]";
        location.state.prefs = {};
    }
    const prefs = location.state.prefs;
    return (
      <main>
        <NavBar/>
        <div className='boxed'>
            <h1>Settings</h1>
            <LeaguePreferenceSelector />
            {prefDisplay(prefs)}
        </div>
      </main>
    );
}