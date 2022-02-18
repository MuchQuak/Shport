import {useLocation} from 'react-router-dom'; // Might need again for later
import axios from 'axios';
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
    else{
        getPrefs();
    }

    async function getPrefs(){
        try {
            const url = 'http://localhost:5000/preferences';
            const response = await axios.post(url, {"username":location.state.username});
            
            if (response.status === 201){
                location.state.prefs = response.data[0].prefs;
                console.log(location.state.prefs);
                return response.data;
            }
        }
        catch (error){
          console.log(error);
          return error.data;
        }
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
