import "./style/app.scss";
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./dashboard/NavBar";
import Dashboard from "./dashboard/Dashboard";
import Settings from "./settings/Settings";
import About from "./dashboard/about/About";
import { getUsername, prefsQuery } from "./login-signup/UserHandler";
import { useQuery } from "react-query";
import { errorSuffix, loadingSuffix } from "./util/Util";

export default function App(props) {
  const [user, setUser] = useState({});
  const [username, setUsername] = useState("Guest");
  const auth_token = props.cookies.auth_token;
  const nameQuery = useQuery(
    ["username", auth_token],
    () => getUsername(auth_token),
    {
      onSuccess: (data) => {
        setUsername(data);
      },
    }
  );
  const prefQuery = useQuery(
    ["prefs", auth_token],
    () => prefsQuery(auth_token),
    {
      onSuccess: (data) => {
        const temp = {
          info: {
            name: username,
          },
          auth_token: props.cookies.auth_token,
          prefs: data,
        };
        setUser(temp);
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
