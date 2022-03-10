import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { ReactDialogBox } from 'react-js-dialog-box'
import 'react-js-dialog-box/dist/index.css'
import './style/Login.scss';

export default function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage] = useState("Invalid! Incorrect Username or Password");
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
      <div className='login-content'>
          <h1 className="welcome">Welcome to Sports Dashboard</h1>
          <div className="login">
              <h1 className="websiteName">Log In</h1>
              <Form onSubmit={handleSubmit}>
                  <Form.Group className="inputForm" size="lg" controlId="username">
                      <Form.Label>Username</Form.Label>
                      <Form.Control autoFocus type="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                  </Form.Group>

                  <div>
                    {isAlertVisible && (
                      <>
                        <ReactDialogBox
                          closeBox={closeBox}
                          modalWidth='60%'
                          headerBackgroundColor='blue'
                          headerTextColor='white'
                          headerHeight='65'
                          closeButtonColor='white'
                          bodyBackgroundColor='white'
                          bodyTextColor='black'
                          bodyHeight='200px'
                          headerText='Invalid'
                        >
                          <div>
                            <h1>{alertMessage}</h1>
                          </div>
                        </ReactDialogBox>
                      </>
                    )}
                  </div>

                  <Form.Group className="inputForm" size="lg" controlId="password">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                  </Form.Group>
                    <Button className="login-button" id="login" size="lg" type="submit" disabled={!validateForm()}>Login</Button>
                  <Link to="/SignUp" className="login-button">
                    <Button className="login-button" id="signup" size="lg" type="button">Sign Up</Button>
                  </Link>
              </Form>
          </div>
      </div>
  );
}