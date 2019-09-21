import * as React from 'react';

interface IApiCardProps {
  headline: string,
  fetchType: 'GET' | 'POST' | 'CURL',
  absoluteAPIURL: string,
  hasSortType: boolean,
  exampleJSONResponse: any,
  apiAvailable: boolean,
}

export default class ApiCard extends React.Component<IApiCardProps> {
  private readonly blockName = 'apiCard';

  public render () {
    return (
      <div className={this.blockName}>

        <h3>
          <div className={`${this.blockName}__dot ${this.blockName}__dot--${this.props.apiAvailable ? 'online' : 'offline'}`} />
          {this.props.headline}
        </h3>
        <div className="card">
          <div className="card-header">
            <h5>{this.props.fetchType}</h5> <code>{this.props.absoluteAPIURL}/{this.props.hasSortType ? '{id|downloads|likes}' : ''}</code>
          </div>
          <div className="card-body">
            <p className="card-title">Example Response</p>
            <pre>
              <code>
                {JSON.stringify(this.props.exampleJSONResponse, null, 2) }
              </code>
            </pre>
          </div>
        </div>

      </div>
    );
  }
}
