import "./style/app.scss";
import React, {useEffect, useState} from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./dashboard/NavBar";
import Dashboard from "./dashboard/Dashboard";
import Settings from "./settings/Settings";
import About from "./dashboard/about/About";
import { prefsQuery, usernameQuery} from "./login-signup/UserHandler";
import { useQuery } from "react-query";
import { errorSuffix, loadingSuffix } from "./util/Util";
import {useNavigate} from "react-router";

const userModel = {
  info: {
    name: "Guest",
  },
  auth_token: "",
  prefs: null,
};

export default function App(props) {
  const [user, setUser] = useState(userModel);
  const navigate = useNavigate();
  const auth_token = props.cookies.auth_token;
  useEffect(() => {
    if (auth_token === undefined || auth_token === "") {
      navigate("/login");
    } else {
      console.log(auth_token);
    }
  });
  const nameQuery = useQuery(
      ["username", auth_token],
      () => usernameQuery(auth_token),
      {
        onSuccess: (data) => {
          const tempUser = { ...user }
          tempUser.info.name = data;
          setUser(tempUser);
        }
      }
  );
  const prefQuery = useQuery(
      ["prefs", auth_token],
      () => prefsQuery(auth_token),
      {
        onSuccess: (data) => {
          const tempUser = { ...user }
          tempUser.auth_token = props.cookies.auth_token;
          tempUser.prefs = data;
          setUser(tempUser);
        },
      }
  );
  if (prefQuery.isLoading || nameQuery.isLoading) {
    return loadingSuffix("app");
  } else if (prefQuery.isError) {
    return errorSuffix(prefQuery.error);
  } else if (nameQuery.isError) {
    return errorSuffix(nameQuery.error);
  }
  return (
      <>
        <NavBar user={user} removeCookie={props.removeCookie} />
        <Routes>
          <Route index element={<Dashboard user={user} />} />
          <Route
              path="settings"
              element={<Settings user={user} setUser={setUser} />}
          />
          <Route path="about" element={<About />} />
        </Routes>
      </>
  );
}