import './NavBar.css';
import { Link } from "react-router-dom";

export default function NavBar() {
    return (
      <div className="header">
          <div className="header-nav">
            <div className="header-left">
              <Link to="/"><h1 className="header-text">Dashboard</h1></Link>
            </div>
            <div className="header-right">
              <Link className="header-link" to="/Login" id='header-login'>Login</Link>
              <Link className="header-link" to="/About" id='header-about'>About Us</Link>
              <Link className="header-link" to="/ProjectTeam" id='header-team'>Our Team</Link>
            </div>
          </div>
      </div>
    );
}