import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { ReactDialogBox } from 'react-js-dialog-box'
import 'react-js-dialog-box/dist/index.css'
import './style/login-signup.scss';

const alertMessage = "The username or password you entered was incorrect. Please try again.";

export default function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAlertVisible, setVisible] = useState(false);

  const navigate = useNavigate();

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  async function validateLogin(){
    try {
        const url = 'http://localhost:5000/login';
        const response = await axios.post(url, {"username":username,"password":password});
        
        if (response.status === 201){
          navigate('../', {replace:true, state:{username}});    
          return response.data;
        }
    }
    catch (error){
      console.log(error);
      setVisible(true);
      return error.data;
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    validateLogin();
  }

  function closeBox(){
    setVisible(false);
  }

  return (
      <div className='centered-boxed-wrapper'>
          <h1 className="welcome">Welcome to Sports Dashboard</h1>
          <div className="boxed">
              <h1 className="boxed-header">Log In</h1>
              {isAlertVisible && (
                  <>
                      <ReactDialogBox
                          closeBox={closeBox}
                          modalWidth='45%'
                          headerBackgroundColor='#ff4747'
                          headerTextColor='white'
                          headerHeight='auto'
                          closeButtonColor='white'
                          bodyBackgroundColor='white'
                          bodyTextColor='black'
                          bodyHeight='auto'
                          headerText='Failed to log in'
                      >
                          <p>{alertMessage}</p>
                      </ReactDialogBox>
                  </>
              )}
              <Form onSubmit={handleSubmit}>
                  <Form.Group className="inputForm" size="lg" controlId="username">
                      <Form.Label>Username</Form.Label>
                      <Form.Control autoFocus type="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                  </Form.Group>
                  <Form.Group className="inputForm" size="lg" controlId="password">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                  </Form.Group>
                  <div className='button-wrapper'>
                    <Button className="themed-button margin-bottom-5" id="login" size="lg" type="submit" disabled={!validateForm()}>Login</Button>
                  </div>
                  <Link to="/SignUp" className='signup-link'>
                      <div className='button-wrapper'>
                        <Button className="themed-button" id="signup" size="lg" type="button">Sign Up</Button>
                      </div>
                  </Link>
              </Form>
          </div>
      </div>
  );
}