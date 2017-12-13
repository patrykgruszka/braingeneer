import React from 'react';
import PropTypes from 'prop-types';
import translate from '../../i18n/translate.js';


class Quiz extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (<div className="container">
            {JSON.stringify(this.props.exercise)}
        </div>);
    }
}

Quiz.propTypes = {
    strings: PropTypes.object,
    exercise: PropTypes.object.isRequired
};

Quiz.defaultProps = {
    strings: {}
};

export default translate('exercise/Quiz')(Quiz);