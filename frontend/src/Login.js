import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import './Login.css';

export default function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  async function validateLogin(){
    try {
        const url = 'http://localhost:5000/users?username=' + username + '&password=' + password;
        const response = await axios.get(url);
        if (response.status === 201){
          navigate('../', {replace:true, state:{username}});         
          return true;
        }
        return false;  
    }
    catch (error){
        console.log(error);
        return false;
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    validateLogin();
  }

  return (
      <div className='login-content'>
          <h1 className="welcome">Welcome to Sports Dashboard</h1>
          <div className="login">
              <h1 className="websiteName">Log In</h1>
              <Form onSubmit={handleSubmit}>
                  <Form.Group className="usernameForm" size="lg" controlId="username">
                      <Form.Label>Username</Form.Label>
                      <Form.Control autoFocus type="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
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
