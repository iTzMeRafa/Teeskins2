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
    inputAuthorState: "invalid" | "undefined" | "valid";
    inputNameState: "invalid" | "undefined" | "valid";
    isValidForSubmit: boolean;
}

export default class Upload extends React.Component<{}, IAppUploadStates> {

    private readonly blockName = "upload";

    public constructor(props: {}) {
        super(props);
        this.state = {
            fileExtensionState: "undefined",
            inputAuthorState: "undefined",
            inputNameState: "undefined",
            file: null,
            isSkinTypeSelected: false,
            isValidFileSize: true,
            isValidForSubmit: false,
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
            <div className="alert alert-info mb-5" role="alert">
                Here you can contribute and upload assets to Teeskins yourself. <br />
                Once uploaded, the asset wont be visible right away. We first have to review and accept it to prevent scam and unreasonable uploads. <br />
                Keep in mind that only <strong>.{allowedExtensions.join(', .')}</strong> files are permissible with a max. file-size of <strong>{maxFilesizeInMB} MB</strong>.          
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
                        <input type="file" className={inputClassName} id="assetUpload" required={true} onChange={() => this.handleFileInput(event)}/>
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
                        <input type="text" className="form-control" required={true} id="inputAuthor" onChange={() => this.handleInputAuthorChange()} placeholder="e.g nameless tee" />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Name*</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" required={true} id="inputName" onChange={() => this.handleInputNameChange()} placeholder="e.g cammo" />
                    </div>
                </div>
                <div className="form-group row mb-5">
                    <label className="col-sm-2 col-form-label">Type*</label>
                    <div className="col-sm-10">
                        {this.renderAssetTypesSelect()}
                    </div>
                </div>
                {this.renderSubmitButton()}
            </>
        );
    }

    private renderAssetTypesSelect() {
        const assetTypeSelect = [];
        Object.keys(TYPES).map(key => {
            assetTypeSelect.push(<option key={TYPES[key]} value={TYPES[key]}>{key}</option>);
        });

        return (
            <select required={true} name="assetType" className="form-control" id="assetType">
                {assetTypeSelect}
            </select>
        );
    }

    private renderSubmitButton() {
        

        const submitButtonClassName = this.state.isValidForSubmit
            ? "btn-success"
            : "btn-secondary";

        return (
            <div className="row">
                <div className="col-md-10 offset-md-2">
                    <button type="button" className={`btn ${submitButtonClassName} btn-block btn-lg float-right`} onClick={() => this.handleSubmitButtonClick()}>
                        Submit
                    </button>
                </div>
            </div>
        );
    }

    private consoleLogDataStates() {
        console.table({ 
            File : this.state.isValidFileSize && this.state.fileExtensionState === "valid" && this.state.file !== null, 
            Author : this.state.inputAuthorState,
            Name : this.state.inputNameState, 
        });
    }

    private validateSubmissionState() {
        this.setState({
            isValidForSubmit: 
                this.state.file !== null 
                && this.state.isValidFileSize 
                && this.state.fileExtensionState === "valid" 
                && this.state.inputAuthorState === "valid"
                && this.state.inputNameState === "valid"
        });
    }   
                                                                                                                                                                          
    private handleSubmitButtonClick() {
        this.state.isValidForSubmit ? alert("yes upload!") : alert("NOT VALID DATA");
    }

    private handleInputNameChange() {
        const inputAuthorValue = (document.getElementById("inputName") as HTMLInputElement).value;
        if (inputAuthorValue.length > 0) {
            this.setState({ inputNameState: "valid" }, () => {
                this.validateSubmissionState();
                this.consoleLogDataStates();
            });
            return;
        }

        this.setState({ inputNameState: "invalid" }, () => {
            this.validateSubmissionState();
            this.consoleLogDataStates();
        });
        return;
    }

    private handleInputAuthorChange() {
        const inputAuthorValue = (document.getElementById("inputAuthor") as HTMLInputElement).value;
        if (inputAuthorValue.length > 0) {
            this.setState({ inputAuthorState: "valid" }, () => {
                this.validateSubmissionState();
                this.consoleLogDataStates();
            });
            return;
        }

        this.setState({ inputAuthorState: "invalid" }, () => {
            this.validateSubmissionState();
            this.consoleLogDataStates();
        });
        return;
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
              this.validateSubmissionState();
              this.consoleLogDataStates();
              return;
          } 

          if (fileSizeInMB > maxFilesizeInMB) {
            this.setState({ isValidFileSize: false }, () => {
                this.validateSubmissionState();
                this.consoleLogDataStates();
            });
            return;
          }

          (document.getElementById("inputName") as HTMLInputElement).value = fileName;
          
          this.setState({ 
              fileExtensionState: "valid", 
              isValidFileSize: true,
              inputNameState: "valid",
              file: URL.createObjectURL(event.target.files[0]),
            }, () => {
                this.validateSubmissionState();
                this.consoleLogDataStates();
            });
    }

    private renderPreview() {
        if (this.state.fileExtensionState === "invalid" 
            || this.state.fileExtensionState === "undefined"
            || this.state.file === null
        ) {
            if (this.state.isSkinTypeSelected) {
                this.setState({ isSkinTypeSelected: false }, () => {
                    this.validateSubmissionState();
                    this.consoleLogDataStates();
                });
            }
            return "Preview";
        }

        const selectedAssetType =  (document.getElementById("assetType") as HTMLSelectElement).value;

        if (selectedAssetType === TYPES.Skin && !this.state.isSkinTypeSelected) {
            // return Skinrenderer here - not working properly yet
            if (!this.state.isSkinTypeSelected) {
                this.setState({ isSkinTypeSelected: true }, () => {
                    this.validateSubmissionState();
                    this.consoleLogDataStates();
                });
            }
        } 

        if (selectedAssetType !== TYPES.Skin && this.state.isSkinTypeSelected) {
            this.setState({ isSkinTypeSelected: false }, () => {
                this.validateSubmissionState();
                this.consoleLogDataStates();
            });
        }
    
        return (
            <img src={this.state.file} className="card-img-top" id="previewSkin" />
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<Upload />, document.getElementById('app'));
} 