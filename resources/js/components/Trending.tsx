import * as React from 'react';
import Newest from './Newest';
import MostLikes from './MostLikes';
import MostDownloads from './MostDownloads';

// Interfaces
/* eslint-disable-next-line no-unused-vars */
import { Asset } from '../interfaces/IAssetInterface';
/* eslint-disable-next-line no-unused-vars */
import { IUserInfoInterface } from '../interfaces/IUserInfoInterface';

interface ITrendingProps {
    mostDownloadedAsset: Asset;
    mostLikedAsset: Asset;
    newestAsset: Asset;
    userInfo: IUserInfoInterface;
}

export default class Trending extends React.Component<ITrendingProps> {
  public render () {
    return (
      <div className="trending">
        <div className="row">
          <div className="col-md-4">
            <Newest userInfo={this.props.userInfo} newestAsset={this.props.newestAsset}/>
          </div>
          <div className="col-md-4">
            <MostLikes userInfo={this.props.userInfo} mostLikedAsset={this.props.mostLikedAsset}/>
          </div>
          <div className="col-md-4">
            <MostDownloads userInfo={this.props.userInfo} mostDownloadedAsset={this.props.mostDownloadedAsset}/>
          </div>
        </div>
      </div>
    );
  }
}
