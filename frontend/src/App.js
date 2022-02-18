import {useLocation} from 'react-router-dom'; // Might need again for later
import './style/App.css';
import NavBar from './NavBar';
import Dashboard from "./Dashboard";

export default function App() {
    const location = useLocation();

    if (location.state === null) {
        location.state = {};
        location.state.username = "[ Username ]";
        location.state.prefs = [];
    }
    const prefs = location.state.prefs;
    return (
      <>
          <NavBar/>
          <div className='content'>
              <Dashboard prefs={prefs}/>
          </div>
      </>
  );
}
