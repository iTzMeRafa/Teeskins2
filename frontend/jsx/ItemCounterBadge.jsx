import React from "react";

export default class ItemCounterBadge extends React.Component {
    render(){

        const toRight =  this.props.toRight ? 'justify-content-end' : '';

        return (
            <div className={'row itemCounterBadge ' + toRight}>
                <span className={ 'badge badge-' + this.props.style}>
                    { this.props.children }
                </span>
            </div>
        );

    }
}