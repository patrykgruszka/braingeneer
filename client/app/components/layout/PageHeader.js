import React from 'react';

class PageHeader extends React.Component {
    render() {
        let title = this.props.title;
        return(<div className="page-header">
            <div className="container">
                <h1>{title}</h1>
            </div>
        </div>);
    }
}

export default PageHeader;