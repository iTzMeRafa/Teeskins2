import * as React from 'react';

interface ISkinRendererProps {
    imagePath: string;
    id: string;
    size: "small" | "default" | "large";
}

export default class SkinRenderer extends React.Component<ISkinRendererProps> {

    private readonly blockName = "skinRenderer";

    public constructor(props: ISkinRendererProps) {
        super(props);
        this.renderSkin = this.renderSkin.bind(this);

    }

    public render() {
        return (
            <img id={this.props.id} className="card-img-top" src={this.props.imagePath} />
        );
    }

    public componentDidMount(): void {
        window.addEventListener('load', this.renderSkin);
    }

    public componentWillUnmount(): void {
        window.removeEventListener('load', this.renderSkin)
    }

    private renderSkin(): void {

        const skin = document.getElementById(this.props.id) as HTMLImageElement;
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = 96;
        canvas.height = 64;
        canvas.className = `${this.blockName} ${this.blockName}--${this.props.size}`;

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
}