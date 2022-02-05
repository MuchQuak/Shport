import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
//import Login from './Login';

ReactDOM.render(<App />, document.getElementById('root'));

/*
   -- Login Page Testing --
   Need to uncomment this but comment out the ReactDom.render from above
   Also need to call [npm install react-bootstrap bootstrap@5.1.3] on the frontend to install react-bootstrap*/

//ReactDOM.render(<Login />, document.getElementById('root'));