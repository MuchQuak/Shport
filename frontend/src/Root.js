import './style/app.scss';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "react-query";
import App from './App';
import Login from './login-signup/Login';
import SignUp from './login-signup/SignUp';
import './style/index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useCookies } from 'react-cookie'

const queryClient = new QueryClient();

export default function Root() {
    const [cookies, setCookie] = useCookies(['auth_token']);

    function setToken(token) {
        setCookie('auth_token', token, 
            {
                maxAge: 18000,
                path: '/'
            }
        )
    }

    return (
        <>
            <QueryClientProvider client={queryClient}>
                    <BrowserRouter>
                        <Routes>
                        <Route path="/*" element={<App cookies={cookies}/>} />
                        <Route path="login" element={<Login setToken = {setToken}/>} />
                        <Route path="signup" element={<SignUp />} />
                        </Routes>
                    </BrowserRouter>
            </QueryClientProvider>
        </>
    );
}