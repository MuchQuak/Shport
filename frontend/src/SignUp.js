import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate, Link } from "react-router-dom";
import './style/SignUp.css';

export default function SignUp(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  function validateForm() {
    return username.length > 0 && password.length > 0 && email.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if(testNewUser()){

      const newUser = {
        "email": email,
        "username":username,
        "password": password,
      }
      navigate('/LeaguePreferences', {replace: true, state: newUser});
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

                    <Button className="submit-button" id="signup-button" block size="lg" type="submit" disabled={!validateForm()}>Next</Button>
                    
                    <Link to="/Login">
                        <p className="have-account noselect">Already registered? Sign in</p>
                    </Link>
                </Form>
            </div>
        </div>
  );
}