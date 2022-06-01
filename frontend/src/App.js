import "./style/app.scss";
import React, { createContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./dashboard/NavBar";
import Dashboard from "./dashboard/Dashboard";
import Settings from "./settings/Settings";
import About from "./about/About";
import {
  prefsQuery,
  themeQuery,
  usernameQuery,
} from "./user/UserHandler";
import { useQuery } from "react-query";
import { errorSuffix, loadingSuffix } from "./util/Util";
import { useNavigate } from "react-router";
import { sportsQuery } from "./dashboard/sport/SportHandler";
import { themes } from "./dashboard/Theme";
import UserSearch from "./user/UserSearch";

const userModel = {
  info: {
    name: "Guest",
    theme: themes.blue,
  },
  auth_token: "",
  prefs: null,
};

export const ThemeContext = createContext(themes.blue);
export const SportContext = createContext([]);
export const UserContext = createContext({});

function ContextProvider(props) {
  const sportsResult = useQuery(["sports"], () => sportsQuery());
  return sportsResult.isLoading ? loadingSuffix("sports") :
      <SportContext.Provider value={sportsResult.data}>
        {props.children};
      </SportContext.Provider>
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
      //console.log(auth_token);
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
  } else if (user === undefined || user.prefs === undefined) {
    return loadingSuffix("user");
  } else if (prefQuery.isError) {
    return errorSuffix("retrieving preferences");
  } else if (nameQuery.isError) {
    return errorSuffix("retrieving name");
  } else if (thQuery.isError) {
    //return errorSuffix("retrieving theme")
    // NO-OP, the program should be able to use the default theme just fine.
  }
  return (
      <UserContext.Provider value={{ user, setUser }}>
        <ThemeContext.Provider value={{ theme, setTheme }}>
          <ContextProvider>
            <NavBar removeCookie={props.removeCookie} />
            <Routes>
              <Route index element={<Dashboard />} />
              <Route path="settings" element={<Settings cookies={props.cookies} removeCookie={props.removeCookie} />}/>
              <Route path="about" element={<About />} />
              <Route path="usersearch" element={<UserSearch />} />
            </Routes>
          </ContextProvider>
        </ThemeContext.Provider>
      </UserContext.Provider>
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
