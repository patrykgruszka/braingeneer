import React from 'react';
import PropTypes from 'prop-types';
import Navigation from '../layout/Navigation';
import PageHeader from '../layout/PageHeader';
import request from '../../services/request';
import translate from '../../i18n/translate';
import alertify from 'alertify.js';

class Profile extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            name: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
            component.setState(user);
        });
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
        request('/api/profile', {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(this.state)
        }).then(data => {
            alertify.success(data.message);
        }).catch(data => {
            alertify.error(data.message);
        });

        event.preventDefault();
    }

    render(){
        return (<div>
            <Navigation/>
            <PageHeader title={this.props.strings.profile + ' - ' + this.state.email}/>
            <form onSubmit={this.handleSubmit} className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-6">
                        <div className="form-group">
                            <label htmlFor="profile-email-input">{this.props.strings.email}</label>
                            <input type="email" name="email" className="form-control" id="profile-email-input"
                                   value={this.state.email} disabled />
                        </div>
                        <div className="form-group">
                            <label htmlFor="profile-name-input">{this.props.strings.name}</label>
                            <input name="name" className="form-control" id="profile-name-input"
                                   value={this.state.name}
                                   onChange={this.handleInputChange} />
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

Profile.propTypes = {
    strings: PropTypes.object
};

Profile.defaultProps = {
    strings: {
        profile: 'Profile',
        email: 'Address e-mail',
        name: 'Name',
        submit: 'Submit'
    }
};

export default translate('user/Profile')(Profile);
