import * as React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import Wireframe from './components/Wireframe';
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
    postData: FormData | null;
    file: File;
    inputName: string | null,
    inputAuthor: string | null,
    assetType: string | null,
    fileExtensionState: 'invalid' | 'undefined' | 'valid';
    tempFile: string;
    isSkinTypeSelected: boolean;
    isValidFileSize: boolean;
    inputAuthorState: 'invalid' | 'undefined' | 'valid';
    inputNameState: 'invalid' | 'undefined' | 'valid';
    isValidForSubmit: boolean;
    uploadStatus: 'failed' | 'undefined' | 'success';
    assetNameState: 'invalid' | 'undefined' | 'valid';
}

export default class Upload extends React.Component<{}, IAppUploadStates> {
    private readonly blockName = 'upload';
    private utilsService: UtilsService;
    private urlService: UrlService;

    public constructor (props: {}) {
      super(props);
      this.state = {
        postData: null,
        file: null,
        inputName: null,
        inputAuthor: null,
        assetType: 'skin',
        fileExtensionState: 'undefined',
        inputAuthorState: 'undefined',
        inputNameState: 'undefined',
        tempFile: null,
        isSkinTypeSelected: false,
        isValidFileSize: true,
        isValidForSubmit: false,
        uploadStatus: 'undefined',
        assetNameState: 'undefined'
      };

      this.handleFileInput = this.handleFileInput.bind(this);
      this.utilsService = new UtilsService();
      this.urlService = new UrlService();
    }

    public render () {
      return (
        <Wireframe totalItemsCount={data.globalData.totalItemsCount}>
          {this.renderUploadStatusAlert()}
          {this.renderHeadline()}
          <form method="POST" encType="multipart/form-data" className={this.blockName}>
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

    private renderUploadStatusAlert () {
      if (this.state.uploadStatus === 'success') {
        return (
          <div className="alert alert-success" role="alert">
            <h4 className="alert-heading">Congratz!</h4>
            <p>You successfully uploaded an asset to Teeskins.</p>
          </div>
        );
      } else if (this.state.uploadStatus === 'failed') {
        return (
          <div className="alert alert-danger" role="alert">
            <h4 className="alert-heading">Ooops!</h4>
            <p>Something went wrong. Please check your input data and try to upload again. </p>
          </div>
        );
      }
    }

    private renderHeadline () {
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
                    <input type="file" className={inputClassName} id="assetUpload" required={true} onChange={() => this.handleFileInput(event)}/>
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
                <div style={this.state.isSkinTypeSelected ? { display: 'block' } : { display: 'none' }}>
                  <FontAwesomeIcon icon={faInfoCircle} /> Skinrenderer is currently not available in the preview.
                </div>

            </>
      );
    }

    private renderAssetInfosInput () {
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
                    <div className="invalid-feedback" style={this.state.assetNameState === 'invalid' ? { display: 'block' } : { display: 'none' }}>
                            An asset with this name is already in our database, please avoid duplicates.
                    </div>
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

    private renderAssetTypesSelect () {
      const assetTypeSelect = [];
      Object.keys(TYPES).map(key => {
        assetTypeSelect.push(
          <option key={TYPES[key]} disabled={TYPES[key] !== 'skin'} value={TYPES[key]}>
            {key}
          </option>
        );
      });

      return (
        <select
          value={this.state.assetType}
          required={true}
          name="assetType"
          className="form-control"
          id="assetType"
          onChange={() => this.handleAssetTypeChange()}
        >
          {assetTypeSelect}
        </select>
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

    private renderSubmitButton () {
      const submitButtonClassName = this.state.isValidForSubmit
        ? 'btn-success'
        : 'btn-secondary';

      return (
        <div className="row">
          <div className="col-md-10 offset-md-2">
            <button type="submit" className={`btn ${submitButtonClassName} btn-block btn-lg float-right`} onClick={() => this.handleSubmitButtonClick(event)}>
                        Submit
            </button>
          </div>
        </div>
      );
    }

    private validateSubmissionState () {
      this.setState({
        isValidForSubmit:
                this.state.tempFile !== null &&
                this.state.isValidFileSize &&
                this.state.fileExtensionState === 'valid' &&
                this.state.inputAuthorState === 'valid' &&
                this.state.inputNameState === 'valid' &&
                this.state.assetNameState === 'valid'
      });
    }

    private handleSubmitButtonClick (event: Event) {
      event.preventDefault();
      if (!this.state.isValidForSubmit) {
        return;
      }

      const postData = new FormData();
      postData.append('file', this.state.file);
      postData.append('name', this.state.inputName);
      postData.append('author', this.state.inputAuthor);
      postData.append('assetType', this.state.assetType);

      const settings = { headers: { 'content-type': 'multipart/form-data' } };
      console.log(postData);

      // Axios Upload here
      axios.post('/upload', postData, settings)
        .then(response => {
          this.setState({ uploadStatus: response.data }, () => {
            console.log('Upload Status: ' + this.state.uploadStatus);
          });
        })
        .then(error => {
          console.log(error);
        });
    }

    private handleInputNameChange () {
      const inputNameValue = (document.getElementById('inputName') as HTMLInputElement).value;

      if (inputNameValue.length > 0) {
        // Asset Name Duplicate Validation
        axios({
          method: 'post',
          url: `${this.urlService.getBaseURL()}/check/assetName/${inputNameValue}`
        })
          .then(response => {
            this.setState({
              assetNameState: response.data
            }, () => this.validateSubmissionState());
          }, error => {
            console.log(error);
          });

        this.setState({ inputNameState: 'valid' }, () => {
          this.setState({ inputName: inputNameValue }, () => this.validateSubmissionState());
        });
        return;
      }

      this.setState({ inputNameState: 'invalid' }, () => {
        this.validateSubmissionState();
      });
    }

    private handleInputAuthorChange () {
      const inputAuthorValue = (document.getElementById('inputAuthor') as HTMLInputElement).value;

      if (inputAuthorValue.length > 0) {
        this.setState({ inputAuthorState: 'valid' }, () => {
          this.setState({ inputAuthor: inputAuthorValue });
          this.validateSubmissionState();
        });
        return;
      }

      this.setState({ inputAuthorState: 'invalid' }, () => {
        this.validateSubmissionState();
      });
    }

    private handleAssetTypeChange () {
      const selectedAssetType = (document.getElementById('assetType') as HTMLSelectElement).value;
      this.setState({ assetType: selectedAssetType });
    }

    private handleFileInput (event) {
      if (!event || !event.target || !event.target.files || event.target.files.length === 0) {
        return;
      }

      // Fetch and save input data for upload
      const fileInputEl = document.getElementById('assetUpload') as HTMLInputElement;
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
        this.setState({ fileExtensionState: 'invalid' });
        this.validateSubmissionState();
        return;
      }

      if (fileSizeInMB > maxFilesizeInMB) {
        this.setState({ isValidFileSize: false }, () => {
          this.validateSubmissionState();
        });
        return;
      }

      (document.getElementById('inputName') as HTMLInputElement).value = fileName;

      // Asset Name Duplicate Validation
      axios({
        method: 'post',
        url: `${this.urlService.getBaseURL()}/check/assetName/${fileName}`
      })
        .then(response => {
          this.setState({
            assetNameState: response.data
          }, () => this.validateSubmissionState());
        }, error => {
          console.log(error);
        });

      this.setState({
        file: fileReal,
        inputName: fileName,
        fileExtensionState: 'valid',
        isValidFileSize: true,
        inputNameState: 'valid',
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
        if (this.state.isSkinTypeSelected) {
          this.setState({ isSkinTypeSelected: false }, () => {
            this.validateSubmissionState();
          });
        }
        return 'Preview';
      }

      const selectedAssetType = (document.getElementById('assetType') as HTMLSelectElement).value;

      if (selectedAssetType === TYPES.Skin && !this.state.isSkinTypeSelected) {
        // TODO: return Skinrenderer here - not working properly yet
        if (!this.state.isSkinTypeSelected) {
          this.setState({ isSkinTypeSelected: true }, () => {
            this.validateSubmissionState();
          });
        }
      }

      if (selectedAssetType !== TYPES.Skin && this.state.isSkinTypeSelected) {
        this.setState({ isSkinTypeSelected: false }, () => {
          this.validateSubmissionState();
        });
      }

      return (
        <img src={this.state.tempFile} className="card-img-top" id="previewSkin" />
      );
    }
}

if (document.getElementById('app')) {
  ReactDOM.render(<Upload />, document.getElementById('app'));
}
