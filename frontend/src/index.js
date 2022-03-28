import ReactDOM from 'react-dom';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "react-query";
import App from './App';
import Login from './login-signup/Login';
import SignUp from './login-signup/SignUp';
import './style/index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

// For React Query context
const queryClient = new QueryClient();

ReactDOM.render(
   <QueryClientProvider client={queryClient}>
       <BrowserRouter>
           <Routes>
             <Route path="/*" element={<App />} />
             <Route path="login" element={<Login />} />
             <Route path="signup" element={<SignUp />} />
           </Routes>
       </BrowserRouter>
   </QueryClientProvider>, document.getElementById('root')
);