import React, { useEffect, useState } from "react";
import axios from 'axios';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import SelectedTable from './SelectedTable';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { useNavigate, Link, useLocation } from "react-router-dom";
import './style/SignUp.css';


export default function TeamPreferences(){
  const [addedTeams, setAddedTeams] = useState(false); // Page first started or reloaded check
  const location = useLocation();                     // Data from sport preferences
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);             // teams that can select
  const [selectedTeams, setSelectedTeams] = useState([]); // teams that have been selected

  // TESTING 
  if (location.state === null) {
    location.state = {};
    location.state.username = "[ Username ]";
    location.state.pref = ["NBA", "NHL"];
  }

  // Goes through the entire preference list and reformats the teams
  useEffect(() => {
    if(addedTeams === false && location.state.pref.length > 0){
      for(let i = 0; i < location.state.pref.length; i++){
        fetchTeams(location.state.pref[i]).then( result => {
          if (result){
            for(let j = 0; j < result.length;j++){
              result[j].league = location.state.pref[i];
            }
            
            result.forEach(element => {
              setTeams(oldArray => [...oldArray, element]);
            });

          }
        });
      }
      setAddedTeams(true);
    }
    else{
      fetchAllTeams().then( result => {

      });
    }

  }, [] );

  async function fetchTeams(sport){
    try {
        const response = await axios.get('http://localhost:5000/sport/' + sport + '/teams');
        return response.data;
    }
    catch (error){
        console.log(error);
        return false;
    }
  }
  async function fetchAllTeams(){
    try {
        const response = await axios.get('http://localhost:5000/sport');
        return response.data;
    }
    catch (error){
        console.log(error);
        return false;
    }
  }


  const handleOnSearch = (string, results) => {
      // onSearch will have as the first callback parameter
      // the string searched and for the second the results.
      console.log(string, results)
    }

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result)
  }

  const handleOnSelect = (item) => {
    // the item selected
    console.log(item);
    setTeams(teams.filter(element => element.name !== item.name));
    setSelectedTeams(oldArray => [...oldArray, item]);
  }

  const handleOnFocus = () => {
    console.log('Focused')
  }

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
        <span style={{ display: 'block', textAlign: 'left' }}>{item.league}</span>
      </>
    )
  }

  function removeSelected(index){
    setTeams(oldArray => [...oldArray, selectedTeams[index]]);
    setSelectedTeams(selectedTeams.filter(element => element.name !== selectedTeams[index].name));
  }
  
  function createPrefObject(){
    let pref = {};

    //check if pref is empty and if preferences were empty
    //Do later

    for(let i = 0; i < selectedTeams.length; i++){
      if(pref[selectedTeams[i].league] === undefined){
        pref[selectedTeams[i].league] = [selectedTeams[i].code];
      }
      else{
        pref[selectedTeams[i].league].push(selectedTeams[i].code);
      }
    }
    return pref;
  }

  async function addUser(user){
    try {
        const response = await axios.post('http://localhost:5000/users',user);
        return response;
    }
    catch (error){
        console.log(error);
        return false;
    }
  }

  function handleSubmit(event) {
      event.preventDefault();

      const newUser = {
        "username": location.state.username,
        "password": location.state.password,
        "email": location.state.email,
        "pref": createPrefObject()
      }

      addUser(newUser);
      navigate("/", {replace:true, state: newUser});

  }

  return (
      <div className="signup-content">
          <div className="signup">
              <h1 className="signup-name">Team Preferences</h1>
                  <Form onSubmit={handleSubmit}>
                      <div className="App">
                          <header className="App-header">
                              <div style={{ width: 350 }}>
                              <ReactSearchAutocomplete
                                  items={teams}
                                  onSearch={handleOnSearch}
                                  fuseOptions={{ 
                                    keys: ["city", "name"],
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
                          </header>
                      </div>
                      <SelectedTable selectedData={selectedTeams} removeSelected={removeSelected} />

                      <Button className="submit-button" id="signup-button" block size="lg" type="submit">Add to List</Button>

                      <Button className="submit-button" id="signup-button" block size="lg" type="submit">Sign Up</Button>

                      <Link to="/Login">
                          <p className="have-account">Already registered? Sign in</p>
                      </Link>
                  </Form>
          </div>
      </div>
  );
}