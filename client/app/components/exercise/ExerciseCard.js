import React from 'react';
import PropTypes from 'prop-types';
import translate from '../../i18n/translate.js';

class ExerciseCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let exercise = this.props.exercise;
        return (
            <div className="exercise-card">
                <div className="exercise-card-header">
                    <img src="http://via.placeholder.com/262x100" alt={exercise.name} className="exercise-card-img" />
                </div>
                <div className="exercise-card-content">
                    <h3 className="exercise-card-title">{exercise.name}</h3>
                    <div className="exercise-card-difficulty">{this.props.strings.difficulty}: {exercise.difficulty}</div>
                    <div className="exercise-card-bounty">{this.props.strings.bounty}: {exercise.bounty}</div>
                </div>
            </div>
        );
    }
}

ExerciseCard.propTypes = {
    strings: PropTypes.object
};

ExerciseCard.defaultProps = {
    strings: {
        difficulty: 'Difficulty',
        bounty: 'Bounty'
    }
};

export default translate('exercise/ExerciseCard')(ExerciseCard);