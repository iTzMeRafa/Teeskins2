require('./bootstrap');

import * as React from 'react';
import ReactDOM from 'react-dom';
import GridCore from "./components/GridCore";
import Wireframe from "./components/Wireframe";
import { IDataInterface } from "./interfaces/IDataInterface";

// Services
import {URLS, UrlService} from "./Services/UrlService";

/*
 * This global variable comes from the page associated controller
 * and contains all necessary data for its view and the wireframe
 */
declare var data: IDataInterface;

export default class Skins extends React.Component {

    private readonly urlService: UrlService;

    public constructor(props: {}) {
        super(props);
        this.urlService = new UrlService();
    }

    render(){
        return(
            <Wireframe totalItemsCount={data.globalData.totalItemsCount}>
                <h3></h3>
                <GridCore 
                    userInfo={data.globalData.userInfo} 
                    assets={data.viewData.skins}
                    sortType={data.viewData.sortType}
                    numPerRow={4}
                    updateDownloads={true}
                    updateLikes={true}
                    page={data.viewData.page}
                    idURL={this.urlService.mergeBaseWithURL(URLS.Skins)}
                    downloadsURL={this.urlService.mergeBaseWithURL(URLS.SkinsDownloads)}
                    likesURL={this.urlService.mergeBaseWithURL(URLS.SkinsLikes)}
                    fetchURL={this.urlService.mergeBaseWithURL(URLS.FetchSkins)}
                />
            </Wireframe>
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<Skins />, document.getElementById('app'));
}