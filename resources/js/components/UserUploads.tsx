import * as React from 'react';
import GridCore from "./GridCore";

// Interfaces
import { IUserInfoInterface } from './../interfaces/IUserInfoInterface';

interface IUserUploadsInterfaceProps {
    assets: any;
    userInfo: IUserInfoInterface;
}

export default class UserUploads extends React.Component<IUserUploadsInterfaceProps> {
    render(){
        return(
            <div className="mb-4">
                <h3>Your Uploads</h3>
                <GridCore 
                    userInfo={this.props.userInfo} 
                    assets={this.props.assets} 
                    numPerRow={3}
                    updateDownloads={true}
                    updateLikes={true}
                />
            </div>
        );
    }
}