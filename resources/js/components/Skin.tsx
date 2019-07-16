// Packages
import * as React from 'react';
import axios from 'axios';
import Tooltip from 'rc-tooltip';
import SkinRenderer from './SkinRenderer';
import 'rc-tooltip/assets/bootstrap_white.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faDownload, faInfoCircle, faEllipsisV } from '@fortawesome/free-solid-svg-icons'

// Interfaces
import { IUserInfoInterface } from './../interfaces/IUserInfoInterface';

// Services
import { UrlService, URLS } from './../Services/UrlService';

interface ISkinProps {
    id: number;
    name: string;
    author: string;
    imagePath: string;
    uploadDate: string;
    downloads: number;
    likes: number;
    isPublic: number;
    userInfo: IUserInfoInterface;
}

interface ISkinState {
    liked: boolean;
    downloaded: boolean;
    likes: number;
    downloads: number;
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
        }
    }

    public render() {
        return(
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
        );
    }

    private renderHeadControl() {
        const tooltipContent = (
            <span>
                Downloads: 
                <strong>{this.props.downloads + this.state.downloads}</strong> <br />
                Likes: <strong>{this.props.likes + this.state.likes}</strong> <br />
                Upload Date: <strong>{this.props.uploadDate}</strong>
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
        return (
            <div className="dropdown">
                <button className={`${this.blockName}__settingController`} type="button" id="settingControls" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <FontAwesomeIcon icon={faEllipsisV} />
                </button>
                <div className="dropdown-menu" aria-labelledby="settingControls">
                    <a className="dropdown-item" href="#">Action</a>
                    <a className="dropdown-item" href="#">Another action</a>
                    <a className="dropdown-item" href="#">Something else here</a>
                </div>
            </div>
            
        );
    }

    private handleDownloadClick(): void {
        axios({
            method: 'post',
            url: `download/skin/${this.props.id}`,
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

    private handleLikeClick(): void {

        if (!this.props.userInfo.isLoggedIn) {
            this.urlService.redirectToPageURL(URLS.Login);
            return;
        }

        this.state.liked
            ? this.unlike()
            : this.like();
    }

    private like(): void {
        axios({
            method: 'post',
            url: `like/skin/${this.props.id}`,
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
            url: `unlike/skin/${this.props.id}`,
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
