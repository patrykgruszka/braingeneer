import React from 'react';
import PropTypes from 'prop-types';
import request from '../../services/request';
import translate from '../../i18n/translate.js';

class Navigation extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            score: 0
        }
    }

    componentDidMount() {
        const component = this;
        request('/api/my-score', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        }).then(res => {
            component.setState({...component.state, score: res.score});
        });
    }

    render() {
        return (<div className="user-score"><i className="fa fa-star" aria-hidden="true"></i> {this.state.score}</div>);
    }
}

Navigation.propTypes = {
    strings: PropTypes.object
};

export default translate('layout/UserScore')(Navigation);