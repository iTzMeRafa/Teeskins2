import * as React from 'react';
import Skin from "./Skin";
import { MostLikedAsset } from "../interfaces/ITrendingInterface";
import { IUserInfoInterface } from './../interfaces/IUserInfoInterface';

interface IMostLikesProps {
    mostLikedAsset: MostLikedAsset;
    userInfo: IUserInfoInterface;
}

export default class Newest extends React.Component<IMostLikesProps> {
    render(){
        return(
            <>
                <h3 className="headline">most likes</h3>
                <p className="value">
                    {this.props.mostLikedAsset.likes}
                </p>
                <Skin
                    id={this.props.mostLikedAsset.id}
                    name={this.props.mostLikedAsset.name}
                    author={this.props.mostLikedAsset.author}
                    imagePath={this.props.mostLikedAsset.imagePath}
                    uploadDate={this.props.mostLikedAsset.uploadDate}
                    userInfo={this.props.userInfo}
                    downloads={this.props.mostLikedAsset.downloads}
                    likes={this.props.mostLikedAsset.likes}
                    isPublic={this.props.mostLikedAsset.isPublic}
                />
            </>
        );
    }
}