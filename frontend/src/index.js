import ReactDOM from "react-dom";
import { CookiesProvider, useCookies } from "react-cookie";
import "./style/index.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import App from "./App";
import SignUp from "./login-signup/SignUp";
import Login from "./login-signup/Login";

const queryClient = new QueryClient();

export const BACKEND = "https://shport-backend.herokuapp.com/";
//export const BACKEND = "http://localhost:5000/";

function Root() {
  const [cookies, setCookie, removeCookie] = useCookies(["auth_token"]);
  function setToken(token) {
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
);