import React from 'react';
import PropTypes from 'prop-types';
import Navigation from '../layout/Navigation';
import PageHeader from '../layout/PageHeader';
import { browserHistory } from 'react-router';
import request from '../../services/request';
import translate from '../../i18n/translate';
import alertify from 'alertify.js';


class AddPatient extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            role: 'user',
            submitted: false
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
        this.setState({submitted: true});
        event.preventDefault();

        request('/api/my/patients', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(this.state)
        }).then(data => {
            browserHistory.push('/patients');
            alertify.success(data.message);
        }).catch(data => {
            alertify.error(data.message);
        });
        event.preventDefault();
    }

    passwordsMatch() {
        return this.state.password === this.state.confirmPassword;
    }

    render(){
        return (<div>
            <Navigation/>
            <PageHeader title={this.props.strings.pageTitle}/>
            <form onSubmit={this.handleSubmit} className="container">
                <div className="row">
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label htmlFor="login-name-input">{this.props.strings.name}</label>
                            <input type="text" name="name" className="form-control" id="login-name-input"
                                   value={this.state.name}
                                   onChange={this.handleInputChange} required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="login-email-input">{this.props.strings.email}</label>
                            <input type="text" name="email" className="form-control" id="login-email-input"
                                   value={this.state.email}
                                   onChange={this.handleInputChange} required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="login-password-input">{this.props.strings.password}</label>
                            <input type="password" name="password" className="form-control" id="login-password-input"
                                   value={this.state.password}
                                   onChange={this.handleInputChange} required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="login-confirm-password-input">{this.props.strings.confirmPassword}</label>
                            <input type="password" name="confirmPassword" className="form-control"
                                   id="login-confirm-password-input"
                                   value={this.state.confirmPassword}
                                   onChange={this.handleInputChange} required/>
                            {this.state.submitted && !this.passwordsMatch() && <p className="text-danger">{this.props.strings.passwordDoesNotMatch}</p>}
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

AddPatient.propTypes = {
    strings: PropTypes.object
};

AddPatient.defaultProps = {
    strings: {
        pageTitle: 'Add new patient',
        name: 'Name',
        email: 'Address e-mail',
        password: 'Password',
        confirmPassword: 'Confirm password',
        submit: 'Submit',
        passwordDoesNotMatch: 'Password does not match'
    }
};

export default translate('user/AddPatient')(AddPatient);
