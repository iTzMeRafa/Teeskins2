import * as React from 'react';

interface ILoadingSpinnerProps {
  isVisible: boolean;
}

export default class LoadingSpinner extends React.Component<ILoadingSpinnerProps> {
  public render () {
    return (
        <div
            className="loadingSpinner"
            style={this.props.isVisible ? { display: 'block' } : { display: 'none' }}
        />
    );
  }
}
