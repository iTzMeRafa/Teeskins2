require('./bootstrap');

import * as React from 'react';
import ReactDOM from 'react-dom';
import Wireframe from "./components/Wireframe";
import SkinRenderer from "./components/SkinRenderer";

// Interfaces
import { IDataInterface } from "./interfaces/IDataInterface";

// Services
import { TYPES, EXTENSIONS } from './Services/AssetService';

/*
 * This global variable comes from the page associated controller
 * and contains all necessary data for its view and the wireframe
 */
declare var data: IDataInterface;

interface IAppUploadStates {
    fileExtensionState: "invalid" | "undefined" | "valid";
}

export default class Upload extends React.Component<{}, IAppUploadStates> {

    private readonly blockName = "upload";

    public constructor(props: {}) {
        super(props);
        this.state = {
            fileExtensionState: "undefined",
        }
    }

    public render(){
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

        const inputClassName = this.state.fileExtensionState === "valid" 
            ? "custom-file-input is-valid" 
            : this.state.fileExtensionState === "invalid" 
                ? "custom-file-input is-invalid"
                : "custom-file-input";

        return (
            <>
                <div className="input-group mb-4">
                    <div className="custom-file">
                        <input type="file" className={inputClassName} id="assetUpload" onChange={() => this.handleFileInput(event)}/>
                        <label className="custom-file-label">Choose Asset</label>
                    </div>
                    <div className="invalid-feedback" style={this.state.fileExtensionState === "invalid" ? { display: "block" } : { display: "none" }}>Please select a valid file.</div>
                </div>
                    
                <div className={`${this.blockName}__preview`}>
                    <div className={`${this.blockName}__preview__display`}>
                       {this.renderPreview(event)}
                    </div>
                </div>
            </>
        );
    }

    private renderAssetInfosInput() {
        return (
            <>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Author*</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="inputAuthor" placeholder="Whis" />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Name*</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="inputName" placeholder="PepeSkin" />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Type*</label>
                    <div className="col-sm-10">
                        {this.renderAssetTypesSelect()}
                    </div>
                </div>
            </>
        );
    }

    private renderAssetTypesSelect() {
        const assetTypeSelect = [];
        for (let type in TYPES) {
            assetTypeSelect.push(<option key={type} value={type}>{type}</option>);
        }

        return (
            <select name="assetType" className="form-control" id="assetType">
                {assetTypeSelect}
            </select>
        );
    }

    private handleFileInput(event) {
        if (!event || !event.target || !event.target.files || event.target.files.length === 0) {
            return;
          }
        
          const name = event.target.files[0].name;
          const lastDot = name.lastIndexOf('.');
          const fileName = name.substring(0, lastDot);
          const ext = name.substring(lastDot + 1);
        
          if (!Object.values(EXTENSIONS).includes(ext)) {
              this.setState({ fileExtensionState: "invalid" });
              return;
          } 

          (document.getElementById("inputName") as HTMLInputElement).value = fileName;
          this.setState({ fileExtensionState: "valid" });
    }

    private renderPreview(event) {
        if (this.state.fileExtensionState === "invalid" || this.state.fileExtensionState === "undefined") {
            return "Preview";
        }
        
        const fileReader: FileReader = new FileReader();
        
        // TODO: THIS IS NOT WORKING YET - FILEREADER.ONLOAD NEVER FIRES
        fileReader.onload = function(event: any) {
            console.log("loaded");
            const selectedAssetType =  (document.getElementById("assetType") as HTMLSelectElement).value;

            if (selectedAssetType === "Skin") {
                return (
                    <SkinRenderer
                        imagePath={event.target.result}
                        id={"previewSkin"}
                        size="large"
                    />
                );
            }

            return (
                <img src={event.target.result} id="previewSkin" />
            );
        }
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<Upload />, document.getElementById('app'));
} 