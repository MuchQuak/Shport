import ReactDOM from 'react-dom';
import {
   BrowserRouter,
   Routes,
   Route
 } from "react-router-dom";// Keeps track of

import './style/index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import About from './About';
import Login from './Login';
import SignUp from './SignUp';
import Settings from './Settings';
import {QueryClient, QueryClientProvider} from "react-query";

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

