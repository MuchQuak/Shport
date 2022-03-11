import ReactDOM from 'react-dom';
import {
   BrowserRouter,
   Routes,
   Route
 } from "react-router-dom";// Keeps track of

import './style/index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import About from './About';
import Login from './Login';
import SignUp from './SignUp';
import LeaguePreferences from './LeaguePreferences';
import TeamPreferences from './TeamPreferences';
import Settings from './Settings';

ReactDOM.render(
   <BrowserRouter>
   <Routes>
     <Route path="/" element={<App />} />
     <Route path="About" element={<About />} />
     <Route path="Login" element={<Login />} />
     <Route path="SignUp" element={<SignUp />} />
     <Route path="LeaguePreferences" element={<LeaguePreferences />} />
     <Route path="TeamPreferences" element={<TeamPreferences />} />
     <Route path="Settings" element={<Settings/>} />
   </Routes>
 </BrowserRouter>, 
   document.getElementById('root'
));

