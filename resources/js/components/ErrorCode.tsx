import * as React from 'react';
import Skin from "./Skin";
import { MostLikedAsset } from "../interfaces/ITrendingInterface";
import { IUserInfoInterface } from './../interfaces/IUserInfoInterface';

// Services
import { UrlService } from './../Services/UrlService';
import { ImageService } from './../Services/ImageService';

interface IErrorCodeProps {
    errorCode: number,
    text: string,
}

export default class ErrorCode extends React.Component<IErrorCodeProps> {

    private readonly blockName = "errors";
    private readonly urlService;
    private readonly imageService;

    public constructor(props: IErrorCodeProps) {
        super(props);

        this.urlService = new UrlService();
        this.imageService = new ImageService();
    }

    render(){
        return(
            <div className={this.blockName}>
                <img src={this.urlService.mergeBaseWithPathURL(this.imageService.getErrorStatusImage(this.props.errorCode))} />
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