import * as React from 'react'
import {
    useState, useEffect
}  from 'react';
import * as ReactDOM from "react-dom";
import { CookiesProvider } from "react-cookie";
import "./style/index.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style/app.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";
import Login from "./login-signup/Login";
import SignUp from "./login-signup/SignUp";
import "./style/index.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCookies } from "react-cookie";

const queryClient = new QueryClient();

export default function Root() {
    const [cookies, setCookie, removeCookie] = useCookies(["auth_token"]);
    function setToken(token: any) {
        setCookie("auth_token", token, {
            maxAge: 18000,
            path: "/",
        });
    }
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/*"
                        element={<App cookies={cookies} removeCookie={removeCookie} />}
                    />
                    <Route path="login" element={<Login setToken={setToken} />} />
                    <Route path="signup" element={<SignUp />} />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

ReactDOM.render(
  <CookiesProvider>
    <Root />
  </CookiesProvider>,
  document.getElementById("root")
  /*
    <QueryClientProvider client={queryClient}>
        <CookiesProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/*" element={<App />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<SignUp />} />
            </Routes>
        </BrowserRouter>
        </CookiesProvider>
    </QueryClientProvider>, document.getElementById('root')
    */
);
