import React from 'react';
import PropTypes from 'prop-types';
import translate from '../../../i18n/translate.js';
import Question from './Question';
import request from "../../../services/request";
import alertify from "alertify.js";
import {browserHistory} from "react-router";

class Quiz extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentQuestion: 1,
            selectedAnswer: -1,
            correctAnswers: 0,
            wrongAnswers: 0
        };

        console.log(this.props.exercise);
    }

    componentDidMount() {
        const component = this;

        request('/api/exercises/' + this.props.exercise._id + '/start', {
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

    correctAnswerHandler(answer) {
        const correctAnswers = this.state.correctAnswers + 1;
        this.setState({...this.state, correctAnswers: correctAnswers, selectedAnswer: answer});
    }

    wrongAnswerHandler(answer) {
        const wrongAnswers = this.state.wrongAnswers + 1;
        this.setState({...this.state, wrongAnswers: wrongAnswers, selectedAnswer: answer});
    }

    nextQuestion() {
        if (!this.isLastQuestion() && this.isCurrentQuestionAnswered()) {
            const currentQuestion = this.state.currentQuestion + 1;
            this.setState({...this.state, currentQuestion: currentQuestion, selectedAnswer: -1});
        }
    }

    complete() {
        request('/api/exercises/' + this.props.exercise._id + '/complete', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                score: this.props.exercise.bounty,
                details: {
                    correctAnswers: this.state.correctAnswers,
                    wrongAnswers: this.state.wrongAnswers
                }
            })
        }).then(data => {
            browserHistory.push('/');
            alertify.success(data.message);
        }).catch(data => {
            alertify.error(data.message);
        });
    }

    isLastQuestion() {
        return this.state.currentQuestion === this.props.exercise.data.questions.length;
    }

    isCurrentQuestionAnswered() {
        return this.state.correctAnswers >= this.state.currentQuestion;
    }

    render(){
        const question = this.props.exercise.data.questions[this.state.currentQuestion - 1];

        const button = this.isLastQuestion() ?
            (<button className="btn btn-primary"
                     disabled={!this.isCurrentQuestionAnswered()}>{this.props.strings.finish}</button>) :
            (<button className="btn btn-success"
                     disabled={!this.isCurrentQuestionAnswered()}
                     onClick={this.nextQuestion.bind(this)}>{this.props.strings.nextQuestion}</button>);


        return (
            <div className="exercise-container">
                <div className="exercise exercise-quiz">
                    <p className="question-number">{this.props.strings.question}: {this.state.currentQuestion}/{this.props.exercise.data.questions.length}</p>
                    <Question
                        question={question}
                        selectedAnswer={this.state.selectedAnswer}
                        isResolved={this.isCurrentQuestionAnswered.bind(this)}
                        handleCorrectAnswer={this.correctAnswerHandler.bind(this)}
                        handleWrongAnswer={this.wrongAnswerHandler.bind(this)}
                    />
                    {!this.isLastQuestion() && this.isCurrentQuestionAnswered() &&
                        <button className="btn btn-success" onClick={this.nextQuestion.bind(this)}>{this.props.strings.nextQuestion}</button>
                    }
                    {this.isLastQuestion() && this.isCurrentQuestionAnswered() &&
                        <button className="btn btn-success" onClick={this.complete.bind(this)}>{this.props.strings.finish}</button>
                    }
                </div>
            </div>
        );
    }
}

Quiz.propTypes = {
    strings: PropTypes.object,
    exercise: PropTypes.shape({
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        difficulty: PropTypes.number.isRequired,
        bounty: PropTypes.number.isRequired,
        data: PropTypes.shape({
            questions: PropTypes.array
        })
    })
};

Quiz.defaultProps = {
    strings: {
        question: 'Question',
        nextQuestion: 'Next question',
        finish: 'Finish'
    }
};

export default translate('exercise/quiz/Quiz')(Quiz);