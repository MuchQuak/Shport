import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import "../style/login-signup.scss";
import Modal from "react-modal";
import CloseButton from "react-bootstrap/CloseButton";
import { modalStyle } from "./SignUp";
import {BACKEND} from "../index";

const alertMessage =
  "The username or password you entered was incorrect. Please try again.";

export default function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAlertVisible, setAlertVisible] = useState(false);
  const navigate = useNavigate();

  Modal.setAppElement("#root");

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  async function validateLogin() {
    try {
      const url = BACKEND + "login";
      const response = await axios.post(url, {
        username: username,
        password: password,
      });

      props.setToken(response.data);
      if (response.status === 201) {
        navigate("../");
        return response.data;
      }
    } catch (error) {
      console.log(error);
      openAlert();
      return error.data;
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    validateLogin();
  }

  function openAlert() {
    setAlertVisible(true);
  }

  function closeAlert() {
    setAlertVisible(false);
  }

  return (
    <div className="centered-boxed-wrapper">
      <h1 className="welcome">Welcome to Shport</h1>
      <div className="boxed">
        <h1 className="boxed-header">Log In</h1>
        <Modal
          isOpen={isAlertVisible}
          onRequestClose={closeAlert}
          style={modalStyle}
          contentLabel="alert"
        >
          <div className="dialog" id="error-dialog">
            <div className="dialog-header" id="error-header">
              <div className="leftSpace" />
              <div className="middleSpace">
                <p>Failed to log in</p>
              </div>
              <div className="rightSpace">
                <CloseButton
                  className="closeButton"
                  variant="white"
                  aria-label="Hide"
                  onClick={closeAlert}
                />
              </div>
            </div>
            <div className="dialog-body">
              <p>{alertMessage}</p>
            </div>
          </div>
        </Modal>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="inputForm" size="lg" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              autoFocus
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="inputForm" size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <div className="button-wrapper">
            <button
              className="button margin-bottom-5"
              id="login"
              type="submit"
              disabled={!validateForm()}
            >
              Login
            </button>
          </div>
          <Link to="/signup" className="signup-link">
            <div className="button-wrapper">
              <button
                className="button"
                id="signup"
                size="lg"
                type="button"
              >
                Sign Up
              </button>
            </div>
          </Link>
        </Form>
      </div>
    </div>
  );
}
