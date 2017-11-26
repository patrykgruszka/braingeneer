import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class Navigation extends React.Component {
    render() {
        return(<Navbar>
            <Navbar.Header>
                <Navbar.Brand>
                    <a href="#">Braingeneer</a>
                </Navbar.Brand>
            </Navbar.Header>
            <Nav>
                <LinkContainer to={{ pathname: '/'}}>
                    <NavItem eventKey={1} href="#">Index</NavItem>
                </LinkContainer>
                <LinkContainer to={{ pathname: '/login'}}>
                    <NavItem eventKey={1} href="#">Login</NavItem>
                </LinkContainer>
                <LinkContainer to={{ pathname: '/register'}}>
                    <NavItem eventKey={1} href="#">Register</NavItem>
                </LinkContainer>
            </Nav>
        </Navbar>);
    }
}

export default Navigation;