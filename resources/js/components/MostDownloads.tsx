import * as React from 'react';
import Skin from "./Skin";
import { MostDownloadedAsset } from "../interfaces/ITrendingInterface";
import { IUserInfoInterface } from './../interfaces/IUserInfoInterface';

interface IMostDownloadsProps {
    mostDownloadedAsset: MostDownloadedAsset;
    userInfo: IUserInfoInterface;
}

export default class Newest extends React.Component<IMostDownloadsProps> {
    render(){
        return(
            <>
                <h3 className="headline">most downloads</h3>
                <Skin
                    id={this.props.mostDownloadedAsset.id}
                    name={this.props.mostDownloadedAsset.name}
                    author={this.props.mostDownloadedAsset.author}
                    imagePath={this.props.mostDownloadedAsset.imagePath}
                    uploadDate={this.props.mostDownloadedAsset.uploadDate}
                    userInfo={this.props.userInfo}
                    downloads={this.props.mostDownloadedAsset.downloads}
                    likes={this.props.mostDownloadedAsset.likes}
                    isPublic={this.props.mostDownloadedAsset.isPublic}
                    updateDownloads={true}
                    updateLikes={true}
                />
            </>
        );
    }
}