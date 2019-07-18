require('./bootstrap');

import * as React from 'react';
import ReactDOM from 'react-dom';
import Wireframe from './components/Wireframe';
import SearchHeadline from './components/SearchHeadline';
import GridCore from './components/GridCore';
import { IDataInterface } from "./interfaces/IDataInterface";

/*
 * This global variable comes from the page associated controller
 * and contains all necessary data for its view and the wireframe
 */
declare var data: IDataInterface;

export default class Search extends React.Component {
     render() {
        return (
            <Wireframe totalItemsCount={data.globalData.totalItemsCount}>
                <SearchHeadline countResults={data.viewData.skins.length} query={data.viewData.query} />
                <GridCore 
                    userInfo={data.globalData.userInfo} 
                    assets={data.viewData.skins} numPerRow={4}
                    updateDownloads={true}
                    updateLikes={true}
                />
            </Wireframe>
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<Search />, document.getElementById('app'));
}
