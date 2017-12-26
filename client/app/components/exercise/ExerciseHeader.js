import React from 'react';
import PropTypes from "prop-types";
import translate from "../../i18n/translate";

class ExerciseHeader extends React.Component {
    render() {
        let exercise = this.props.exercise;
        return(<div className="page-header">
            <div className="container">
                <h1>{this.props.strings.exercise}: {exercise.name}</h1>
                <p className="exercise-label-container">
                    <span className={`exercise-difficulty-label exercise-difficulty-label--${exercise.difficulty}`}>{this.props.strings.difficulty}: {exercise.difficulty}</span><br />
                    <span className="exercise-bounty-label">{this.props.strings.bounty}: {exercise.bounty} <i className="fa fa-star" aria-hidden="true"></i></span>
                </p>
            </div>
        </div>);
    }
}

ExerciseHeader.propTypes = {
    strings: PropTypes.object,
    exercise: PropTypes.object
};

ExerciseHeader.defaultProps = {
    strings: {
        exercise: 'Exercise',
        difficulty: 'Difficulty',
        bounty: 'Bounty'
    }
};

export default translate('exercise/ExerciseHeader')(ExerciseHeader);