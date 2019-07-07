import * as React from 'react';
import axios from 'axios';

interface ISkinProps {
    id: number;
    name: string;
    author: string;
    imagePath: string;
    uploadDate: string;
}

export default class Skin extends React.Component<ISkinProps> {

    private readonly blockName = "skinCanvas";

    public constructor(props: ISkinProps) {
        super(props);
        this.renderSkin = this.renderSkin.bind(this);
    }

    public render() {
        return(
            <div className="card">
                <img id={this.props.id.toString()} className="card-img-top" src={this.props.imagePath} alt={this.props.name} />
                    <div className="card-body">
                        <h5 className={`card-title ${this.blockName}__title`}>{this.props.name}</h5>
                        <p className={`card-text ${this.blockName}__author`}>by {this.props.author}</p>
                        <a
                            target="_blank"
                            href={this.props.imagePath}
                            className="btn btn-primary"
                            download
                            onClick={() => this.increaseDownload()}
                        >
                            Download
                        </a>
                    </div>
            </div>
        );
    }

    public componentDidMount(): void {
        window.addEventListener('load', this.renderSkin);
    }

    public componentWillUnmount(): void {
        window.removeEventListener('load', this.renderSkin)
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

    private increaseDownload(): void {
        axios({
            method: 'post',
            url: `download/skin/${this.props.id}`,
        })
        .then(() => {
            // State download could be true to trigger a visual notification
        }, (error) => {
            console.log(error);
        });
    }
}
