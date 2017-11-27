import React from 'react';
import Navigation from '../layout/Navigation';
import PageHeader from '../layout/PageHeader';
import { browserHistory } from 'react-router';
import request from '../../services/request';
import alertify from 'alertify.js';

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
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
            <PageHeader title="Register - braingeneer"/>
            <form onSubmit={this.handleSubmit} className="container">
                <div className="row">
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label htmlFor="login-email-input">Address e-mail</label>
                            <input type="email" name="email" className="form-control" id="login-email-input"
                                   value={this.props.email}
                                   onChange={this.handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="login-password-input">Password</label>
                            <input type="password" name="password" className="form-control" id="login-password-input"
                                   value={this.props.password}
                                   onChange={this.handleInputChange} />
                        </div>
                        <div>
                            <button type="submit" className="btn btn-success">Submit</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>);
    }
}

export default Login;
