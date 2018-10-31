import React from "react";

export default class ItemCounterBadge extends React.Component {
    render(){

        const toRight =  this.props.toRight ? 'justify-content-end' : '';

        return (
            <div className={'row mb-3 mt-3 ' + toRight}>
                <span className={ 'badge badge-' + this.props.style}>
                    { this.props.children }
                </span>
            </div>
        );

    }
}