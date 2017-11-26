import React from 'react';

class PageHeader extends React.Component {
    render() {
        let title = this.props.title;
        return(<div className="page-header">
            <h1>{title}</h1>
        </div>);
    }
}

export default PageHeader;