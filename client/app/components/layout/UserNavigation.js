import React from 'react';
import PropTypes from 'prop-types';
import {browserHistory} from 'react-router';
import request from '../../services/request';
import {Nav, NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import alertify from 'alertify.js';
import translate from '../../i18n/translate.js';

class UserNavigation extends React.Component {
    constructor(props) {
        super(props);
    }

    logout(event) {
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

        event.preventDefault();
    }

    render() {
        const user = this.props.user;
        let components = [];

        if (user && user.email) {
            components.push(
                <LinkContainer key="profile" to={{pathname: '/profile'}}>
                    <NavItem eventKey={1} href="#">{this.props.strings.hello}, {user.email}</NavItem>
                </LinkContainer>,
                <LinkContainer key="logout" to={{pathname: '/logout'}}>
                    <NavItem eventKey={1} href="#">{this.props.strings.logout}</NavItem>
                </LinkContainer>)
        } else {
            components.push(
                <LinkContainer key="login" to={{pathname: '/login'}}>
                    <NavItem eventKey={1} href="#">{this.props.strings.login}</NavItem>
                </LinkContainer>,
                <LinkContainer key="register" to={{pathname: '/register'}}>
                    <NavItem eventKey={1} href="#">{this.props.strings.register}</NavItem>
                </LinkContainer>)
        }

        return (<Nav className="navbar-right">{components}</Nav>);
    }
}

UserNavigation.propTypes = {
    strings: PropTypes.object
};

UserNavigation.defaultProps = {

};

UserNavigation.defaultProps = {
    strings: {
        hello: 'Helloooo',
        logout: 'Logout',
        login: 'Login',
        register: 'Register',
    }
};

export default translate('layout/UserNavigation')(UserNavigation);