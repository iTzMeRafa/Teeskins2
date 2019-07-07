import * as React from 'react';
import Newest from "./Newest";
import MostLikes from "./MostLikes"
import MostDownloads from "./MostDownloads"
import { NewestAsset, MostDownloadedAsset, MostLikedAsset } from "../interfaces/ITrendingInterface";

interface ITrendingProps {
    mostDownloadedAsset: MostDownloadedAsset;
    mostLikedAsset: MostLikedAsset;
    newestAsset: NewestAsset;
}

export default class Trending extends React.Component<ITrendingProps> {
    render(){
        return(
            <div className="trending">
                <div className="row">
                    <div className="col-md-4">
                        <Newest newestAsset={this.props.newestAsset}/>
                    </div>
                    <div className="col-md-4">
                        <MostLikes mostLikedAsset={this.props.mostLikedAsset}/>
                    </div>
                    <div className="col-md-4">
                        <MostDownloads mostDownloadedAsset={this.props.mostDownloadedAsset}/>
                    </div>
                </div>
            </div>
        );
    }
}