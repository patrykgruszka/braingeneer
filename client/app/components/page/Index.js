import React from 'react';
import Navigation from '../layout/Navigation';
import PageHeader from '../layout/PageHeader';

class Index extends React.Component {
    render(){
        return (<div>
            <Navigation/>
            <PageHeader title="Index - braingeneer"/>
        </div>);
    }
}

export default Index;
