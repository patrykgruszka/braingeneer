import React from 'react';
import PropTypes from 'prop-types';
import translate from '../../../i18n/translate.js';
import Question from './Question';
import Results from './Results';
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
            wrongAnswers: 0,
            completed: false
        };
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
        const component = this;

        request('/api/exercises/' + component.props.exercise._id + '/complete', {
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
            component.setState(...component.state, {
                completed: true,
                results: data
            });
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

    render() {
        const question = this.props.exercise.data.questions[this.state.currentQuestion - 1];

        const button = this.isLastQuestion() ?
            (<button className="btn btn-primary"
                     disabled={!this.isCurrentQuestionAnswered()}>{this.props.strings.finish}</button>) :
            (<button className="btn btn-success"
                     disabled={!this.isCurrentQuestionAnswered()}
                     onClick={this.nextQuestion.bind(this)}>{this.props.strings.nextQuestion}</button>);


        return (
            <div className="exercise exercise-quiz">
                {this.state.completed ? <Results results={this.state.results}/> :
                    <div>
                        <p className="question-number">
                            <b>{this.props.strings.question}:</b><b>{this.state.currentQuestion}</b><b>/</b><b>{this.props.exercise.data.questions.length}</b>
                        </p>
                        <Question
                            question={question}
                            selectedAnswer={this.state.selectedAnswer}
                            isResolved={this.isCurrentQuestionAnswered.bind(this)}
                            handleCorrectAnswer={this.correctAnswerHandler.bind(this)}
                            handleWrongAnswer={this.wrongAnswerHandler.bind(this)}
                        />
                        {!this.isLastQuestion() && this.isCurrentQuestionAnswered() &&
                        <button className="btn btn-success"
                                onClick={this.nextQuestion.bind(this)}>{this.props.strings.nextQuestion}</button>
                        }
                        {this.isLastQuestion() && this.isCurrentQuestionAnswered() &&
                        <button className="btn btn-success"
                                onClick={this.complete.bind(this)}>{this.props.strings.finish}</button>
                        }
                    </div>
                }
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