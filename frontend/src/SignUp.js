import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate, Link } from "react-router-dom";
import './SignUp.css';


export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();


  function validateForm() {
    let usernameValidation = validateUsername();
    let emailValidation = validateEmail();
    let passwordValidation = validatePassword();
    return usernameValidation && emailValidation && passwordValidation;
  }

  function validateUsername(){
    if(username.length > 0){
        return 1;
    }
    return 0;
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
    alert("username: " + username + "\nemail: " + email + "\npassword: " + password);
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
