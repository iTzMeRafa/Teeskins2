import * as React from 'react';

interface IItemsCounterBadeProps {
    toRight: boolean;
    itemsCount: number;
    style: "warning" | "danger" | "info";
}

export default class ItemCounterBadge extends React.Component<IItemsCounterBadeProps> {
    render(){

        const toRight =  this.props.toRight ? 'justify-content-end' : '';

        return (
            <div className={'row itemCounterBadge ' + toRight}>
                <span className={ 'badge badge-' + this.props.style}>
                    <strong>{ this.props.itemsCount }</strong> items in database
                </span>
            </div>
        );
    }
}