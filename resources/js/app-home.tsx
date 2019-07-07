require('./bootstrap');

import * as React from 'react';
import ReactDOM from 'react-dom';
import Carousel from './components/Carousel'
import Wireframe from './components/Wireframe'
import Trending from "./components/Trending";

/*
 * This global variable comes from the page associated controller
 * and contains all necessary data for its view
 */
declare var data: any;

export default class Home extends React.Component {
     render() {
        return (
            <Wireframe totalItemsCount={data.globalData.totalItemsCount}>
                <Carousel/>
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
