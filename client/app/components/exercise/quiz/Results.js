import React from 'react';
import PropTypes from 'prop-types';
import translate from '../../../i18n/translate.js';
import {Link} from 'react-router';

class Quiz extends React.Component {
    render() {
        console.log('results', this.props);

        const strings = this.props.strings,
            user = this.props.results.user,
            score = this.props.results.score;

        const scoreEl = <div className="score">{score.score} <i className="fa fa-star" aria-hidden="true"></i></div>;

        return (
            <div className="quiz-results">
                <h2>{strings.congratulations}</h2>
                {user ?
                    <div>
                        <p className="lead">{strings.messageForUser}</p>
                        {scoreEl}
                        <div className="btn-wrapper">
                            <Link className="btn btn-primary" to="/">{strings.exercises}</Link>
                        </div>
                    </div> :
                    <div>
                        <p className="lead">{strings.messageForAnonymous}</p>
                        {scoreEl}
                        <div className="btn-wrapper">
                            <Link className="btn btn-default" to="/">{strings.exercises}</Link>
                            <Link className="btn btn-primary" to="/register">{strings.register}</Link>
                            <Link className="btn btn-primary" to="/login">{strings.login}</Link>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

Quiz.propTypes = {
    strings: PropTypes.object,
    results: PropTypes.object
};

Quiz.defaultProps = {
    strings: {
        congratulations: 'Congratulations',
        messageForUser: 'You completed this exercise. Points will be added to your account.',
        messageForAnonymous: 'You completed this exercise. Log in if You want receive points for completing exercises.',
        exercises: 'Exercises',
        register: 'Register',
        login: 'Login'
    }
};

export default translate('exercise/quiz/Results')(Quiz);