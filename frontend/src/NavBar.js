import './NavBar.css';
import { Link, useLocation } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown'

export default function NavBar() {
  const location = useLocation();

  if (location.state == null) {
    location.state = {};
    location.state.username = "[ Username ]";
  }

  return (
    <div className="header">
        <div className="header-nav">
          <div className="header-left">
            <Link to="/"><h1 className="header-text">Dashboard</h1></Link>
          </div>
          <div className="header-right">
            <Link className="header-link" to="/About" id='header-about'>About Us</Link>
            <Link className="header-link" to="/ProjectTeam" id='header-team'>Our Team</Link>
          {/* <Link className="header-link" to="/Login" id='header-login'>Sign Out</Link>  */}
            <Dropdown>
              <Dropdown.Toggle className="header-link" id="dropdown-basic" />
              <Dropdown.Menu>
                {/*  Doesn't currently work*/}
                <Dropdown>Hello, {location.state.username}</Dropdown>
                <Dropdown.Item href="#/action-2">Settings</Dropdown.Item>
                <Dropdown.Item href="/Login">Sign Out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
    </div>
  );
}
