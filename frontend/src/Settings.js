import NavBar from './NavBar';
import {useLocation} from "react-router-dom";

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
        <h2 className='nomargin underline'>Settings</h2>
        <h3 className='nomargin'>Preferences</h3>
        {prefDisplay(prefs)}
      </main>
    );
}