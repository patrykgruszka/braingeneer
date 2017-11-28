import React from 'react';
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router';
import Index from './components/page/Index';
import Login from './components/user/Login';
import Logout from './components/user/Logout';
import Register from './components/user/Register';
import Profile from './components/user/Profile';

render(
    <Router history={browserHistory}>
        <Route path="/" component={Index}/>
        <Route path="/login" component={Login}/>
        <Route path="/logout" component={Logout}/>
        <Route path="/register" component={Register}/>
        <Route path="/profile" component={Profile}/>
    </Router>,
    document.getElementById('app-container')
);