// Packages
import * as React from 'react';
import axios from 'axios';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap_white.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faDownload, faInfoCircle } from '@fortawesome/free-solid-svg-icons'

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
    userInfo: IUserInfoInterface;
}

interface ISkinState {
    liked: boolean;
}

export default class Skin extends React.Component<ISkinProps, ISkinState> {

    private readonly blockName = "skinCanvas";
    private urlService;

    public constructor(props: ISkinProps) {
        super(props);
        this.renderSkin = this.renderSkin.bind(this);
        this.urlService = new UrlService();

        this.state = {
            liked: this.props.userInfo.assetLikes.skins.includes(this.props.id),
        }
    }

    public render() {
        return(
            <div className="card">
                {this.renderHeadControl()}
                <img id={this.props.id.toString()} className="card-img-top" src={this.props.imagePath} alt={this.props.name} />
                <div className="card-body">
                    <h5 className={`card-title ${this.blockName}__title`}>{this.props.name}</h5>
                    <p className={`card-text ${this.blockName}__author`}>by {this.props.author}</p>
                </div>
                {this.renderBottomControls()}
            </div>
        );
    }

    public componentDidMount(): void {
        window.addEventListener('load', this.renderSkin);
    }

    public componentWillUnmount(): void {
        window.removeEventListener('load', this.renderSkin)
    }

    private renderHeadControl() {
        const tooltipContent = (
            <span>
                Downloads: <strong>{this.props.downloads}</strong> <br />
                Likes: <strong>{this.props.likes}</strong> <br />
                Upload Date: <strong>{this.props.uploadDate}</strong>
            </span>
        );

        return (
            <div className={`${this.blockName}__headControl`}>
                <div className="float-left">
                
                </div>
                <div className="float-right">
                <Tooltip placement="topg" trigger={['hover']} overlay={tooltipContent}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                </Tooltip>
                </div>
                <div className="clearfix"></div>
            </div>
        );
    }

    private renderBottomControls() {

        console.log(this.state.liked);

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

    private renderSkin(): void {

        const skin = document.getElementById(this.props.id.toString()) as HTMLImageElement;
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = 96;
        canvas.height = 64;
        canvas.className = this.blockName;

        ctx.drawImage(skin,192,64,64,32,10,33,60,30); //back feet shadow
        ctx.drawImage(skin,192,32,64,32,8,32,64,32); //back feet
        ctx.drawImage(skin,96,0,96,96,16,0,64,64); //body shadow
        ctx.drawImage(skin,0,0,96,96,16,0,64,64); //body
        ctx.drawImage(skin,192,64,64,32,26,33,60,30); //front feet shadow
        ctx.drawImage(skin,192,32,64,32,24,32,64,32); //front feet
        ctx.drawImage(skin,64,96,32,32,36,14,24,24); //left eye

        //right eye (flip and draw)
        ctx.save();
        ctx.scale(-1,1);
        ctx.drawImage(skin,64,96,32,32,-69,14,24,24);
        ctx.restore();

        //replace with image
        skin.parentNode.replaceChild(canvas,skin);
    }

    private handleDownloadClick(): void {
        axios({
            method: 'post',
            url: `download/skin/${this.props.id}`,
        })
        .then(() => {
            this.setState({ liked: true });
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
            this.setState({ liked: true });
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
          this.setState({ liked: false });
        }, (error) => {
            console.log(error);
        });
    }
}
