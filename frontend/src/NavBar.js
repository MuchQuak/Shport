import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
    return (
      <div className="header">
        <h1 className="header-text">DashBoard</h1>
          <Link to="/About">About Us</Link> | {" "}
          <Link to="/ProjectTeam">Our Team</Link> | {" "}
          <Link to="/Login">Login</Link>
      </div>
    );
  }