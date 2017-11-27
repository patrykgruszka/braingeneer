import React from 'react';
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router';
import Index from './components/page/Index';
import Login from './components/user/Login';
import Logout from './components/user/Logout';
import Register from './components/user/Register';

render(
    <Router history={browserHistory}>
        <Route path="/" component={Index}/>
        <Route path="/login" component={Login}/>
        <Route path="/logout" component={Logout}/>
        <Route path="/register" component={Register}/>
    </Router>,
    document.getElementById('app-container')
);