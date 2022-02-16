import React, { useEffect, useState } from "react";
import axios from 'axios';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { useNavigate, Link, useLocation } from "react-router-dom";
import './style/SignUp.css';


export default function TeamPreferences(){
  const location = useLocation(); 
  const [items, setItems] = useState([]); 
  const [selectedTeams, setSelectedTeams] = useState([]);

  // TESTING 
  if (location.state === null) {
    location.state = {};
    location.state.username = "[ Username ]";
    location.state.pref = ["NBA", "NHL"];
  }

  // Goes through the entire preference list and reformats the teams
  useEffect(() => {
    if(location.state.pref.length > 0){
      for(let i = 0; i < location.state.pref.length; i++){
        fetchTeams(location.state.pref[i]).then( result => {
          if (result){
            for(let j = 0; j < result.length;j++){
              result[j].league = location.state.pref[i];
            }
            
            result.forEach(element => {
              setItems(oldArray => [...oldArray, element]);
            });

          }
        });
      }

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
    console.log(item)
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
    
  function handleSubmit(event) {
      event.preventDefault();
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
                                  items={items}
                                  onSearch={handleOnSearch}
                                  fuseOptions={{ 
                                    keys: ["city", "name"],
                                    threshold: 0.3,  
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
