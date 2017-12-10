import React from 'react';
import PropTypes from 'prop-types';
import Navigation from '../layout/Navigation';
import PageHeader from '../layout/PageHeader';
import ExercisesList from '../exercise/ExerciseList';
import translate from '../../i18n/translate.js';

class Index extends React.Component {
    render(){
        return (<div>
            <Navigation/>
            <PageHeader title={ this.props.strings.pageTitle }/>
            <ExercisesList/>
        </div>);
    }
}

Index.propTypes = {
    strings: PropTypes.object
};

Index.defaultProps = {
    strings: {
        pageTitle: 'Good day, isn\'t it?'
    }
};

export default translate('page/Index')(Index);