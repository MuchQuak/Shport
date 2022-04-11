import ReactDOM from "react-dom";
import { CookiesProvider } from "react-cookie";
import Root from "./Root";
import "./style/index.scss";
import "bootstrap/dist/css/bootstrap.min.css";

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
