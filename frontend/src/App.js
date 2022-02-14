import {useLocation} from 'react-router-dom'; // Might need again for later
import './style/App.css';
import NavBar from './NavBar';
import Dashboard from "./Dashboard";

export default function App() {
    //const [teams, setTeams] = useState([]);
    const location = useLocation();

    if (location.state == null) {
        location.state = {};
        location.state.username = "[ Username ]";
        location.state.preferences = [];
    } else {
        location.state.preferences = [];
    }
    const prefs = location.state.preferences;
    return (
      <>
          <NavBar/>
          <div className='content'>
              <Dashboard prefs={prefs}/>
          </div>
      </>
  );
}
