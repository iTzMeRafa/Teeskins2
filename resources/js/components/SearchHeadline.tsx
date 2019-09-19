import * as React from 'react';

interface ISearchHeadlineProps {
    countResults: number,
    query: string,
}

export default class SearchHeadline extends React.Component<ISearchHeadlineProps> {
  public render () {
    return (
      <h3 className="mb-5">
        {this.props.countResults} results for search query
      </h3>
    );
  }
}
