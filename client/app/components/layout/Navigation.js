import React from 'react';
import PropTypes from 'prop-types';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {Link} from 'react-router';
import {LinkContainer} from 'react-router-bootstrap';
import UserNavigation from './UserNavigation';
import request from '../../services/request';
import translate from '../../i18n/translate.js';

class Navigation extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: false
        }
    }

    componentDidMount() {
        const component = this;

        request('/api/my/profile', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        }).then(user => {
            component.setState({...component.state, user: user});
        });
    }

    render() {
        return (<Navbar inverse={true} className="navigation">
            <Navbar.Header>
                <Navbar.Brand>
                    <Link to="/">Braingeneer</Link>
                </Navbar.Brand>
            </Navbar.Header>
            <Nav>
                <LinkContainer to={{pathname: '/'}}>
                    <NavItem eventKey={1} href="#">{this.props.strings.exercises}</NavItem>
                </LinkContainer>
            </Nav>
            <UserNavigation user={this.state.user}/>
        </Navbar>);
    }
}

Navigation.propTypes = {
    strings: PropTypes.object
};

Navigation.defaultProps = {
    strings: {
        exercises: 'Exercises'
    }
};

export default translate('layout/Navigation')(Navigation);