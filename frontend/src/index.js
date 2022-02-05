import React from 'react';
import ReactDOM from 'react-dom';
import {
   BrowserRouter,
   Routes,
   Route
 } from "react-router-dom";// Keeps track of

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';

import About from './About';
import ProjectTeam from './ProjectTeam';
import Login from './Login';
import SignUp from './SignUp';


<<<<<<< HEAD
ReactDOM.render(
   <BrowserRouter>
   <Routes>
     <Route path="/" element={<App />} />
     <Route path="About" element={<About />} />
     <Route path="ProjectTeam" element={<ProjectTeam />} />
     <Route path="Login" element={<Login />} />
     <Route path="SignUp" element={<SignUp />} />
   </Routes>
 </BrowserRouter>, 
   document.getElementById('root'
));
=======
/*
   -- Login Page Testing --
   Need to uncomment this but comment out the ReactDom.render from above
   Also need to call [npm install react-bootstrap bootstrap@5.1.3] on the frontend to install react-bootstrap*/

ReactDOM.render(<App />, document.getElementById('root'));
>>>>>>> 1f67f982ce060828c9031077294426c9ca9a277b
