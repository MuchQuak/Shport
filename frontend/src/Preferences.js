import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate, Link, useLocation } from "react-router-dom";
import './SignUp.css';

export default function Preferences(){
  const [preferences, setPreferences] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
    
  function handleSubmit(event) {
    event.preventDefault();

    if(preferences.length === 0){
      const allTokens = ["NBA","NFL", "MLB"];

      allTokens.forEach(element => {
        setPreferences(oldArray => [...oldArray, element]);
      });
    }

      const newUser = {
        "email": location.state.email,
        "username": location.state.username,
        "password": location.state.password,
        "preferences": preferences 
      }


      navigate('/', {replace:true, state: newUser});
    }

  function checkPref(e){

      if(e.target.checked === true){
        disableSportOptions();

        if(preferences.length > 0){ // NOTE: Unsure if needed check back later me -- HR
          removeAllTokens();
          document.getElementById('1').checked = false;
          document.getElementById('2').checked = false;
          document.getElementById('3').checked = false;
        }

      }
      else{
        enableSportOptions();
      }
    }

  function removeAllTokens(){
    setPreferences([]);
  }
  
  function disableSportOptions(){
    document.getElementById('1').disabled = true;
    document.getElementById('2').disabled = true;
    document.getElementById('3').disabled = true;
  }

  function enableSportOptions(){
    document.getElementById('1').disabled = false;
    document.getElementById('2').disabled = false;
    document.getElementById('3').disabled = false;
  }

  function checkSportOption(e, token){
    if(e.target.checked === true){
        setPreferences(oldArray => [...oldArray, token]);
        disablePrefOptions();
    }
    else{
        setPreferences(preferences.filter(tk => tk !== token));
        enablePrefOptions();
    }
  }

  function disablePrefOptions(){
    document.getElementById('0').disabled = true;
  }

  function enablePrefOptions(){
    if(preferences.length === 1){
      document.getElementById('0').disabled = false;
    }
  }
    return (
        <div className="signup-content">
            <div className="signup">
                <h1 className="signup-name">Preferences</h1>
                <Form onSubmit={handleSubmit}>
                    <div key={`default-checkbox`} className="mb-3">
                        <Form.Check type={"checkbox"} label={`No Preferences`} id={`0`} onChange={(e) => checkPref(e)}/>
                        <Form.Check type={"checkbox"} label={`NBA`} id={`1`} onChange={(e) => checkSportOption(e,"NBA")}/>
                        <Form.Check type={"checkbox"} label={`NFL`} id={`2`} onChange={(e) => checkSportOption(e,"NFL")}/>
                        <Form.Check type={"checkbox"} label={`MLB`} id={`3`} onChange={(e) => checkSportOption(e,"MLB")}/>
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

