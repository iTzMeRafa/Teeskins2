import * as React from 'react';

interface IJumbotronProps {
    title: string;
    subtitle: string;
    buttonText: string;
    buttonURL: string;
}

export default class Jumbotron extends React.Component<IJumbotronProps> {
    render(){
        return(
            <div className="jumbotron">
                <h1>{this.props.title}</h1>
                <p className="lead">{this.props.subtitle}</p>
                <p>{this.props.children}</p>

                <p>
                    <a className="btn btn-success btn-lg" href={this.props.buttonURL} target="_blank">
                        {this.props.buttonText} &raquo;
                    </a>
                </p>
            </div>
        );
    }
}