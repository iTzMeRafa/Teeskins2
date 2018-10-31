import React from "react";

export default class Jumbotron extends React.Component {
    render(){
        return(
            <div className="jumbotron">
                <h1>{this.props.title}</h1>

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