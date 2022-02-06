import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import './Login.css';



export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // ---  HARDCODED dummy user  ---
  const testUser1 = { // ------------ User schema?
    "email": "test@g.com",
    "username":"testUSER",
    "password": "123",
    "no_preferences":true, 
    "nba":false,
    "nfl":false,
    "mlb":false
  };

  function validateForm() {
    return validateEmail() && validatePassword();
  }

  function validatePassword(){
    return password.length > 0;
  }

  function validateEmail(){
    return email.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    // Tests the hardcored dummy user 
    if(testDummyUser()){
      navigate('../', {replace:true, state:testUser1}); // This passes the dummyUser info and navigates back to the landing page
    }
    else{
      alert("Not valid email or password\nHINT: Look at the dummy user in Login.js");
    }
  }

  // Simple test for the user input and the dummy user
  function testDummyUser(){
    return (testUser1["email"] === email  && testUser1["password"] === password );
  }

  return (
      <div className='login-content'>
          <h1 className="welcome">Welcome to Sports Dashboard</h1>
          <div className="login">
              <h1 className="websiteName">Log In</h1>
              <Form onSubmit={handleSubmit}>
                  <Form.Group className="emailForm" size="lg" controlId="email">
                      <Form.Label>Username / Email</Form.Label>
                      <Form.Control autoFocus type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                  </Form.Group>
                  <Form.Group className="passwordForm" size="lg" controlId="password">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                  </Form.Group>
                    <Button className="login-button" id="login" block size="lg" type="submit" disabled={!validateForm()}>Login</Button>
                  <Link to="/SignUp" className="login-button">
                    <Button className="login-button" id="signup" block size="lg" type="button">Sign Up</Button>
                  </Link>
              </Form>
          </div>
      </div>
  );
}
