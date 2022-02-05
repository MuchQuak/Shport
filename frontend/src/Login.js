import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './Login.css';


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    <div className="Login">
    <h1 className="websiteName">SPORTS</h1>
      <Form onSubmit={handleSubmit}>
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
        <Button className="submitButton" block size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
        <Button className="signUp" block size="lg" type="button">
          Sign Up
        </Button>
      </Form>
    </div>
    </Col>
  </Row>
    </Container>
  );
}
