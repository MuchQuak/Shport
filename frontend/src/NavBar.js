import './NavBar.css';
import { Link } from "react-router-dom";

export default function NavBar() {
    return (
      <div className="header">
        <h1 className="header-text">Dashboard</h1>
          <div className="header-nav">
            <Link className="header-link" to="/Login" id='header-login'>Login</Link>
            <Link className="header-link" to="/About" id='header-about'>About Us</Link>
            <Link className="header-link" to="/ProjectTeam" id='header-team'>Our Team</Link>
          </div>
      </div>
    );
}