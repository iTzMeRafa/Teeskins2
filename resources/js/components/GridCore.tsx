import * as React from 'react';
import Skin from './Skin';
import { IUserInfoInterface } from './../interfaces/IUserInfoInterface';

interface IGridCoreProps {
    assets: any;
    userInfo: IUserInfoInterface;
}

export default class GridCore extends React.Component<IGridCoreProps> {
    render(){
        return(
            <div className="row">
                {this.renderAssets()}
            </div>
        );
    }

    private renderAssets() {
        return this.props.assets.map(asset => {
           return (
             <div className="col-lg-3 col-md-4 col-sm-6 col-xs-6 mb-4" key={asset.id}>
                 <Skin
                     id={asset.id}
                     name={asset.name}
                     author={asset.author}
                     imagePath={asset.imagePath}
                     uploadDate={asset.uploadDate}
                     userInfo={this.props.userInfo}
                     downloads={asset.downloads}
                     likes={asset.likes}
                     isPublic={asset.isPublic}
                 />
             </div>
           );
        });
    }
}
