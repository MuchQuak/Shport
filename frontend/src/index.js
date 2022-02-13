import ReactDOM from 'react-dom';
import {
   BrowserRouter,
   Routes,
   Route
 } from "react-router-dom";// Keeps track of

import './style/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import About from './About';
import ProjectTeam from './ProjectTeam';
import Login from './Login';
import SignUp from './SignUp';
import Preferences from './Preferences';

ReactDOM.render(
   <BrowserRouter>
   <Routes>
     <Route path="/" element={<App />} />
     <Route path="About" element={<About />} />
     <Route path="ProjectTeam" element={<ProjectTeam />} />
     <Route path="Login" element={<Login />} />
     <Route path="SignUp" element={<SignUp />} />
     <Route path="Preferences" element={<Preferences />} />

   </Routes>
 </BrowserRouter>, 
   document.getElementById('root'
));

