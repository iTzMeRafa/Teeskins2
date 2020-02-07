import * as React from 'react';
import ReactDOM from 'react-dom';
import Wireframe from './components/Wireframe';
import SearchHeadline from './components/SearchHeadline';
import GridCore from './components/GridCore';

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

export default class Search extends React.Component {
    private readonly urlService: UrlService;

    public constructor (props: {}) {
      super(props);
      this.urlService = new UrlService();
    }

    public render () {
      return (
        <Wireframe totalItemsCount={data.globalData.totalItemsCount}>
          <SearchHeadline query={data.viewData.query} />
          <GridCore
            userInfo={data.globalData.userInfo}
            assets={data.viewData.assets}
            numPerRow={4}
            updateDownloads={true}
            updateLikes={true}
            sortType={data.viewData.sortType}
            page={data.viewData.page}
            queryString={data.viewData.query}
            idURL={this.urlService.mergeBaseWithPathURL('/search/' + data.viewData.query)}
            downloadsURL={this.urlService.mergeBaseWithPathURL('/search/' + data.viewData.query + '/downloads')}
            likesURL={this.urlService.mergeBaseWithPathURL('/search/' + data.viewData.query + '/likes')}
            fetchURL={this.urlService.mergeBaseWithURL(URLS.FetchSearch)}
            showLoadButton={false}
          />
        </Wireframe>
      );
    }
}

if (document.getElementById('app')) {
  ReactDOM.render(<Search />, document.getElementById('app'));
}
