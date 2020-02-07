import * as React from 'react';

interface ISearchHeadlineProps {
    query: string,
}

export default class SearchHeadline extends React.Component<ISearchHeadlineProps> {
  public render () {
    return (
      <h3 className="mb-5">
        results for search query "{this.props.query}"
      </h3>
    );
  }
}
