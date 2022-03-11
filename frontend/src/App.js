import React, {useEffect, useState} from "react";

import {useLocation} from 'react-router-dom'; // Might need again for later
import axios from 'axios';
import './style/app.scss';
import NavBar from './NavBar';
import Dashboard from "./Dashboard";

export default function App() {
    const location = useLocation();
    const [loadedPref, setPref] = useState(false); 
    const [userPrefs, setUserPrefs] = useState({});

    useEffect(() => {
        if(location.state != null && !loadedPref){
            getPrefs();
            setPref(true);
        }
        else if(location.state == null){
            location.state = {};
            location.state.username = "[ Username ]";
        }
      }, [location, loadedPref, userPrefs] );

    async function getPrefs(){
        try {
            const url = 'http://localhost:5000/preferences';
            const response = await axios.post(url, {"username":location.state.username});
            
            if (response.status === 201){
                setUserPrefs(response.data[0].prefs);
                location.state.prefs = response.data[0].prefs;
                return response.data;
            }
        }
        catch (error){
          console.log(error);
          return error.data;
        }
      }


    return (
      <>
          <NavBar/>
          <div className='content'>
              <Dashboard prefs={userPrefs}/>
          </div>
      </>
  );
}
