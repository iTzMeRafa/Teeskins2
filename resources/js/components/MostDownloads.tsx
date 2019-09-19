import * as React from 'react';
import Skin from './Skin';

// Interfaces
/* eslint-disable-next-line no-unused-vars */
import { MostDownloadedAsset } from '../interfaces/ITrendingInterface';
/* eslint-disable-next-line no-unused-vars */
import { IUserInfoInterface } from '../interfaces/IUserInfoInterface';

interface IMostDownloadsProps {
    mostDownloadedAsset: MostDownloadedAsset;
    userInfo: IUserInfoInterface;
}

export default class Newest extends React.Component<IMostDownloadsProps> {
  public render () {
    return (
            <>
                <h3 className="headline">most downloads</h3>
                <Skin
                  id={this.props.mostDownloadedAsset.id}
                  name={this.props.mostDownloadedAsset.name}
                  author={this.props.mostDownloadedAsset.author}
                  imagePath={this.props.mostDownloadedAsset.imagePath}
                  username={this.props.mostDownloadedAsset.username}
                  uploadDate={this.props.mostDownloadedAsset.uploadDate}
                  userInfo={this.props.userInfo}
                  downloads={this.props.mostDownloadedAsset.downloads}
                  likes={this.props.mostDownloadedAsset.likes}
                  isPublic={this.props.mostDownloadedAsset.isPublic}
                  updateDownloads={true}
                  updateLikes={true}
                  locationType={'downloads'}
                />
            </>
    );
  }
}
