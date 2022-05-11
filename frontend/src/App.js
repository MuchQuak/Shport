import "./style/app.scss";
import React, { createContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./dashboard/NavBar";
import Dashboard from "./dashboard/Dashboard";
import Settings from "./settings/Settings";
import About from "./dashboard/about/About";
import {
  prefsQuery,
  themeQuery,
  usernameQuery,
} from "./login-signup/UserHandler";
import { useQuery } from "react-query";
import { errorSuffix, loadingSuffix } from "./util/Util";
import { useNavigate } from "react-router";
import { sportsQuery } from "./dashboard/sport/SportHandler";
import { themes } from "./dashboard/Theme";



const userModel = {
  info: {
    name: "Guest",
    theme: themes.blue,
  },
  auth_token: "",
  prefs: null,
};

export const ThemeContext = createContext(themes.blue);

function SportContext(props) {
  const sportsResult = useQuery(["sports"], () => sportsQuery());
  if (sportsResult.isSuccess) {
    return <Dashboard sports={sportsResult.data} user={props.user} />;
  }
  return loadingSuffix("sports");
}

export default function App(props) {
  const [user, setUser] = useState(userModel);
  const [theme, setTheme] = useState(themes.blue);
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
        const tempUser = { ...user };
        tempUser.info.name = data;
        setUser(tempUser);
      },
    }
  );
  const prefQuery = useQuery(
    ["prefs", auth_token],
    () => prefsQuery(auth_token),
    {
      onSuccess: (data) => {
        const tempUser = { ...user };
        tempUser.auth_token = props.cookies.auth_token;
        tempUser.prefs = data;
        setUser(tempUser);
      },
    }
  );
  const thQuery = useQuery(
    ["theme", auth_token],
    () => themeQuery(auth_token),
    {
      onSuccess: (data) => {
        if (data && data !== "") {
          setTheme(themes[data]);
        }
      },
      refetchOnWindowFocus: false,
      refetchOnmount: false,
      refetchOnReconnect: false,
    }
  );
  if (prefQuery.isLoading || nameQuery.isLoading || thQuery.isLoading) {
    return loadingSuffix("app");
  } else if (prefQuery.isError) {
    return errorSuffix("retrieving preferences");
  } else if (nameQuery.isError) {
    return errorSuffix("retrieving name");
  } else if (thQuery.isError) {
    //return errorSuffix("retrieving theme")
    // NO-OP, the program should be able to use the default theme just fine.
  }
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <NavBar user={user} removeCookie={props.removeCookie} />
      <Routes>
        <Route index element={<SportContext user={user} />} />
        <Route
          path="settings"
          element={<Settings user={user} setUser={setUser} />}
        />
        <Route path="about" element={<About />} />
      </Routes>
    </ThemeContext.Provider>
  );
}

/*
export async function newsQuery(interests) {
  const query = interests.length > 0 ? "(" + interests.join(") OR (") + ")" : "sports";
  return await axios.get("http://localhost:5000/news/" + query).then((res) => {
    return verify(res);
  });
}

// returns an object where article list can be accessed through data attribute (make sure isSuccess first)
export async function useNews(key, interests) {
  return useQuery([key, interests], () => newsQuery(interests), {
    refetchOnWindowFocus: false,
    refetchOnmount: false,
    refetchOnReconnect: false,
  });
}
 */
