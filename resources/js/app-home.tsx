require('./bootstrap');

import * as React from 'react';
import ReactDOM from 'react-dom';
import Carousel from './components/Carousel'
import Wireframe from './components/Wireframe'
import Trending from "./components/Trending";
import Jumbotron from "./components/Jumbotron";

/*
 * This global variable comes from the page associated controller
 * and contains all necessary data for its view
 */
declare var data: any;

export default class Home extends React.Component {
     render() {
        return (
            <Wireframe totalItemsCount={data.globalData.totalItemsCount}>
                <Jumbotron
                    title="Welcome to Teeskins!"
                    subtitle={`Teeskins is a web-based teeworlds assets database.\n Here you can find everything to pimp and customize your game. Have a look around, find what you need or learn how to use these assets and integrate them to the game.`}
                    buttonText="Read More"
                    buttonURL="#"
                />
                <Trending
                    mostDownloadedAsset={data.mostDownloadedAsset}
                    mostLikedAsset={data.mostLikedAsset}
                    newestAsset={data.newestAsset}
                />
            </Wireframe>
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<Home />, document.getElementById('app'));
}
