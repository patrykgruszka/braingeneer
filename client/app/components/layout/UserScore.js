import React from 'react';
import PropTypes from 'prop-types';
import request from '../../services/request';
import translate from '../../i18n/translate.js';

class Navigation extends React.Component {
    render() {
        return (<div className="user-score"><i className="fa fa-star" aria-hidden="true"></i> {this.props.score}</div>);
    }
}

Navigation.propTypes = {
    strings: PropTypes.object
};

export default translate('layout/UserScore')(Navigation);