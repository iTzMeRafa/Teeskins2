import * as React from 'react';

// Services
import { UrlService } from '../Services/UrlService';
import { ICONS } from "../Services/ImageService";

interface IJumbotronProps {
    title: string;
    subtitle: string;
    buttonText?: string;
    buttonURL?: string;
    showButton: boolean;
}

export default class Jumbotron extends React.Component<IJumbotronProps> {
  private readonly blockName = "_jumbotron";
  private readonly urlService: UrlService;

  public constructor (props: IJumbotronProps) {
    super(props);
    this.urlService = new UrlService();
  }

  public render () {
    return (
      <div className={this.blockName}>
        <div className="row">

          <div className="col-md-8">
            <h1>{this.props.title}</h1>
            <p className="lead">{this.props.subtitle}</p>

            <p>
              {this.props.showButton && (
                  <a
                      className="btn btn-outline-primary btn-lg"
                      href={this.props.buttonURL}
                      rel="noopener noreferrer"
                  >
                    {this.props.buttonText} &raquo;
                  </a>
              )}
            </p>
          </div>

          <div className="col-md-4">
            <img
                src={this.urlService.mergeBaseWithPathURL(ICONS.THINK_LEFT)}
                className={`${this.blockName}__icon`}
            />
          </div>

        </div>
      </div>

    );
  }
}
