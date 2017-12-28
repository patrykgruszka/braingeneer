import React from 'react';
import PropTypes from 'prop-types';
import dateFormat from 'dateformat';
import Navigation from '../layout/Navigation';
import PageHeader from '../layout/PageHeader';
import request from '../../services/request';
import translate from '../../i18n/translate';

class Logs extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {},
            logs: []
        };
    }

    componentDidMount() {
        this.fetchUser(this.props.params.user);
        this.fetchLogs(this.props.params.user);
    }

    componentWillReceiveProps(newProps) {
        this.fetchUser(newProps.params.user);
        this.fetchLogs(newProps.params.user);
    }

    fetchUser(userId) {
        const component = this;

        request('/api/users/' + userId, {
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

    fetchLogs(userId) {
        const component = this;

        request('/api/users/' + userId + '/logs', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        }).then(logs => {
            component.setState({...component.state, logs: logs.reverse()});
        });
    }

    render(){
        const self = this;
        const components = [];

        this.state.logs.forEach(function(record, key) {
            components.push(
                <tr key={record._id}>
                    <td>{key + 1}</td>
                    <td>{self.props.strings[record.event]}</td>
                    <td><span className={`label label-${record.status}`}>{self.props.strings[record.status]}</span></td>
                    <td>{dateFormat(record.date, 'yyyy-mm-dd HH:MM:ss')}</td>
                    <td>{record.details && record.details.message}</td>
                </tr>
            );
        }.bind(this));

        return (<div>
            <Navigation/>
            <PageHeader title={`${this.props.strings.pageTitle}: ${this.state.user.name}`}/>
            <div className="container">
                {components.length === 0 ?
                    <div className="alert alert-info">{this.props.strings.noLogsText}</div> :
                    <table className="table">
                        <thead>
                            <tr>
                                <td>{this.props.strings['No.']}</td>
                                <td>{this.props.strings.event}</td>
                                <td>{this.props.strings.status}</td>
                                <td>{this.props.strings.date}</td>
                                <td>{this.props.strings.details}</td>
                            </tr>
                        </thead>
                        <tbody>
                        {components}
                        </tbody>
                    </table>
                }
            </div>
        </div>);
    }
}

Logs.propTypes = {
    strings: PropTypes.object
};

Logs.defaultProps = {
    strings: {
        pageTitle: 'Activity table',
        noLogsText: 'Your log list is empty.',
        event: 'Event',
        status: 'Status',
        date: 'Date',
        type: 'Type',
        'No.': 'No.',
        login: 'Login',
        logout: 'Logout',
        success: 'Success',
        error: 'Error',
        details: 'Details'
    }
};

export default translate('user/Logs')(Logs);
