import React from 'react';
import PropTypes from 'prop-types';
import translate from '../../i18n/translate.js';
import request from "../../services/request";
import ExerciseCard from "./ExerciseCard";

class ExerciseList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            exercises: []
        };
    }

    componentDidMount() {
        const component = this;

        request('/api/exercises', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(exercises => {
            component.setState({
                exercises: exercises
            });
        });
    }

    render(){
        const components = [];

        this.state.exercises.forEach(function(exercise) {
            components.push(
                <div key={exercise._id} className="col-xs-6 col-sm-4 col-md-3">
                    <ExerciseCard exercise={exercise}/>
                </div>
            );
        }.bind(this));

        return (<div className="container">
            <div className="row">
                {components}
            </div>
        </div>);
    }
}

ExerciseList.propTypes = {
    strings: PropTypes.object
};

ExerciseList.defaultProps = {
    strings: {}
};

export default translate('exercise/ExerciseList')(ExerciseList);