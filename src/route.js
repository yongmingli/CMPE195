import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import App from './App';
import Login from './components/Login/Login';
import Register from './components/Login/Register';

const BasicRoute = () => (
    <HashRouter>
        <Switch>
            <Route exact path="/" component={App}/>
            <Route exact path="/Login" component={Login}/>
            <Route exact path="/Register" component={Register}/>
        </Switch>
    </HashRouter>
);


export default BasicRoute;