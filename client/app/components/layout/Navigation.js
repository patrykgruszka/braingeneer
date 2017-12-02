import React from 'react';
import request from '../../services/request';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import UserNavigation from './UserNavigation';

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

export default Navigation;