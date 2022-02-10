import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate, Link } from "react-router-dom";
import './SignUp.css';

export default function SignUp(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [preferences, setPreferences]= useState([]);


  const navigate = useNavigate();

  function validateForm() {
    return validateUsername() && validateEmail() && validatePassword();
  }

  function validateUsername(){
    return username.length > 0;
  }

  function validatePassword(){
    return password.length > 0;
  }

  function validateEmail(){
    return email.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (testNewUser()){ // looks for duplicates in the database
      //  create new user object --- hardcoded for now for now ---
      //  currently preferences dont work
      const newUser = {
        "email": email,
        "username":username,
        "password": password,
        "preferences": preferences  
      }
      navigate('../', {replace:true, state: newUser});
    } else {
      alert("Duplicate!!!");
    }
  }

  function testNewUser(){
    // allow duplicates for now
    // In our case we look if that username or email have been entered in the database.
    return true;
  }

  function checkPref(e){
    if (e.target.checked === true){
      disableSportOptions();

      if (preferences.length > 0){ // NOTE: Unsure if needed check back later me -- HR
        removeAllTokens();
        document.getElementById('1').checked = false;
        document.getElementById('2').checked = false;
        document.getElementById('3').checked = false;
      }
    } else {
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
    if (e.target.checked === true){
      addTokenF(token);
      disablePrefOptions();
    } else {
      removeToken(token);
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

  function addTokenF(token){
    setPreferences(oldArray => [...oldArray, token]);
  }

  function removeToken(token){
    setPreferences(preferences.filter(tk => tk !== token));
    
  }

  return (
        <div className="signup-content">
            <div className="signup">
                <h1 className="signup-name">Sign Up</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="usernameForm" size="lg" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control autoFocus type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="emailForm" size="lg" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="passwordForm" size="lg" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Group>
                    <p className="preferences">Preferences</p>
                    {['checkbox'].map((type) => (
                      <div key={`default-${type}`} className="mb-3">
                          <Form.Check className='noselect' type={type} label={`No Preferences`} id={`0`} onChange={(e) => checkPref(e)}/>
                          <Form.Check className='noselect' type={type} label={`NBA`} id={`1`} onChange={(e) => checkSportOption(e,"NBA")}/>
                          <Form.Check className='noselect' type={type} label={`NFL`} id={`2`} onChange={(e) => checkSportOption(e,"NFL")}/>
                          <Form.Check className='noselect' type={type} label={`MLB`} id={`3`} onChange={(e) => checkSportOption(e,"MLB")}/>
                      </div>
                    ))}
                    <Button className="submit-button" id="signup-button" block size="lg" type="submit" disabled={!validateForm()}>Sign Up</Button>
                    <Link to="/Login">
                        <p className="have-account noselect">Already registered? Sign in</p>
                    </Link>
                </Form>
            </div>
        </div>
  );
}
