import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate, Link } from "react-router-dom";
import './SignUp.css';


export default function SignUp(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();


  function validateForm() {
    return validateUsername() && validateEmail() && validatePassword;
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
    if(testNewUser()){ // looks for duplicates in the database
      //  create new user object --- hardcoded for now for now ---
      //  currently preferences dont work
      const newUser = { // ------------ User schema?
        "email": email,
        "username":username,
        "password": password,
        "no_preferences":true,
        "nba":false,
        "nfl":false,
        "mlb":false
      };

      navigate('../', {replace:true, state: newUser});
    }
    else{
      alert("Duplicate!!!");
    }
  }

  function testNewUser(){
    // allow duplicates for now
    // In our case we look if that username or email have been entered in the database.
    return true;
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
                          <Form.Check type={type} label={`No Preferences`} id={`0`}/>
                          <Form.Check type={type} label={`NBA`} id={`1`}/>
                          <Form.Check disabled type={type} label={`NFL`} id={`2`}/>
                          <Form.Check disabled type={type} label={`MLB`} id={`3`}/>
                      </div>
                    ))}
                    <Button className="submit-button" id="signup-button" block size="lg" type="submit" disabled={!validateForm()}>Sign Up</Button>
                    
                    <Link to="/Login">
                        <p className="have-account">Already registered? Sign in</p>
                    </Link>
                </Form>
            </div>
        </div>
  );
}
