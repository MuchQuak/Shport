import NavBar from './NavBar';
import {useLocation} from "react-router-dom";
import LeaguePreferences from "./LeaguePreferences";
import TeamPreferences from "./TeamPreferences";

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
        <LeaguePreferences />
        <TeamPreferences />
        {prefDisplay(prefs)}
      </main>
    );
}