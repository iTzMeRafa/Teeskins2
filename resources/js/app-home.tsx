require('./bootstrap');

import * as React from 'react';
import ReactDOM from 'react-dom';
import Wireframe from './components/Wireframe'
import Trending from "./components/Trending";
import Jumbotron from "./components/Jumbotron";
import { IDataInterface } from "./interfaces/IDataInterface";

/*
 * This global variable comes from the page associated controller
 * and contains all necessary data for its view and the wireframe
 */
declare var data: IDataInterface;

export default class Home extends React.Component {
     render() {
        return (
            <Wireframe totalItemsCount={data.globalData.totalItemsCount}>
                <Jumbotron
                    title="Welcome to Teeskins!"
                    subtitle={`Teeskins is a web-based teeworlds assets database.\n Here you can find everything to pimp and customize your game. Have a look around, find what you need or learn how to use and integrate these assets to the game.`}
                    buttonText="Read More"
                    buttonURL="#"
                />
                <Trending
                    mostDownloadedAsset={data.viewData.mostDownloadedAsset}
                    mostLikedAsset={data.viewData.mostLikedAsset}
                    newestAsset={data.viewData.newestAsset}
                />
            </Wireframe>
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<Home />, document.getElementById('app'));
}
