import React from 'react';
import PropTypes from 'prop-types';
import Navigation from '../layout/Navigation';
import PageHeader from '../layout/PageHeader';
import request from '../../services/request';
import translate from '../../i18n/translate';

class Scores extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {},
            scores: []
        };
    }

    componentDidMount() {
        this.fetchUser(this.props.params.user);
        this.fetchScores(this.props.params.user);
    }

    componentWillReceiveProps(newProps) {
        this.fetchUser(newProps.params.user);
        this.fetchScores(newProps.params.user);
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

    fetchScores(userId) {
        const component = this;

        request('/api/users/' + userId + '/scores', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        }).then(scores => {
            component.setState({...component.state, scores: scores});
        });
    }

    render(){
        const components = [];

        this.state.scores.forEach(function(record, key) {
            components.push(
                <tr key={record._id}>
                    <td>{key + 1}</td>
                    <td>{record.exercise.name}</td>
                    <td>{record.exercise.type}</td>
                    <td>{record.exercise.difficulty}</td>
                    <td>{record.score} <i className="fa fa-star star-color" aria-hidden="true"></i></td>
                    <td>{JSON.stringify(record.details)}</td>
                </tr>
            );
        }.bind(this));

        return (<div>
            <Navigation/>
            <PageHeader title={`${this.props.strings.pageTitle}: ${this.state.user.name}`}/>
            <div className="container">
                {components.length === 0 ?
                    <div className="alert alert-info">{this.props.strings.noScoresText}</div> :
                    <table className="table">
                        <thead>
                            <tr>
                                <td></td>
                                <td>{this.props.strings.exerciseName}</td>
                                <td>{this.props.strings.type}</td>
                                <td>{this.props.strings.difficulty}</td>
                                <td>{this.props.strings.score}</td>
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

Scores.propTypes = {
    strings: PropTypes.object
};

Scores.defaultProps = {
    strings: {
        pageTitle: 'Scores table',
        noScoresText: 'Your score list is empty.',
        exerciseName: 'Exercise name',
        type: 'Type',
        difficulty: 'Difficulty',
        score: 'Scores',
        details: 'Details'
    }
};

export default translate('user/Scores')(Scores);
