import React, {useEffect, useState} from "react";
import axios from 'axios';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate, Link, useLocation } from "react-router-dom";
import './style/SignUp.css';

export default function Preferences(){
  const [preferences, setPreferences] = useState([]);
  const [sports, setSports] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

    useEffect(() => {
        fetchSports().then(result => {
            if (result)
                setSports(result);
        });
    }, [] );

    async function fetchSports(){
        try {
            const response = await axios.get('http://localhost:5000/sport');
            return response.data;
        }
        catch (error){
            console.log(error);
            return false;
        }
    }

    if (!sports) {
        return null;
    }

  const labels = sports.map((sport) => {
      return sport["sport"];
  })

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
    let prefList = [];
    if (preferences.length === 0){
      prefList = labels;
    } else {
      prefList = preferences;
    }
      const newUser = {
        "username": location.state.username,
        "password": location.state.password,
        //"email": location.state.email,
        "pref": prefList
      }
      addUser(newUser);
      navigate('/', {replace:true, state: newUser});
    }

  /*
  DOESNT WORK
  function addAllPref(){
    const allTokens = ["NBA","NFL", "MLB"];

    for(let i = 0; i < allTokens.length; i++ ){
      setPreferences(oldArray => [...oldArray, allTokens[i]]);
    }
  }*/

    const checkboxes = labels.map((label, index) => {
        return (<Form.Check type={"checkbox"} label={label} id={index + 1} key={index + 1} onChange={(e) => checkSportOption(e, label)}/>);
    });

  function checkPref(e){
      if(e.target.checked === true){
        disableSportOptions();
        if(preferences.length > 0){ // NOTE: Unsure if needed check back later me -- HR
          removeAllTokens();
          labels.forEach((label, index) => {
              document.getElementById(String(index + 1)).checked = false;
          });
        }
      } else {
        enableSportOptions();
      }
    }

  function removeAllTokens(){
    setPreferences([]);
  }
  
  function disableSportOptions(){
      labels.forEach((label, index) => {
          document.getElementById(String(index + 1)).disabled = true;
      });
  }

  function enableSportOptions(){
      labels.forEach((label, index) => {
          document.getElementById(String(index + 1)).disabled = false;
      });
  }

  function checkSportOption(e, token){
    if (e.target.checked === true){
        setPreferences(oldArray => [...oldArray, token]);
        disablePrefOptions();
    } else {
        setPreferences(preferences.filter(tk => tk !== token));
        enablePrefOptions();
    }
  }

  function disablePrefOptions(){
    document.getElementById("0").disabled = true;
  }

  function enablePrefOptions(){
    if(preferences.length === 1){
      document.getElementById("0").disabled = false;
    }
  }

    return (
        <div className="signup-content">
            <div className="signup">
                <h1 className="signup-name">Preferences</h1>
                <Form onSubmit={handleSubmit}>
                    <div key={`default-checkbox`} className="mb-3">
                        <Form.Check type="checkbox" label="No Preferences" id="0" key="0" onChange={(e) => checkPref(e)}/>
                        {checkboxes}
                    </div>
                    <Button className="submit-button" id="signup-button" block size="lg" type="submit">Sign Up</Button>
                    <Link to="/Login">
                        <p className="have-account">Already registered? Sign in</p>
                    </Link>
                </Form>
            </div>
        </div>
    );
  }

