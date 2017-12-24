import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import translate from '../../../i18n/translate.js';

class Question extends React.Component {

    chooseAnswer(answer) {
        if (this.props.isResolved()) return;

        if (this.isCorrectAnswer(answer)) {
            this.props.handleCorrectAnswer(answer);
        } else {
            this.props.handleWrongAnswer(answer);
        }
    }

    isCorrectAnswer(answer) {
        return this.props.question.answer === answer;
    }

    isSelectedAnswer(answer) {
        return this.props.selectedAnswer === answer;
    }

    render() {
        const selectedAnswer = this.props.selectedAnswer;
        const options = this.props.question.options;
        const optionsComponents = [];

        for (let i = 0; i < options.length; i++) {
            const optionClasses = classNames({
                'brick': true,
                'brick-selected': this.isSelectedAnswer(i),
                'brick-success': this.isSelectedAnswer(i) && this.isCorrectAnswer(i),
                'brick-error': this.isSelectedAnswer(i) && !this.isCorrectAnswer(i),
                'brick-disabled': this.props.isResolved() && !this.isCorrectAnswer(i)
            });
            optionsComponents.push(
                <li key={i}
                     className={optionClasses}
                     onClick={() => this.chooseAnswer(i)}>
                    {options[i].name}
                </li>
            );
        }

        let message;
        if (selectedAnswer > -1) {
            if (this.isCorrectAnswer(selectedAnswer)) {
                message = <div className="alert alert-success">{this.props.strings.successMessage}</div>;
            } else {
                message = <div className="alert alert-danger">{this.props.strings.errorMessage}</div>;
            }
        }

        return (
            <div className="question">
                <h2 className="question-title">{this.props.question.question}</h2>
                <ol className="question-options">
                    {optionsComponents}
                </ol>
                {message}
            </div>
        );
    }
}

Question.propTypes = {
    strings: PropTypes.object,
    question: PropTypes.shape({
        question: PropTypes.string.isRequired,
        answer: PropTypes.number.isRequired,
        options: PropTypes.array
    }),
    selectedAnswer: PropTypes.number.isRequired,
    handleCorrectAnswer: PropTypes.func.isRequired,
    handleWrongAnswer: PropTypes.func.isRequired
};

Question.defaultProps = {
    strings: {
        successMessage: 'Right answer',
        errorMessage: 'Wrong answer'
    }
};

export default translate('exercise/quiz/Question')(Question);