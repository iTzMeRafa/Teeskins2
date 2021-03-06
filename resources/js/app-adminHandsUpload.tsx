import * as React from 'react';
import ReactDOM from 'react-dom';
import Wireframe from './components/Wireframe';
import GridCore from './components/GridCore';
import AdminPanelSideBar from './components/AdminPanelSideBar';

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

export default class AdminHandsUpload extends React.Component {
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
              <AdminPanelSideBar assetUploadsCount={data.viewData.assetUploadsCount} />
            </div>
            <div className="col-md-9">
              <GridCore
                  userInfo={data.globalData.userInfo}
                  assets={data.viewData.hands}
                  numPerRow={3}
                  updateDownloads={false}
                  updateLikes={false}
                  sortType={data.viewData.sortType}
                  page={data.viewData.page}
                  idURL={this.urlService.mergeBaseWithURL(URLS.HandsUploads)}
                  downloadsURL={this.urlService.mergeBaseWithURL(URLS.HandsUploadsDownload)}
                  likesURL={this.urlService.mergeBaseWithURL(URLS.HandsUploadsLikes)}
                  fetchURL={this.urlService.mergeBaseWithURL(URLS.FetchHandsUploads)}
                  showLoadButton={false}
              />
            </div>
          </div>
        </Wireframe>
    );
  }
}

if (document.getElementById('app')) {
  ReactDOM.render(<AdminHandsUpload />, document.getElementById('app'));
}
