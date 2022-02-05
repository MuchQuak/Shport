import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import './SignUp.css';


export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");  
  const [lastName, setLastName] = useState("");

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
  }

  return (
        <div className="signup-content">
          <div className="signup">
            <h1 className="signup-name">Sign Up!</h1>

            <Form onSubmit={handleSubmit}>
              <Form.Group className="firstnameForm" size="lg" controlId="firstname">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              </Form.Group>

              <Form.Group className="lastnameForm" size="lg" controlId="lastname">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Form.Group>


              <Form.Group size="lg" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  autoFocus
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="passwordForm" size="lg" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
                
              <p className="preferences">Preferences</p>

              {['checkbox'].map((type) => (
                <div key={`default-${type}`} className="mb-3">
                  <Form.Check 
                    type={type}
                    label={`No Preferences`}
                    id={`0`}
                  />

                  <Form.Check 
                    type={type}
                    label={`NBA`}
                    id={`1`}
                  />

                  <Form.Check
                    disabled
                    type={type}
                    label={`NFL`}
                    id={`2`}
                  />

                  <Form.Check
                    disabled
                    type={type}
                    label={`MLB`}
                    id={`3`}
                  />

                </div>
              ))}

              <Button className="submit-button" id="signup-button" block size="lg" type="submit" disabled={!validateForm()}>Sign Up</Button>

              <p className="have-account">Already registered <a href="#">sign in?</a></p>
        </Form>
      </div>
    </div>
  );
}
