import * as React from 'react';
import ReactDOM from 'react-dom';
import Wireframe from './components/Wireframe';
import ApiCard from './components/ApiCard';

// Interfaces
/* eslint-disable-next-line no-unused-vars */
import { IDataInterface } from './interfaces/IDataInterface';

// Services
import { URLS, UrlService } from './Services/UrlService';

require('./bootstrap');

/*
 * This global variable comes from the page associated controller
 * and contains all necessary data for its view and the wireframe
 */
declare var data: IDataInterface;

export default class API extends React.Component {
  private readonly urlService: UrlService;

  private constructor (props: {}) {
    super(props);
    this.urlService = new UrlService();
  }

  public render () {
    return (
      <Wireframe totalItemsCount={data.globalData.totalItemsCount}>

        <div className="row">
          <div className="col-md-6 mb-4">
            <ApiCard
              headline={'Skins API'}
              fetchType={'GET'}
              absoluteAPIURL={this.urlService.mergeBaseWithURL(URLS.APISkins)}
              hasSortType={true}
              exampleJSONResponse={data.viewData.exampleJSONResponse.original}
              apiAvailable={data.viewData.apiHTTPStatusCode === 200}
            />
          </div>
          <div className="col-md-6 mb-4"></div>
        </div>

      </Wireframe>
    );
  }
}

if (document.getElementById('app')) {
  ReactDOM.render(<API />, document.getElementById('app'));
}
