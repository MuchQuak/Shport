import "../style/navbar.scss";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import React, { useContext } from "react";
import {ThemeContext, UserContext} from "../App";
import ThemeSelector from "./ThemeSelector";
import { Toaster } from "react-hot-toast";
import { StyleSheet, css } from "aphrodite";

const styles = (th) =>
  StyleSheet.create({
    text: {
      textShadow: "0px 1px 1px " + th.border,
      color: "#FFFFFF",
      ":hover": {
        color: th.accent,
      },
    },
    link: {
      color: th.base,
      ":hover": {
        color: th.border,
      },
    },
    dropdown: {
      backgroundColor: "#FFFFFF",
      color: th.base,
      ":hover": {
        color: th.border,
      },
    },
  });

export function accountIcon() {
  return (
      <svg
          xmlns="http://www.w3.org/2000/svg"
          className="bi bi-person person-icon nomargin"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
      >
        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
      </svg>
  );
}

function searchIcon() {
  return (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search"
           viewBox="0 0 16 16">
        <path
            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
      </svg>
  )
}

export default function NavBar(props) {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const styled = styles(theme);

  function gear() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="bi bi-gear settings-icon nomargin"
        width="16"
        height="16"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
        <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
      </svg>
    );
  }
  function signOut() {
    props.removeCookie("auth_token");
    navigate("/login");
  }
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div
        className="header"
        style={{
          backgroundColor: theme.base,
          boxShadow: "0px 4px " + theme.border,
        }}
      >
        <div className="header-nav">
          <div className="header-left">
            <div className="header-text-link" onClick={() => navigate("/")}>
              <p className={css(styled.text) + " header-text"}>Shport</p>
            </div>
          </div>
          <div className="header-right">
            <ThemeSelector styled={styled} user={user} />
            <p
              className={css(styled.link) + " header-link"}
              id="header-about"
              onClick={() => navigate("/about")}
            >
              About
            </p>
            <Dropdown className="nomargin">
              <Dropdown.Toggle
                className={css(styled.dropdown) + " header-dropdown"}
              >
                {accountIcon()}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Header>Hello, {user.info.name}</Dropdown.Header>
                <Dropdown.Item onClick={() => navigate("/settings")}>
                  <div className="icon-text">{gear()} Settings</div>
                </Dropdown.Item>
                <Dropdown.Item onClick={() => navigate("/usersearch")}>
                  <div className="icon-text">{searchIcon()} User Search</div>
                </Dropdown.Item>
                <Dropdown.Item onClick={signOut}>Sign Out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
    </>
  );
}
