import * as React from 'react';

export default class Header extends React.Component {
    render(){
        return(
            <div className="header">
                <a href="/">
                    <div className="header-logo" />
                </a>
            </div>
        );
    }
}