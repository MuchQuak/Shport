import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './SignUp.css';


export default function Login() {
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
    <Container fluid="false">
      <Row>
        <Col lg={12} md={8} ><br></br></Col>
      </Row>
      <Row>
        <Col lg={12} ><br></br></Col>
      </Row>
      <Row>
        <Col lg={{ span: 4, offset: 4 }}>
        <div className="SignUp">
        <Form onSubmit={handleSubmit}>
          <h1>Sign Up!</h1>
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
            placeholder="Email"
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

            
            <p>Perferences</p>

            {['checkbox'].map((type) => (
            <div key={`default-${type}`} className="mb-3">
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

          <button type="submit" className="btn btn-primary btn-block"  disabled={!validateForm()}>Sign Up</button>
            <p className="forgot-password text-right">
                Already registered <a href="#">sign in?</a>
            </p>
      </Form>

  </div>
    </Col>
  </Row>
    </Container>
  );
}
