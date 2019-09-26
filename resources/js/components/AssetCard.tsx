import * as React from 'react';
import axios from 'axios';
import Tooltip from 'rc-tooltip';
import SkinRenderer from './SkinRenderer';
import BodySkinRenderer from './BodySkinRenderer';
import 'rc-tooltip/assets/bootstrap_white.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faDownload, faInfoCircle, faEllipsisV, faCheck, faLock, faTrash } from '@fortawesome/free-solid-svg-icons';

// Interfaces
/* eslint-disable-next-line no-unused-vars */
import { IUserInfoInterface } from '../interfaces/IUserInfoInterface';

// Services
import { UrlService, URLS } from '../Services/UrlService';
import { TYPES } from '../Services/AssetService';

interface IAssetCardProps {
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
}

export default class AssetCard extends React.Component<IAssetCardProps, IAssetCardState> {
    private readonly blockName = 'assetCanvas';
    private urlService: UrlService;

    public constructor (props: IAssetCardProps) {
      super(props);
      this.urlService = new UrlService();

      this.state = {

        // TODO: Refactor, no clean solution with deep ternary operators
        liked:
            this.props.assetType === TYPES.Skin
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
                        : this.props.userInfo.assetLikes.marking.includes(this.props.id),
        downloaded: false,
        likes: 0,
        downloads: 0,
        accepted: false,
        hid: false,
        deleted: false
      };
    }

    public render () {
      return (
        <div className="card">
          {this.renderHeadControl()}

          {this.renderAsset()}

          <div className="card-body">
            <h5 className={`card-title ${this.blockName}__title`}>{this.props.name}</h5>
            <p className={`card-text ${this.blockName}__author`}>by {this.props.author}</p>
          </div>
          {this.renderBottomControls()}
        </div>
      );
    }

    private renderAsset() {

      /* Render Skin */
      if (this.props.assetType === TYPES.Skin) {
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
          <img
              id={this.props.id + '_' + this.props.locationType}
              className={`card-img-top ${this.blockName}__preview ${this.blockName}__preview--${this.props.assetType}`}
              src={this.props.imagePath}
          />
        );
      }
    }

    private renderHeadControl () {
      const tooltipContent = (
        <span>
          Assettype: <strong>{this.props.assetType}</strong> <br />
          Downloads: <strong>{this.props.downloads + this.state.downloads}</strong> <br />
          Likes: <strong>{this.props.likes + this.state.likes}</strong> <br />
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
        <div className="btn-group" role="group" aria-label="controller">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={this.props.imagePath}
            className="btn btn-outline-primary"
            download
            onClick={() => this.handleDownloadClick()}
          >
            <FontAwesomeIcon icon={faDownload} />
          </a>
          <button
            className={`btn ${likeButtonClasses}`}
            onClick={() => this.handleLikeClick()}
          >
            <FontAwesomeIcon icon={faThumbsUp} />
          </button>
        </div>
      );
    }

    private renderSettingControls () {
      if (this.props.userInfo.role !== 'admin') {
        return;
      }

      return (
        <div className="dropdown">
          <button className={`${this.blockName}__settingController`} type="button" id="settingControls" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <FontAwesomeIcon icon={faEllipsisV} />
          </button>
          <div className="dropdown-menu" aria-labelledby="settingControls">

            {this.props.isPublic === 0 && (
              <a className={`${this.blockName}__dropdown-item dropdown-item`} onClick={() => this.handleAcceptOnClick()}>
                <FontAwesomeIcon icon={faCheck} /> Accept
              </a>
            )}

            {this.props.isPublic === 1 && (
              <a className={`${this.blockName}__dropdown-item dropdown-item`} onClick={() => this.handlePutPrivateOnClick()}>
                <FontAwesomeIcon icon={faLock} /> Put Private
              </a>
            )}

            <a className={`${this.blockName}__dropdown-item dropdown-item`} onClick={() => this.handleDeleteOnClick()}>
              <FontAwesomeIcon icon={faTrash} /> Delete
            </a>

          </div>
        </div>

      );
    }

    private handleDownloadClick (): void {
      if (!this.props.updateDownloads) {
        return;
      }

      axios({
        method: 'post',
        url: `${this.urlService.getBaseURL()}/download/${this.props.assetType}/${this.props.id}`
      })
        .then(() => {
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
          this.setState({
            liked: false,
            likes: this.state.likes - 1
          });
        }, (error) => {
          console.log(error);
        });
    }
}
