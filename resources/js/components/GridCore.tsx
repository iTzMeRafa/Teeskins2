import * as React from 'react';
import Skin from './Skin';
import { IUserInfoInterface } from './../interfaces/IUserInfoInterface';

interface IGridCoreProps {
    assets: any;
    userInfo: IUserInfoInterface;
    numPerRow: 1 | 2 | 3 | 4;
    updateDownloads: boolean;
    updateLikes: boolean;
}

interface IGridCoreState {
    hideForAssetIDs: number[];
}

export default class GridCore extends React.Component<IGridCoreProps, IGridCoreState> {
    public render() {
        return(
            <div className="row">
                {this.renderAssets()}
            </div>
        );
    }

    public constructor(props: IGridCoreProps) {
        super(props);
        this.state = {
            hideForAssetIDs: [0],
        };
    }

    
    private setAssetVisibility(assetID) {
        console.log("parent method called");
        this.setState({
            hideForAssetIDs: [...this.state.hideForAssetIDs, assetID],
          });
    }

    private renderAssets() {
        return this.props.assets.map(asset => {
           return (
                <div 
                className={`${this.getClassName()} mb-4`} 
                key={asset.id} 
                style={this.state.hideForAssetIDs.includes(asset.id) ? { display: "none" } : { display: "block" }}
                >
                    <Skin
                        id={asset.id}
                        name={asset.name}
                        author={asset.author}
                        imagePath={asset.imagePath}
                        username={asset.username}
                        uploadDate={asset.uploadDate}
                        userInfo={this.props.userInfo}
                        downloads={asset.downloads}
                        likes={asset.likes}
                        isPublic={asset.isPublic}
                        handleVisibilityChange={() => this.setAssetVisibility(asset.id)}
                        updateDownloads={this.props.updateDownloads}
                        updateLikes={this.props.updateLikes}
                    />
                </div>
           );
        });
    }

    private getClassName() {
        let className = "";

        switch(this.props.numPerRow) {
            case 1:
                className = "col-lg-12 col-md-12 col-sm-12 col-xs-12";
                break;
            case 2:
                className = "col-lg-6 col-md-6 col-sm-6 col-xs-6";
                break;
            case 3:
                className = "col-lg-4 col-md-6 col-sm-6 col-xs-6";
                break;
            case 4: 
                className = "col-lg-3 col-md-4 col-sm-6 col-xs-6";
                break;
        }

        return className;
    }
}
