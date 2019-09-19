import * as React from 'react';

interface IJumbotronProps {
    title: string;
    subtitle: string;
    buttonText?: string;
    buttonURL?: string;
    showButton: boolean;
}

export default class Jumbotron extends React.Component<IJumbotronProps> {
  public render () {
    return (
      <div className="jumbotron">
        <h1>{this.props.title}</h1>
        <p className="lead">{this.props.subtitle}</p>

        <p>
          {this.props.showButton && (
            <a
              className="btn btn-success btn-lg"
              href={this.props.buttonURL}
              target="_blank"
              rel="noopener noreferrer"
            >
              {this.props.buttonText} &raquo;
            </a>
          )}
        </p>
      </div>
    );
  }
}
