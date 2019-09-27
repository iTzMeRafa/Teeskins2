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
    this.renderBodySkin = this.renderBodySkin.bind(this);

    this.state = {
      isLoaded: false
    };
  }

  public render () {
    return (
        <img
            id={this.props.id + '_body_' + this.props.locationType}
            className="card-img-top"
            src={this.props.imagePath}
            onLoad={this.renderBodySkin.bind(this)}
        />
    );
  }

  private renderBodySkin (): void {
    const body = document.getElementById(this.props.id + '_body_' + this.props.locationType) as HTMLImageElement;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.id = this.props.id + '_bodyCanvas';
    canvas.width = 128;
    canvas.height = 128;
    canvas.className = `${this.blockName} ${this.blockName}--${this.props.size}`;

    ctx.drawImage(body, 0, 0, 128, 128,0, 0, 128, 128 ); // top left
    ctx.drawImage(body, 128, 0, 128, 128,0, 0, 128, 128 ); // top right
    ctx.drawImage(body, 0, 128, 128, 128,0, 0, 128, 128 ); // bottom left
    ctx.drawImage(body, 128, 128, 128, 128,0, 0, 128, 128 ); // bottom right

    // replace with image
    body.parentNode.replaceChild(canvas, body);
  }
}
