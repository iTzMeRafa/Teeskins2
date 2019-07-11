require('./bootstrap');

import * as React from 'react';
import ReactDOM from 'react-dom';
import Wireframe from "./components/Wireframe";
import { IDataInterface } from "./interfaces/IDataInterface";

/*
 * This global variable comes from the page associated controller
 * and contains all necessary data for its view and the wireframe
 */
declare var data: IDataInterface;

export default class Upload extends React.Component {

    private readonly blockName = "upload";

    render(){
        return(
            <Wireframe totalItemsCount={data.globalData.totalItemsCount}>
                {this.renderHeadline()}
                <form className={this.blockName}>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            {this.renderAssetUploadInput()}
                        </div>
                        <div className="col-md-6 mb-3">
                            {this.renderAssetInfosInput()}
                        </div>
                    </div>
                </form>
            </Wireframe>
        );
    }

    private renderHeadline() {
        return (
            <div className="alert alert-info" role="alert">
                Here you can contribute and upload assets to Teeskins yourself. <br />
                Once uploaded, the asset wont be visible right away. We first have to review and accept it to prevent scam and unreasonable uploads. <br />
                Keep in mind that only <strong>.png</strong> files are permissible with a max. file-size of <strong>10mb</strong>.          
            </div>
        );
    }

    private renderAssetUploadInput() {
        return (
            <>
                <div className="input-group mb-4">
                    <div className="custom-file">
                        <input type="file" className="custom-file-input" id="assetUpload" />
                        <label className="custom-file-label">Choose Asset</label>
                    </div>
                </div>
                <div className={`${this.blockName}__preview`}>
                    <div className={`${this.blockName}__preview__display`}>
                        Preview
                    </div>
                </div>
            </>
        );
    }

    private renderAssetInfosInput() {
        return (
            <>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Author</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="inputAuthor" placeholder="Whis" />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Name</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="inputName" placeholder="PepeSkin" />
                    </div>
                </div>
            </>
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<Upload />, document.getElementById('app'));
}