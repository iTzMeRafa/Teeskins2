import * as React from 'react';

interface IBodySkinRendererProps {
  imagePath: string;
  id: string;
  size: 'small' | 'default' | 'large';
  locationType: 'newest' | 'likes' | 'downloads' | 'assetPage';
}

interface IBodySkinRendererState {
  isLoaded: boolean;
}

export default class BodySkinRenderer extends React.Component<IBodySkinRendererProps, IBodySkinRendererState> {
  private readonly blockName = 'bodySkinRenderer';

  public constructor (props: IBodySkinRendererProps) {
    super(props);
    this.renderSkin = this.renderSkin.bind(this);

    this.state = {
      isLoaded: false
    };
  }

  public render () {
    return (
        <img
            id={this.props.id + '_' + this.props.locationType}
            className="card-img-top"
            src={this.props.imagePath}
            onLoad={this.renderSkin.bind(this)}
        />
    );
  }

  private renderSkin (): void {
    const skin = document.getElementById(this.props.id + '_' + this.props.locationType) as HTMLImageElement;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.id = this.props.id;
    canvas.width = 128;
    canvas.height = 128;
    canvas.className = `${this.blockName} ${this.blockName}--${this.props.size}`;

    ctx.drawImage(skin, 0, 0, 128, 128,0, 0, 128, 128 ); // top left
    ctx.drawImage(skin, 128, 0, 128, 128,0, 0, 128, 128 ); // top right
    ctx.drawImage(skin, 0, 128, 128, 128,0, 0, 128, 128 ); // bottom left
    ctx.drawImage(skin, 128, 128, 128, 128,0, 0, 128, 128 ); // bottom right

    ctx.save();
    ctx.restore();

    // replace with image
    skin.parentNode.replaceChild(canvas, skin);
  }
}
