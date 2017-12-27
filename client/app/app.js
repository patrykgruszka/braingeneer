import React from 'react';
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router';
import Index from './components/page/Index';
import Exercise from './components/exercise/Exercise';
import Login from './components/user/Login';
import Logout from './components/user/Logout';
import Register from './components/user/Register';
import Profile from './components/user/Profile';
import Patients from './components/user/Patients';
import AddPatient from './components/user/AddPatient';
import UserScores from './components/user/Scores';

render(
    <Router history={browserHistory}>
        <Route path="/" component={Index}/>
        <Route path="/login" component={Login}/>
        <Route path="/logout" component={Logout}/>
        <Route path="/register" component={Register}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/patients" component={Patients}/>
        <Route path="/patients/add" component={AddPatient}/>
        <Route path="/users/:user/scores" component={UserScores}/>
        <Route path="/exercise/:exerciseId" component={Exercise}/>
    </Router>,
    document.getElementById('app-container')
);