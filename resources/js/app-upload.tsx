require('./bootstrap');

import * as React from 'react';
import ReactDOM from 'react-dom';
import Wireframe from "./components/Wireframe";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

// Interfaces
import { IDataInterface } from "./interfaces/IDataInterface";

// Services
import { TYPES, EXTENSIONS, maxFilesizeInMB } from './Services/AssetService';

/*
 * This global variable comes from the page associated controller
 * and contains all necessary data for its view and the wireframe
 */
declare var data: IDataInterface;

interface IAppUploadStates {
    fileExtensionState: "invalid" | "undefined" | "valid";
    file: string;
    isSkinTypeSelected: boolean;
    isValidFileSize: boolean;
}

export default class Upload extends React.Component<{}, IAppUploadStates> {

    private readonly blockName = "upload";

    public constructor(props: {}) {
        super(props);
        this.state = {
            fileExtensionState: "undefined",
            file: null,
            isSkinTypeSelected: false,
            isValidFileSize: true,
        }

        this.handleFileInput = this.handleFileInput.bind(this);
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
        const allowedExtensions = [];
        Object.keys(EXTENSIONS).map(key => {
            allowedExtensions.push(EXTENSIONS[key]);
        });
        return (
            <div className="alert alert-info" role="alert">
                Here you can contribute and upload assets to Teeskins yourself. <br />
                Once uploaded, the asset wont be visible right away. We first have to review and accept it to prevent scam and unreasonable uploads. <br />
                Keep in mind that only <strong>.{allowedExtensions.join(', ')}</strong> files are permissible with a max. file-size of <strong>{maxFilesizeInMB} MB</strong>.          
            </div>
        );
    }

    private renderAssetUploadInput() {

        const inputClassName = this.state.fileExtensionState === "valid" && this.state.isValidFileSize
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
                    <div className="invalid-feedback" style={this.state.fileExtensionState === "invalid" ? { display: "block" } : { display: "none" }}>
                        Please select a valid file.
                    </div>
                    <div className="invalid-feedback" style={!this.state.isValidFileSize ? { display: "block" } : { display: "none" }}>
                        The max. allowed filesize is {maxFilesizeInMB} MB. 
                    </div>
                </div>
                    
                <div className={`${this.blockName}__preview mb-3`}>
                    <div className={`${this.blockName}__preview__display`}>
                       {this.renderPreview()}
                       
                    </div>
                </div>
                <div style={this.state.isSkinTypeSelected ? { display: "block" } : { display: "none" }}>
                    <FontAwesomeIcon icon={faInfoCircle} /> Skinrenderer is currently not available in the preview.
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
                        <input type="text" className="form-control" id="inputAuthor" placeholder="e.g nameless tee" />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Name*</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="inputName" placeholder="e.g cammo" />
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
        Object.keys(TYPES).map(key => {
            assetTypeSelect.push(<option key={TYPES[key]} value={TYPES[key]}>{key}</option>);
        });

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
        
          const file = event.target.files[0];
          const fileSizeInMB = file.size/1024/1024;
          const name = file.name;
          const lastDot = name.lastIndexOf('.');
          const fileName = name.substring(0, lastDot);
          const ext = name.substring(lastDot + 1);
        
          // Validation
          if (!Object.values(EXTENSIONS).includes(ext)) {
              this.setState({ fileExtensionState: "invalid" });
              return;
          } 

          if (fileSizeInMB > maxFilesizeInMB) {
            this.setState({ isValidFileSize: false });
            return;
          }

          (document.getElementById("inputName") as HTMLInputElement).value = fileName;
          
          this.setState({ 
              fileExtensionState: "valid", 
              isValidFileSize: true,
              file: URL.createObjectURL(event.target.files[0]),
            });
    }

    private renderPreview() {
        if (this.state.fileExtensionState === "invalid" 
            || this.state.fileExtensionState === "undefined"
            || this.state.file === null
        ) {
            if (this.state.isSkinTypeSelected) {
                this.setState({ isSkinTypeSelected: false });
            }
            return "Preview";
        }

        const selectedAssetType =  (document.getElementById("assetType") as HTMLSelectElement).value;

        if (selectedAssetType === TYPES.Skin && !this.state.isSkinTypeSelected) {
            this.setState({ isSkinTypeSelected: true });
        } 

        if (selectedAssetType !== TYPES.Skin && this.state.isSkinTypeSelected) {
            this.setState({ isSkinTypeSelected: false });
        }
    
        return (
            <img src={this.state.file} className="card-img-top" id="previewSkin" />
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<Upload />, document.getElementById('app'));
} 