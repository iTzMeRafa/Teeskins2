import * as React from 'react';
import { placeholderImage, AssetService } from '../Services/AssetService';

interface ISkinRendererProps {
    imagePath: string;
    id: string;
    size: "small" | "default" | "large";
}

interface ISkinRendererState {
    isLoaded: boolean;
}

export default class SkinRenderer extends React.Component<ISkinRendererProps, ISkinRendererState> {

    private readonly blockName = "skinRenderer";
    private readonly assetService: AssetService;

    public constructor(props: ISkinRendererProps) {
        super(props);
        this.renderSkin = this.renderSkin.bind(this);

        this.assetService = new AssetService();
        this.assetService.lazyLoadImages();

        this.state = {
            isLoaded: false, 
        }
    }

    public render() {
        return (
            <img 
                id={this.props.id} 
                className="card-img-top" 
                src={this.props.imagePath} 
            />
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
        
        canvas.id = this.props.id;
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

        // Convert Canvas to Image to be able to lazyload
        const renderedCanvas = document.getElementById(this.props.id) as HTMLCanvasElement;
        const img = new Image();

        img.src = renderedCanvas.toDataURL();
        img.height = 64;
        img.width = 96;
        img.className = `lazy ${this.blockName} ${this.blockName}--${this.props.size}`;

        renderedCanvas.parentNode.replaceChild(img, renderedCanvas);
    }
}