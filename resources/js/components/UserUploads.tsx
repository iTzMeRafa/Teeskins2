import * as React from 'react';
import GridCore from './GridCore';

// Interfaces
/* eslint-disable-next-line no-unused-vars */
import { IUserInfoInterface } from '../interfaces/IUserInfoInterface';

interface IUserUploadsInterfaceProps {
    assets: any;
    userInfo: IUserInfoInterface;
    sortType: 'id' | 'downloads' | 'likes';
    page: string;
    idURL: string;
    downloadsURL: string;
    likesURL: string;
    fetchURL: string;
}

export default class UserUploads extends React.Component<IUserUploadsInterfaceProps> {
  public render () {
    return (
      <div className="mb-4">
        <h3>Your Uploads</h3>
        <GridCore
          userInfo={this.props.userInfo}
          assets={this.props.assets}
          numPerRow={3}
          updateDownloads={true}
          updateLikes={true}
          sortType={this.props.sortType}
          page={this.props.page}
          idURL={this.props.idURL}
          downloadsURL={this.props.downloadsURL}
          likesURL={this.props.likesURL}
          fetchURL={this.props.fetchURL}
          showLoadButton={false}
        />
      </div>
    );
  }
}
