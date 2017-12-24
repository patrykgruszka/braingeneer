import React from 'react';
import PropTypes from 'prop-types';
import Navigation from '../layout/Navigation';
import PageHeader from '../layout/PageHeader';
import ExerciseHeader from './ExerciseHeader';
import translate from '../../i18n/translate.js';
import request from '../../services/request';
import Quiz from './quiz/Quiz';

class Exercise extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            exercise: {}
        }
    }

    componentDidMount() {
        const component = this;

        request('/api/exercises/' + this.props.params.exerciseId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(exercise => {
            component.setState({
                exercise: exercise
            });
        });
    }

    exerciseFactory() {
        switch(this.state.exercise.type) {
            case 'quiz':
                return <Quiz exercise={this.state.exercise} />;
            default:
                return null;
        }
    }

    render(){
        return (<div>
            <Navigation/>
            <ExerciseHeader exercise={this.state.exercise} />
            {this.exerciseFactory()}
        </div>);
    }
}

Exercise.propTypes = {
    strings: PropTypes.object,
    params: PropTypes.shape({
        exerciseId: PropTypes.string.isRequired
    })
};

Exercise.defaultProps = {
    strings: {}
};

export default translate('exercise/Exercise')(Exercise);