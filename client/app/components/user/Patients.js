import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';
import Navigation from '../layout/Navigation';
import PageHeader from '../layout/PageHeader';
import request from '../../services/request';
import translate from '../../i18n/translate';

class Patients extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            patients: []
        };
    }

    componentDidMount() {
        const component = this;

        request('/api/my/patients', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        }).then(patients => {
            component.setState({...component.state, patients: patients});
        });
    }

    render(){
        const components = [];

        this.state.patients.forEach(function(patient) {
            components.push(
                <tr key={patient._id}>
                    <td>{patient.email}</td>
                    <td>{patient.name || this.props.strings.undefined}</td>
                    <td>todo</td>
                </tr>
            );
        }.bind(this));

        return (<div>
            <Navigation/>
            <PageHeader title={this.props.strings.pageTitle}/>
            <div className="container">
                {components.length === 0 ?
                    <div className="alert alert-info">{this.props.strings.noPatientsText}</div> :
                    <table className="table">
                        <thead>
                            <tr>
                                <td>{this.props.strings.email}</td>
                                <td>{this.props.strings.name}</td>
                                <td>{this.props.strings.actions}</td>
                            </tr>
                        </thead>
                        <tbody>
                        {components}
                        </tbody>
                    </table>
                }
                <Link className="btn btn-success" to="/patients/add">{this.props.strings.addPatient}</Link>
            </div>
        </div>);
    }
}

Patients.propTypes = {
    strings: PropTypes.object
};

Patients.defaultProps = {
    strings: {
        pageTitle: 'Patients list',
        noPatientsText: 'Your patients list is empty.',
        name: 'Name',
        email: 'E-mail',
        actions: 'Actions',
        undefined: '---',
        addPatient: 'Add patient'
    }
};

export default translate('user/Patients')(Patients);
