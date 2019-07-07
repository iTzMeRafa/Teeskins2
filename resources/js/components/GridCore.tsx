import * as React from 'react';
import Skin from './Skin';

interface IGridCoreProps {
    assets: any;
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
             <div className="col-md-3 mb-4" key={asset.id}>
                 <Skin
                     id={asset.id}
                     name={asset.name}
                     author={asset.author}
                     imagePath={asset.imagePath}
                     uploadDate={asset.uploadDate}
                 />
             </div>
           );
        });
    }
}
