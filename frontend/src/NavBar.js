import React from "react";
import './NavBar.css';
import { Link } from "react-router-dom";

export default function NavBar() {
    return (
      <div className="header">
        <h1 className="header-text">Dashboard</h1>
          <div className="header-nav">
            <Link className="header-link" to="/About">About Us</Link> | {" "}
            <Link className="header-link" to="/ProjectTeam">Our Team</Link> | {" "}
            <Link className="header-link" to="/Login">Login</Link>
          </div>
      </div>
    );
  }