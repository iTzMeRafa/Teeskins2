// Packages
import * as React from 'react';
import LazyLoad from 'react-lazy-load';
import axios from 'axios';
import Tooltip from 'rc-tooltip';
import SkinRenderer from './SkinRenderer';
import 'rc-tooltip/assets/bootstrap_white.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faDownload, faInfoCircle, faEllipsisV, faCheck, faLock, faTrash  } from '@fortawesome/free-solid-svg-icons'

// Interfaces
import { IUserInfoInterface } from './../interfaces/IUserInfoInterface';

// Services
import { UrlService, URLS } from './../Services/UrlService';

interface ISkinProps {
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
}

interface ISkinState {
    liked: boolean;
    downloaded: boolean;
    likes: number;
    downloads: number;
    accepted: boolean;
    hid: boolean;
    deleted: boolean;
}

export default class Skin extends React.Component<ISkinProps, ISkinState> {

    private readonly blockName = "skinCanvas";
    private urlService: UrlService;

    public constructor(props: ISkinProps) {
        super(props);
        this.urlService = new UrlService();

        this.state = {
            liked: this.props.userInfo.assetLikes.skins.includes(this.props.id),
            downloaded: false,
            likes: 0,
            downloads: 0,
            accepted: false,
            hid: false,
            deleted: false,
        }
    }

    public render() {

        return(
            <LazyLoad height={280}>
                <div className="card">
                    {this.renderHeadControl()}
                    <SkinRenderer
                        imagePath={this.props.imagePath}
                        size="default"
                        id={this.props.id.toString()}
                    />
                    <div className="card-body">
                        <h5 className={`card-title ${this.blockName}__title`}>{this.props.name}</h5>
                        <p className={`card-text ${this.blockName}__author`}>by {this.props.author}</p>
                    </div>
                    {this.renderBottomControls()}
                </div>
            </LazyLoad>
        );
    }

    private renderHeadControl() {
        const tooltipContent = (
            <span>
                Downloads: 
                <strong>{this.props.downloads + this.state.downloads}</strong> <br />
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
                <div className="clearfix"></div>
            </div>
        );
    }

    private renderBottomControls() {
        const likeButtonClasses = this.props.userInfo.isLoggedIn 
            ? this.state.liked
                ? "btn-success"
                : "btn-outline-success" 
            : "btn-outline-secondary";

        return (
            <div className="btn-group" role="group" aria-label="controller">
                <a
                    target="_blank"
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

    private renderSettingControls() {
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

    private getVisibility() {
        return !(this.state.hid || this.state.deleted || this.state.accepted);
    }

    private handleDownloadClick(): void {
        if (!this.props.updateDownloads) {
            return;
        }
        
        axios({
            method: 'post',
            url: `${this.urlService.getBaseURL()}/download/skin/${this.props.id}`,
        })
        .then(() => {
            this.setState({ 
                downloaded: true,
                downloads: this.state.downloads + 1, 
            });
        }, (error) => {
            console.log(error);
        });
    }

    private handleAcceptOnClick() {
        if (confirm('Are you sure to accept this asset?')) {
            axios({
                method: 'post',
                url: `${this.urlService.getBaseURL()}/accept/skin/${this.props.id}`,
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

    private handlePutPrivateOnClick() {
        if (confirm('Are you sure to put this asset private?')) {
            axios({
                method: 'post',
                url: `${this.urlService.getBaseURL()}/hide/skin/${this.props.id}`,
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

    private handleDeleteOnClick() {
        if (confirm('Are you sure to delete this asset?')) {
            axios({
                method: 'post',
                url: `${this.urlService.getBaseURL()}/delete/skin/${this.props.id}`,
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

    private handleLikeClick(): void {
    
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

    private like(): void {
        axios({
            method: 'post',
            url: `${this.urlService.getBaseURL()}/like/skin/${this.props.id}`,
        })
        .then(() => {
            this.setState({ 
                liked: true,
                likes: this.state.likes + 1,
            });
        }, (error) => {
            console.log(error);
        });
    }

    private unlike(): void {
        axios({
            method: 'post',
            url: `${this.urlService.getBaseURL()}/unlike/skin/${this.props.id}`,
        })
        .then(() => {
            this.setState({ 
                liked: false,
                likes: this.state.likes - 1, 
            });
        }, (error) => {
            console.log(error);
        });
    }
}
