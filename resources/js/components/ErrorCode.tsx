import * as React from 'react';

// Services
import { UrlService } from '../Services/UrlService';
import { ImageService } from '../Services/ImageService';

interface IErrorCodeProps {
    errorCode: number,
    text: string,
}

export default class ErrorCode extends React.Component<IErrorCodeProps> {
    private readonly blockName = 'errors';
    private readonly urlService;

    public constructor (props: IErrorCodeProps) {
      super(props);

      this.urlService = new UrlService();
    }

    public render () {
      return (
        <div className={this.blockName}>
          <img src={this.urlService.mergeBaseWithPathURL(ImageService.getErrorStatusImage(this.props.errorCode))} />
          <h3 className={`${this.blockName}__statusCode`}>
            {this.props.errorCode}
          </h3>
          <p className={`${this.blockName}__text`}>
            {this.props.text}
          </p>

        </div>
      );
    }
}
