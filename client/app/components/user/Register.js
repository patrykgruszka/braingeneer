import React from 'react';
import PropTypes from 'prop-types';
import Navigation from '../layout/Navigation';
import PageHeader from '../layout/PageHeader';
import { browserHistory } from 'react-router';
import request from '../../services/request';
import translate from '../../i18n/translate';
import alertify from 'alertify.js';


class Register extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            role: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        request('/api/users', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(this.state)
        }).then(data => {
            browserHistory.push('/login');
            alertify.success(data.message);
        }).catch(data => {
            alertify.error(data.message);
        });
        event.preventDefault();
    }

    render(){
        return (<div>
            <Navigation/>
            <PageHeader title={this.props.strings.pageTitle}/>
            <form onSubmit={this.handleSubmit} className="container">
                <div className="row">
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label htmlFor="login-email-input">{this.props.strings.email}</label>
                            <input type="email" name="email" className="form-control" id="login-email-input"
                                   value={this.props.email}
                                   onChange={this.handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="login-password-input">{this.props.strings.password}</label>
                            <input type="password" name="password" className="form-control" id="login-password-input"
                                   value={this.props.password}
                                   onChange={this.handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="login-role-input">{this.props.strings.role}</label>
                            <select name="role" className="form-control" id="login-role-input"
                                   value={this.props.role}
                                   onChange={this.handleInputChange}>
                                <option value="user">{this.props.strings.user}</option>
                                <option value="supervisor">{this.props.strings.supervisor}</option>
                            </select>
                        </div>
                        <div>
                            <button type="submit" className="btn btn-success">{this.props.strings.submit}</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>);
    }
}

Register.propTypes = {
    strings: PropTypes.object
};

Register.defaultProps = {
    strings: {
        pageTitle: 'Register',
        email: 'Address e-mail',
        password: 'Password',
        role: 'Role',
        user: 'User',
        supervisor: 'Supervisor',
        submit: 'Submit'
    }
};

export default translate('user/Register')(Register);
