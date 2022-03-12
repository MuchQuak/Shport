import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate, Link } from "react-router-dom";
import { addUser} from "./UserHandler";
import { ReactDialogBox } from 'react-js-dialog-box'
import 'react-js-dialog-box/dist/index.css'
import './style/login-signup.scss';

export default function SignUp(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [alertMessage] = useState("Username or email already taken.");
  const [isAlertVisible, setVisible] = useState(false);
  const navigate = useNavigate();

  function validateForm() {
    return username.length > 0 &&
        password.length > 0 &&
        email.length > 0 && String(email).includes("@");
  }

  function handleSubmit(event) {
    event.preventDefault();
    testNewUser();
  }

  async function testNewUser(){
    // In our case we look if that username or email have been entered in the database.
    // Do we check that instead in the post method? And return with an error code? I believe so.
    // But perhaps that means we need to post the user, and then set their preferences.

    const newUser = {
      "email": email,
      "username": username,
      "password": password,
      //"prefs" : {"sports" : {}}
    }

    addUser(newUser).then(result => {

      if(result){
        navigate('/LeaguePreferences', {replace: true, state: newUser});
      }
      else{
        setVisible(true);
      }
    });
  }

  function closeBox(){
    setVisible(false);
  }

  return (
        <div className="centered-boxed-wrapper">
            <div className="boxed">
                <h1 className="boxed-header">Sign Up</h1>
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
                            headerText='Failed to sign up'
                        >
                            <p>{alertMessage}</p>
                        </ReactDialogBox>
                    </>
                )}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="inputForm" size="lg" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control autoFocus type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="inputForm" size="lg" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="inputForm" id="passwordForm" size="lg" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Group>
                    <Button className="themed-button " id="signup-button" size="lg" type="submit" disabled={!validateForm()}>Next</Button>
                    <Link to="/Login">
                        <p className="have-account noselect">Already registered? Sign in</p>
                    </Link>
                </Form>
            </div>
        </div>
  );
}