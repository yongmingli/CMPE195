

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';
import * as serviceWorker from './serviceWorker.js';
import Login from './components/Login/Login';
import Router from './route'
import {
  Route,
  hashHistory
} from 'react-router';

 
 ReactDOM.render(<Router/>, document.getElementById('root'))   