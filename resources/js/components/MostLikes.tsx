import * as React from 'react';
import AssetCard from './AssetCard';

// Interfaces
/* eslint-disable-next-line no-unused-vars */
import { Asset } from '../interfaces/IAssetInterface';
/* eslint-disable-next-line no-unused-vars */
import { IUserInfoInterface } from '../interfaces/IUserInfoInterface';

// Services
import {TYPES} from "../Services/AssetService";

interface IMostLikesProps {
    mostLikedAsset: Asset;
    userInfo: IUserInfoInterface;
}

export default class Newest extends React.Component<IMostLikesProps> {
  public render () {
    return (
            <>
                <h3 className="headline">most likes</h3>
                <AssetCard
                  id={this.props.mostLikedAsset.id}
                  name={this.props.mostLikedAsset.name}
                  author={this.props.mostLikedAsset.author}
                  imagePath={this.props.mostLikedAsset.imagePath}
                  username={this.props.mostLikedAsset.username}
                  uploadDate={this.props.mostLikedAsset.uploadDate}
                  userInfo={this.props.userInfo}
                  downloads={this.props.mostLikedAsset.downloads}
                  likes={this.props.mostLikedAsset.likes}
                  isPublic={this.props.mostLikedAsset.isPublic}
                  assetType={this.props.mostLikedAsset.assetType}
                  updateDownloads={true}
                  updateLikes={true}
                  locationType={'likes'}
                  useSkinRenderer={this.props.mostLikedAsset.assetType === TYPES.Skin}
                />
            </>
    );
  }
}
