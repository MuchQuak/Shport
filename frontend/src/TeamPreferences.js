import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import SelectedTable from './SelectedTable';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { useNavigate, Link, useLocation } from "react-router-dom";
import './style/SignUp.css';
import {fetchSports, getTeamLogo} from "./SportHandler";
import {addUser} from "./UserHandler";

function itemsEqual(a, b) {
    return a.name === b.name && a.city === b.city && a.sport === b.sport && a.code === b.code;
}

export default function TeamPreferences(){
  const location = useLocation(); // Data from sport preferences
  const navigate = useNavigate();
  const [selectedTeams, setSelectedTeams] = useState([]); // teams that have been selected
  const [availableTeams, setAvailableTeams] = useState([]); // teams that have been selected
  const [sports, setSports] = useState([]);

    useEffect(() => {
        fetchSports().then(result => {
            if (result)
                setSports(result);
                Object.keys(result).forEach((key) => {
                    const teams = result[key].teams.map((team) => {
                        team.sport = result[key].sport;
                        return team;
                    });
                    setAvailableTeams(old => [...old, ...teams]);
                })
        });
    }, [] );

    if (!sports || availableTeams.length === 0) {
        return null;
    }

  const handleOnSearch = (string, results) => {
      // onSearch will have as the first callback parameter
      // the string searched and for the second the results.
    }

  const handleOnHover = (result) => {
  }
  const handleOnFocus = () => {
  }

  const handleOnSelect = (item) => {
    setAvailableTeams(availableTeams.filter(element => !itemsEqual(element, item)));
    setSelectedTeams(oldArray => [...oldArray, item]);
  }

  const formatResult = (item) => {
    return (
      <div className='logo-multiline-words'>
        {getTeamLogo(item.sport, item.code, null)}
        <div className='logo-text'>
            <p>{item.city} {item.name}</p>
            <p>{item.sport}</p>
        </div>
      </div>
    )
  }

  function removeSelected(index){
    const select = selectedTeams[index];
    setAvailableTeams(old => [...old, select]);
    setSelectedTeams(selectedTeams.filter(element => !itemsEqual(element, select)));
  }
  
  function createPrefObject(){
    let prefs = location.state.prefs;
    selectedTeams.forEach((team) => {
        if (!prefs.sports.hasOwnProperty(team.sport)) {
            prefs.sports[team.sport] = {
                teams: []
            }
        }
        if (!prefs.sports[team.sport].hasOwnProperty("teams")) {
            prefs.sports[team.sport].teams = [];
        }
        prefs.sports[team.sport].teams.push(team.code);
    })
    return prefs;
  }

  function handleSubmit(event) {
      event.preventDefault();
      if (location.state === null) {
          navigate('/SignUp', {replace:true});
          return;
      }
      const newUser = {
        "username": location.state.username,
        "password": location.state.password,
        "email": location.state.email,
        "prefs": createPrefObject()
      }
      addUser(newUser).then(r => {
          if (r.status === 201) {
              navigate('/', {replace:true, state: newUser});
          }
      });
  }

  return (
      <div className="signup-content">
          <div className="signup">
              <h1 className="signup-name">Team Preferences</h1>
                  <Form onSubmit={handleSubmit}>
                      <div className='wrapper'>
                          <ReactSearchAutocomplete
                              items={availableTeams}
                              onSearch={handleOnSearch}
                              fuseOptions={{
                                keys: ["city", "name", "sport"],
                                threshold: 0.2,
                                maxPatternLength: 32,
                                minMatchCharLength: 1 }}
                              onHover={handleOnHover}
                              onSelect={handleOnSelect}
                              onFocus={handleOnFocus}
                              autoFocus
                              formatResult={formatResult}
                          />
                      </div>
                      <SelectedTable selectedData={selectedTeams} removeSelected={removeSelected} />
                      <Button className="submit-button" id="signup-button" size="lg" type="submit">Sign Up</Button>
                      <Link to="/Login">
                          <p className="have-account">Already registered? Sign in</p>
                      </Link>
                  </Form>
          </div>
      </div>
  );
}