import * as React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import Wireframe from './components/Wireframe';
import SkinRenderer from './components/SkinRenderer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

// Interfaces
/* eslint-disable-next-line no-unused-vars */
import { IDataInterface } from './interfaces/IDataInterface';

// Services
import { TYPES, EXTENSIONS, maxFilesizeInMB } from './Services/AssetService';
import { UtilsService } from './Services/UtilsService';
import { UrlService } from './Services/UrlService';

require('./bootstrap');

/*
 * This global variable comes from the page associated controller
 * and contains all necessary data for its view and the wireframe
 */
declare var data: IDataInterface;

interface IAppUploadStates {
  inputName: string | null,
  fileExtensionState: 'invalid' | 'undefined' | 'valid';
  tempFile: string;
  isValidFileSize: boolean;
  isValidForDownload: boolean;
  assetSize: 'small' | 'default' | 'large';
  fileExtension: string;
}

export default class AppSkinRenderer extends React.Component<{}, IAppUploadStates> {
  private readonly blockName = 'upload';
  private utilsService: UtilsService;
  private urlService: UrlService;

  public constructor (props: {}) {
    super(props);
    this.state = {
      inputName: null,
      fileExtensionState: 'undefined',
      tempFile: null,
      isValidFileSize: true,
      isValidForDownload: false,
      assetSize: "default",
      fileExtension: "",
    };

    this.handleFileInput = this.handleFileInput.bind(this);
    this.utilsService = new UtilsService();
    this.urlService = new UrlService();
  }

  public render () {
    return (
        <Wireframe totalItemsCount={data.globalData.totalItemsCount}>
          {this.renderAlert()}
          {this.renderHeadline()}
          <div className={this.blockName}>
            <div className="row">
              <div className="col-md-6 mb-3">
                {this.renderAssetUploadInput()}
              </div>
              <div className="col-md-6 mb-3">
                {this.renderConfigPanel()}
              </div>
            </div>
          </div>
        </Wireframe>
    );
  }

  private renderHeadline() {
    return (
      <>
       <h1>Teeworlds Skin Renderer</h1>
       <h3>Live Skin Preview</h3>
      </>
    );
  }

  private renderAlert () {
    const allowedExtensions = [];
    Object.keys(EXTENSIONS).map(key => {
      allowedExtensions.push(EXTENSIONS[key]);
    });
    return (
        <div className="alert alert-info mb-5" role="alert">
          Keep in mind that only <strong>.{allowedExtensions.join(', .')}</strong> files are permissible with a max. file-size of <strong>{maxFilesizeInMB} MB</strong>.
        </div>
    );
  }

  private renderAssetUploadInput () {
    const inputClassName = this.state.fileExtensionState === 'valid' && this.state.isValidFileSize
        ? 'custom-file-input is-valid'
        : this.state.fileExtensionState === 'invalid'
            ? 'custom-file-input is-invalid'
            : 'custom-file-input';

    return (
        <>
          <div className="input-group mb-4">
            <div className="custom-file">
              <input type="file" className={inputClassName} id="skinrenderer" required={true} onChange={() => this.handleFileInput(event)}/>
              <label className="custom-file-label" id="assetInputLabel">Choose Asset...</label>
            </div>
            <div className="invalid-feedback" style={this.state.fileExtensionState === 'invalid' ? { display: 'block' } : { display: 'none' }}>
              Please select a valid file.
            </div>
            <div className="invalid-feedback" style={!this.state.isValidFileSize ? { display: 'block' } : { display: 'none' }}>
              The max. allowed filesize is {maxFilesizeInMB} MB.
            </div>
          </div>

          <div className={`${this.blockName}__preview mb-3`}>
            <div className={`${this.blockName}__preview__display`}>
              {this.renderPreview()}
            </div>
          </div>
        </>
    );
  }

  private renderConfigPanel () {
    return (
        <>
          <div className="form-group row">
            <label className="col-sm-4 col-form-label">Save As*</label>
            <div className="col-sm-8">
              <input type="text" className="form-control" required={true} id="saveAsName" placeholder="e.g cammo-rendered" />
            </div>
          </div>
          <div className="form-group row mb-5">
            <label className="col-sm-4 col-form-label">Skin Size*</label>
            <div className="col-sm-8">
              <select
                  value={this.state.assetSize}
                  required={true}
                  name="assetSize"
                  className="form-control"
                  id="assetSize"
                  onChange={() => this.handleAssetSizeChange()}
              >
                <option key="small" value="small">
                  Small
                </option>
                <option key="default" value="default">
                  Default
                </option>
                <option key="large" value="large">
                  Large
                </option>
              </select>
            </div>
          </div>
          {this.renderDownloadButton()}
        </>
    );
  }

  private renderFileFakePath (fileFakePath: string) {
    const filePathLabelEl = document.getElementById('assetInputLabel') as HTMLLabelElement;
    const textNode = document.createTextNode(fileFakePath);

    while (filePathLabelEl.firstChild) {
      filePathLabelEl.removeChild(filePathLabelEl.firstChild);
    }

    filePathLabelEl.appendChild(textNode);
  }

  private renderDownloadButton () {
    const submitButtonClassName = this.state.isValidForDownload
        ? 'btn-success'
        : 'btn-secondary';

    return (
        <div className="row">
          <div className="col-md-8 offset-md-4">
            <button type="submit" className={`btn ${submitButtonClassName} btn-block btn-lg float-right`} onClick={() => this.handleDownloadButtonClick(event)}>
              Download
            </button>
          </div>
        </div>
    );
  }

  private validateSubmissionState () {
    this.setState({
      isValidForDownload:
          this.state.tempFile !== null &&
          this.state.isValidFileSize &&
          this.state.fileExtensionState === 'valid'
    });
  }

  private handleAssetSizeChange() {
    const selectedAssetSize = (document.getElementById('assetSize') as HTMLSelectElement).value;
    const skinElement = document.getElementById('1_skinRender_assetPage') as HTMLImageElement;
    if (selectedAssetSize === "small" || selectedAssetSize === "default" ||selectedAssetSize === "large") {

      if (skinElement) {
        skinElement.classList.remove(`skinRenderer--${this.state.assetSize}`);
        skinElement.classList.add(`skinRenderer--${selectedAssetSize}`);
      }

      this.setState({assetSize: selectedAssetSize});
    }
  }

  private handleDownloadButtonClick (event: Event) {
    event.preventDefault();
    if (!this.state.isValidForDownload) {
      return;
    }
    const skinRenderSrc = (document.getElementById("1_skinRender_assetPage") as HTMLImageElement).src;
    const saveAsName = (document.getElementById("saveAsName") as HTMLInputElement).value;
    const link = document.createElement('a');
    link.href = skinRenderSrc;
    link.download = saveAsName + '.' + this.state.fileExtension;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }


  private handleFileInput (event) {
    if (!event || !event.target || !event.target.files || event.target.files.length === 0) {
      return;
    }

    // Fetch and save input data for upload
    const fileInputEl = document.getElementById('skinrenderer') as HTMLInputElement;
    const fileReal = fileInputEl.files[0];
    const file = event.target.files[0];
    const fileFakePath = fileInputEl.value;
    const fileSizeInMB = file.size / 1024 / 1024;
    const name = file.name;
    const lastDot = name.lastIndexOf('.');
    const fileName = name.substring(0, lastDot);
    const ext = name.substring(lastDot + 1);

    this.renderFileFakePath(fileFakePath);

    // Validation
    if (!Object.values(EXTENSIONS).includes(ext)) {
      this.setState({ fileExtensionState: 'invalid' }, () => this.validateSubmissionState() );
      return;
    }

    if (fileSizeInMB > maxFilesizeInMB) {
      this.setState({ isValidFileSize: false }, () => {
        this.validateSubmissionState();
      });
      return;
    }

    (document.getElementById('saveAsName') as HTMLInputElement).value = fileName + '-rendered';

    this.setState({
      inputName: fileName,
      fileExtensionState: 'valid',
      isValidFileSize: true,
      fileExtension: ext,
      tempFile: URL.createObjectURL(event.target.files[0])
    }, () => {
      this.validateSubmissionState();
    });
  }

  private renderPreview () {

    if (this.state.fileExtensionState === 'invalid' ||
        this.state.fileExtensionState === 'undefined' ||
        this.state.tempFile === null
    ) {
      return 'Preview';
    }

    return (
        <SkinRenderer imagePath={this.state.tempFile} id="1" size={this.state.assetSize} locationType="assetPage"/>
    );
  }
}

if (document.getElementById('app')) {
  ReactDOM.render(<AppSkinRenderer />, document.getElementById('app'));
}
