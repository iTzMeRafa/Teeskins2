import * as React from 'react';
import AssetCard from './AssetCard';

// Interfaces
/* eslint-disable-next-line no-unused-vars */
import { Asset } from '../interfaces/IAssetInterface';
/* eslint-disable-next-line no-unused-vars */
import { IUserInfoInterface } from '../interfaces/IUserInfoInterface';

interface INewestProps {
    newestAsset: Asset;
    userInfo: IUserInfoInterface;
}

export default class Newest extends React.Component<INewestProps> {
  public render () {
    return (
            <>
                <h3 className="headline">newest</h3>
                <AssetCard
                  id={this.props.newestAsset.id}
                  name={this.props.newestAsset.name}
                  author={this.props.newestAsset.author}
                  imagePath={this.props.newestAsset.imagePath}
                  username={this.props.newestAsset.username}
                  uploadDate={this.props.newestAsset.uploadDate}
                  userInfo={this.props.userInfo}
                  downloads={this.props.newestAsset.downloads}
                  likes={this.props.newestAsset.likes}
                  isPublic={this.props.newestAsset.isPublic}
                  assetType={this.props.newestAsset.assetType}
                  updateDownloads={true}
                  updateLikes={true}
                  locationType={'newest'}
                />
            </>
    );
  }
}
