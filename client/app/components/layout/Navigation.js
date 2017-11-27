import React from 'react';
import {browserHistory} from 'react-router';
import request from '../../services/request';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import alertify from 'alertify.js';

class Navigation extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: false
        }
    }

    componentDidMount() {
        const component = this;

        request('/api/profile', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        }).then(user => {
            component.setState({user: user});
        });
    }

    render() {
        return (<Navbar inverse={true}>
            <Navbar.Header>
                <Navbar.Brand>
                    <a href="#">Braingeneer</a>
                </Navbar.Brand>
            </Navbar.Header>
            <div>
            </div>
            <Nav>
                <LinkContainer to={{pathname: '/'}}>
                    <NavItem eventKey={1} href="#">Index</NavItem>
                </LinkContainer>
            </Nav>
            <UserNavigation user={this.state.user}/>
        </Navbar>);
    }
}

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
                    <NavItem eventKey={1} href="#">Hello, {user.email}</NavItem>
                </LinkContainer>,
                <LinkContainer key="logout" to={{pathname: '/logout'}}>
                    <NavItem eventKey={1} href="#">Logout</NavItem>
                </LinkContainer>)
        } else {
            components.push(
                <LinkContainer key="login" to={{pathname: '/login'}}>
                    <NavItem eventKey={1} href="#">Login</NavItem>
                </LinkContainer>,
                <LinkContainer key="register" to={{pathname: '/register'}}>
                    <NavItem eventKey={1} href="#">Register</NavItem>
                </LinkContainer>)
        }

        return (<Nav className="navbar-right">{components}</Nav>);
    }
}

export default Navigation;