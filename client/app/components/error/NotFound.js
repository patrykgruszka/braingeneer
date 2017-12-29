import React from 'react';
import PropTypes from 'prop-types';
import Navigation from '../layout/Navigation';
import PageHeader from '../layout/PageHeader';
import translate from '../../i18n/translate.js';

class NotFound extends React.Component {
    render(){
        return (<div>
            <Navigation/>
            <PageHeader title={ this.props.strings.pageTitle }/>
            <ExercisesList/>
        </div>);
    }
}

NotFound.propTypes = {
    strings: PropTypes.object
};

NotFound.defaultProps = {
    strings: {
        pageTitle: '404 - Not found'
    }
};

export default translate('error/NotFound')(NotFound);