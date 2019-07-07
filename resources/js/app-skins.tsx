require('./bootstrap');

import * as React from 'react';
import ReactDOM from 'react-dom';
import GridCore from "./components/GridCore"
import SortingPanel from "./components/SortingPanel";
import Wireframe from "./components/Wireframe";

/*
 * This global variable comes from the page associated controller
 * and contains all necessary data for its view
 */
declare var data: any;

export default class Skins extends React.Component {
    render(){
        return(
            <Wireframe totalItemsCount={data.globalData.totalItemsCount}>
                <SortingPanel/>
                <GridCore assets={data.skins}/>
            </Wireframe>
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<Skins />, document.getElementById('app'));
}