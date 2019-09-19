import * as React from 'react';
import ReactDOM from 'react-dom';
import Wireframe from './components/Wireframe';
import UserPanelSideBar from './components/UserPanelSideBar';
import UserUploads from './components/UserUploads';
import UserStatistics from './components/UserStatistics';

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

export default class DashBoard extends React.Component {
    private readonly urlService: UrlService;

    public constructor (props: {}) {
      super(props);
      this.urlService = new UrlService();
    }

    public render () {
      return (
        <Wireframe totalItemsCount={data.globalData.totalItemsCount}>
          <div className="row">
            <div className="col-md-3">
              <UserPanelSideBar />
            </div>
            <div className="col-md-9">
              <UserStatistics
                userInfo={data.globalData.userInfo}
                statistics={data.viewData.statistics}
              />
              <UserUploads
                userInfo={data.globalData.userInfo}
                assets={data.viewData.assets}
                sortType={data.viewData.sortType}
                page={data.viewData.page}
                idURL={this.urlService.mergeBaseWithURL(URLS.Dashboard)}
                downloadsURL={this.urlService.mergeBaseWithURL(URLS.DashboardDownloads)}
                likesURL={this.urlService.mergeBaseWithURL(URLS.DashboardLikes)}
                fetchURL={this.urlService.mergeBaseWithURL(URLS.FetchUserUploads)}
              />
            </div>
          </div>
        </Wireframe>
      );
    }
}

if (document.getElementById('app')) {
  ReactDOM.render(<DashBoard />, document.getElementById('app'));
}
