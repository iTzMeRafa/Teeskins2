import * as React from 'react';
import { observer, inject } from 'mobx-react';
import axios from 'axios';
import Tooltip from 'rc-tooltip';
import SkinRenderer from './SkinRenderer';
import BodySkinRenderer from './BodySkinRenderer';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faDownload,
  faEllipsisV,
  faFlag,
  faInfoCircle,
  faLock,
  faSearchPlus,
  faThumbsUp,
  faTrash,
  faTint
} from '@fortawesome/free-solid-svg-icons';
import Lightbox from 'react-image-lightbox';

// CSS
import 'rc-tooltip/assets/bootstrap_white.css';
import 'react-image-lightbox/style.css';

// Interfaces
/* eslint-disable-next-line no-unused-vars */
import {IUserInfoInterface} from '../interfaces/IUserInfoInterface';
import {IStoreInterface} from "../interfaces/IStoreInterface";

// Services
import {URLS, UrlService} from '../Services/UrlService';
import {TYPES} from '../Services/AssetService';

interface IAssetCardProps {
    stores?: IStoreInterface;
    id: number;
    name: string;
    author: string;
    imagePath: string;
    username: string;
    uploadDate: string;
    downloads: number;
    likes: number;
    isPublic: number;
    handleVisibilityChange?: () => void;
    userInfo: IUserInfoInterface;
    updateDownloads: boolean;
    updateLikes: boolean;
    assetType: TYPES;

    /**
     * Prevents duplicate id for image tag, if the same asset will be displayed multiple times on one page
     */
    locationType: 'newest' | 'likes' | 'downloads' | 'assetPage' ;
}

interface IAssetCardState {
    liked: boolean;
    downloaded: boolean;
    likes: number;
    downloads: number;
    accepted: boolean;
    hid: boolean;
    deleted: boolean;
    isLightBoxOpen: boolean;
    successfulReported: boolean;
}

@inject('stores')
@observer
export default class AssetCard extends React.Component<IAssetCardProps, IAssetCardState> {
    private readonly blockName = 'assetCanvas';
    private urlService: UrlService;

    public constructor (props: IAssetCardProps) {
      super(props);
      this.urlService = new UrlService();

      this.state = {

        liked:
            this.props.assetType === TYPES.Skins
            ? this.props.userInfo.assetLikes.skins.includes(this.props.id)

            : this.props.assetType === TYPES.Body
            ? this.props.userInfo.assetLikes.body.includes(this.props.id)

            : this.props.assetType === TYPES.Decoration
            ? this.props.userInfo.assetLikes.decoration.includes(this.props.id)

            : this.props.assetType === TYPES.Eyes
            ? this.props.userInfo.assetLikes.eyes.includes(this.props.id)

            : this.props.assetType === TYPES.Feet
            ? this.props.userInfo.assetLikes.feet.includes(this.props.id)

            : this.props.assetType === TYPES.Hands
            ? this.props.userInfo.assetLikes.hands.includes(this.props.id)

            : this.props.assetType === TYPES.Marking
            ? this.props.userInfo.assetLikes.marking.includes(this.props.id)

            : this.props.assetType === TYPES.Mapres
            ? this.props.userInfo.assetLikes.mapres.includes(this.props.id)

            : this.props.assetType === TYPES.Gameskins
            ? this.props.userInfo.assetLikes.gameskins.includes(this.props.id)

            : this.props.assetType === TYPES.Emoticons
            ? this.props.userInfo.assetLikes.emoticons.includes(this.props.id)

            : this.props.assetType === TYPES.Cursors
            ? this.props.userInfo.assetLikes.cursors.includes(this.props.id)

            : this.props.assetType === TYPES.Particles
            ? this.props.userInfo.assetLikes.particles.includes(this.props.id)

            : this.props.userInfo.assetLikes.grids.includes(this.props.id),
        downloaded: false,
        likes: 0,
        downloads: 0,
        accepted: false,
        hid: false,
        deleted: false,
        isLightBoxOpen: false,
        successfulReported: false,
      };
    }

    public render () {
      return (
          <>
            <div className="card">
              {this.renderHeadControl()}

              {this.renderAsset()}

              <div className="card-body">
                <h5 className={`card-title ${this.blockName}__title`}>{this.props.name}</h5>
                <p className={`card-text ${this.blockName}__author`}>by {this.props.author}</p>
              </div>
              {this.renderBottomControls()}
            </div>
            {this.renderReportModal()}
          </>
      );
    }

    private renderAsset() {

      /* Render Skin */
      if (this.props.assetType === TYPES.Skins) {
        return (
          <SkinRenderer
              imagePath={this.props.imagePath}
              size="default"
              id={this.props.id.toString()}
              locationType={this.props.locationType}
          />
        );
      }

      /* Render Body */
      else if (this.props.assetType === TYPES.Body) {
          return (
            <BodySkinRenderer
                imagePath={this.props.imagePath}
                size="default"
                id={this.props.id.toString()}
                locationType={this.props.locationType}
            />
          );
      }

      /* Render Other Types */
      else {
        return (
            <div className={`${this.blockName}__outerPreview`}>
              <div className={`${this.blockName}__content-overlay`}  onClick={() => this.setState({ isLightBoxOpen: true })} />
              <img
                  id={this.props.id + '_' + this.props.locationType}
                  className={`card-img-top ${this.blockName}__preview ${this.blockName}__preview--${this.props.assetType}`}
                  src={this.props.imagePath}
                  onClick={() => this.setState({ isLightBoxOpen: true })}
              />
              <div className={`${this.blockName}__content-details ${this.blockName}__fadeIn-top`} onClick={() => this.setState({ isLightBoxOpen: true })}>
                <FontAwesomeIcon icon={faSearchPlus} size={'2x'} />
              </div>
              {this.state.isLightBoxOpen && (
                  <Lightbox
                      mainSrc={this.props.imagePath}
                      onCloseRequest={() => this.setState({ isLightBoxOpen: false })}
                  />
              )}
            </div>
        );
      }
    }

    private renderHeadControl () {
      const tooltipContent = (
        <span>
          Assettype: <strong>{this.props.assetType}</strong> <br />
          Upload Date: <strong>{this.props.uploadDate}</strong> <br />
          Uploaded By: <strong>{this.props.username}</strong>
        </span>
      );

      return (
        <div className={`${this.blockName}__headControl`}>
          <div className="float-left">
            {this.renderSettingControls()}
          </div>
          <div className="float-right">
            <Tooltip placement="top" trigger={['hover']} overlay={tooltipContent}>
              <FontAwesomeIcon icon={faInfoCircle} />
            </Tooltip>
          </div>
          <div className="clearfix" />
        </div>
      );
    }

    private renderBottomControls () {
      const likeButtonClasses = this.props.userInfo.isLoggedIn
        ? this.state.liked
          ? 'btn-success'
          : 'btn-outline-success'
        : 'btn-outline-secondary';

      return (
        <div className={`btn-group ${this.blockName}__bottomControls`} role="group" aria-label="controller">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`${this.urlService.getBaseURL()}/download/${this.props.assetType}/${this.props.id}/false`}
            className={`btn btn-outline-primary ${this.blockName}__bottomControls--button`}
            download
            onClick={() => this.handleDownloadClick()}
          >
            <FontAwesomeIcon icon={faDownload} /> {this.props.downloads + this.state.downloads}
          </a>
          <button
            className={`btn ${likeButtonClasses} ${this.blockName}__bottomControls--button`}
            onClick={() => this.handleLikeClick()}
          >
            <FontAwesomeIcon icon={faThumbsUp} /> {this.props.likes + this.state.likes}
          </button>
        </div>
      );
    }

    private renderSettingControls () {

      return (
        <div className="dropdown">
          <button className={`${this.blockName}__settingController`} type="button" id="settingControls" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <FontAwesomeIcon icon={faEllipsisV} />
          </button>
          <div className="dropdown-menu" aria-labelledby="settingControls">

            {this.props.isPublic === 0 && this.props.userInfo.role === 'admin' && (
              <a className={`${this.blockName}__dropdown-item dropdown-item`} onClick={() => this.handleAcceptOnClick()}>
                <FontAwesomeIcon icon={faCheck} /> Accept
              </a>
            )}

            {this.props.isPublic === 1 && this.props.userInfo.role === 'admin' && (
              <a className={`${this.blockName}__dropdown-item dropdown-item`} onClick={() => this.handlePutPrivateOnClick()}>
                <FontAwesomeIcon icon={faLock} /> Put Private
              </a>
            )}

            {this.props.userInfo.role === 'admin' && (
              <a className={`${this.blockName}__dropdown-item dropdown-item`} onClick={() => this.handleDeleteOnClick()}>
                <FontAwesomeIcon icon={faTrash} /> Delete
              </a>
            )}

            {this.props.userInfo.isLoggedIn ? (
              <a className={`${this.blockName}__dropdown-item dropdown-item`} data-toggle="modal" data-target={`#reportModal-${this.props.id}-${this.props.locationType}`}>
                <FontAwesomeIcon icon={faFlag} /> Report
              </a>
            ) : (
                <a href={this.urlService.mergeBaseWithURL(URLS.Login)} className={`${this.blockName}__dropdown-item dropdown-item`}>
                  <FontAwesomeIcon icon={faFlag} /> Report
                </a>
              )}

            <a
                target="_blank"
                rel="noopener noreferrer"
                href={`${this.urlService.getBaseURL()}/download/${this.props.assetType}/${this.props.id}/true`}
                className={`${this.blockName}__dropdown-item dropdown-item`}
                download
                onClick={() => this.handleDownloadClick()}
            >
              <FontAwesomeIcon icon={faTint} /> Greyscale download
            </a>

          </div>
        </div>
      );
    }
    
    private renderReportModal() {
      return (
          <div className="modal fade" id={`reportModal-${this.props.id}-${this.props.locationType}`} tabIndex={-1} role="dialog" aria-labelledby="reportModalTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLongTitle">Report Asset</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p className="mb-5">
                    You are about to report the {this.props.assetType} "<strong>{this.props.name}</strong>". <br />
                    Please choose and tell us the reason for that.
                  </p>

                  <div className="btn-group btn-group-toggle mb-5" data-toggle="buttons" style={{width: '100%'}}>
                    <label className="btn btn-outline-secondary active">
                      <input
                          type="radio"
                          name={`reportReason-${this.props.id}-${this.props.locationType}`}
                          value="author"
                          autoComplete="off"
                          defaultChecked={true}
                      /> Wrong Author
                    </label>
                    <label className="btn btn-outline-secondary">
                      <input
                          type="radio"
                          name={`reportReason-${this.props.id}-${this.props.locationType}`}
                          value="file"
                          autoComplete="off"
                      /> Corrupted File
                    </label>
                    <label className="btn btn-outline-secondary">
                      <input
                          type="radio"
                          name={`reportReason-${this.props.id}-${this.props.locationType}`}
                          value="other"
                          autoComplete="off"
                      /> Others
                    </label>
                  </div>

                  <div className="form-group">
                    <label htmlFor={`reportReasonTextarea-${this.props.id}-${this.props.locationType}`}>Your reason or improvement</label>
                    <textarea className="form-control" id={`reportReasonTextarea-${this.props.id}-${this.props.locationType}`} rows={5} />
                  </div>

                </div>
                <div className="modal-footer">
                  <button type="button" id={`closeReportModalButton-${this.props.id}-${this.props.locationType}`} className="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-primary" onClick={() => this.sendReport()}>Report</button>
                </div>
              </div>
            </div>
          </div>  
      );
    }

    private sendReport(): void {
      const reportReasonVal = (document.querySelector(`input[name = "reportReason-${this.props.id}-${this.props.locationType}"]:checked`) as HTMLInputElement).value;
      const reportReasonText = (document.getElementById(`reportReasonTextarea-${this.props.id}-${this.props.locationType}`) as HTMLTextAreaElement).value;
      const closeReportModalButton = document.getElementById(`closeReportModalButton-${this.props.id}-${this.props.locationType}`) as HTMLButtonElement;

      if (reportReasonVal && reportReasonText) {
        axios({
          method: 'post',
          url: `${this.urlService.getBaseURL()}/report/${this.props.assetType}/${this.props.id}/${reportReasonVal}/${reportReasonText}`
        })
          .then(response => {
           if (response.data === 'valid') {
             closeReportModalButton.click();
             this.props.stores.notificationStore.addReportedToast(this.props.assetType+'Report'+this.props.id, this.props.name);
             this.setState({ successfulReported: true })
           }
          }, error => {
            console.log(error);
          });
      }
    }

    private handleDownloadClick (): void {
      if (!this.props.updateDownloads) {
        return;
      }

      axios({
        method: 'post',
        url: `${this.urlService.getBaseURL()}/download/increment/${this.props.assetType}/${this.props.id}`
      })
        .then(() => {
          this.props.stores.notificationStore.addDownloadToast(this.props.assetType+'Download'+this.props.id, this.props.name);
          this.setState({
            downloaded: true,
            downloads: this.state.downloads + 1
          });
        }, (error) => {
          console.log(error);
        });
    }

    private handleAcceptOnClick () {
      if (confirm('Are you sure to accept this asset?')) {
        axios({
          method: 'post',
          url: `${this.urlService.getBaseURL()}/accept/${this.props.assetType}/${this.props.id}`
        })
          .then(() => {
            if (this.props.handleVisibilityChange) {
              this.props.handleVisibilityChange();
            }
          }, (error) => {
            console.log(error);
          });
      }
    }

    private handlePutPrivateOnClick () {
      if (confirm('Are you sure to put this asset private?')) {
        axios({
          method: 'post',
          url: `${this.urlService.getBaseURL()}/hide/${this.props.assetType}/${this.props.id}`
        })
          .then(() => {
            if (this.props.handleVisibilityChange) {
              this.props.handleVisibilityChange();
            }
          }, (error) => {
            console.log(error);
          });
      }
    }

    private handleDeleteOnClick () {
      if (confirm('Are you sure to delete this asset?')) {
        axios({
          method: 'post',
          url: `${this.urlService.getBaseURL()}/delete/${this.props.assetType}/${this.props.id}`
        })
          .then(() => {
            if (this.props.handleVisibilityChange) {
              this.props.handleVisibilityChange();
            }
          }, (error) => {
            console.log(error);
          });
      }
    }

    private handleLikeClick (): void {
      if (!this.props.userInfo.isLoggedIn) {
        this.urlService.redirectToPageURL(URLS.Login);
        return;
      }

      if (!this.props.updateLikes) {
        return;
      }
      this.state.liked
        ? this.unlike()
        : this.like();
    }

    private like (): void {
      axios({
        method: 'post',
        url: `${this.urlService.getBaseURL()}/like/${this.props.assetType}/${this.props.id}`
      })
        .then(() => {
          this.props.stores.notificationStore.addLikedToast(this.props.assetType+'Like'+this.props.id, this.props.name);
          this.setState({
            liked: true,
            likes: this.state.likes + 1
          });
        }, (error) => {
          console.log(error);
        });
    }

    private unlike (): void {
      axios({
        method: 'post',
        url: `${this.urlService.getBaseURL()}/unlike/${this.props.assetType}/${this.props.id}`
      })
        .then(() => {
          this.props.stores.notificationStore.addUnlikedToast(this.props.assetType+'Dislike'+this.props.id, this.props.name);
          this.setState({
            liked: false,
            likes: this.state.likes - 1
          });
        }, (error) => {
          console.log(error);
        });
    }
}
