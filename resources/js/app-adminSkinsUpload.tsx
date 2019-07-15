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

export default class AdminSkinsUpload extends React.Component {
     render() {
        return (
            <Wireframe totalItemsCount={data.globalData.totalItemsCount}>
               Admin Skins Upload
            </Wireframe>
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<AdminSkinsUpload />, document.getElementById('app'));
}
