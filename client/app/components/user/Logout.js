import React from 'react';
import Navigation from '../layout/Navigation';
import PageHeader from '../layout/PageHeader';
import { browserHistory } from 'react-router';
import request from '../../services/request';
import alertify from 'alertify.js';

class Logout extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        request('/api/logout', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        }).then(data => {
            browserHistory.push('/');
            alertify.success(data.message);
        });
    }

    render() {
        return (<div>
            <Navigation/>
            <PageHeader title="Logging out..."/>
        </div>);
    }
}

export default Logout;