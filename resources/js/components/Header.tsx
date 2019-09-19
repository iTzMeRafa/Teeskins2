import * as React from 'react';

export default class Header extends React.Component {
  public render () {
    return (
      <div className="header">
        <a href="/">
          <div className="header-logo" />
        </a>
      </div>
    );
  }
}
