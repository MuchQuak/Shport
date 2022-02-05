import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import './Login.css';



export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function validateForm() {
    let emailValidation = validateEmail();
    let passwordValidation = validatePassword();
    return emailValidation && passwordValidation;
  }

  function validatePassword(){
    if(password.length > 0){
        return 1;
    }
    return 0;
  }

  function validateEmail(){
    if(email.length > 0){
        return 1;
    }
    return 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    navigate('../', {replace:true});
    alert("email: " + email + "\npassword: " + password);
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
