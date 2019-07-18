require('./bootstrap');

import * as React from 'react';
import ReactDOM from 'react-dom';
import Wireframe from './components/Wireframe';
import UserPanelSideBar from './components/UserPanelSideBar';
import { IDataInterface } from "./interfaces/IDataInterface";

/*
 * This global variable comes from the page associated controller
 * and contains all necessary data for its view and the wireframe
 */
declare var data: IDataInterface;

export default class Settings extends React.Component {
     render() {
        return (
            <Wireframe totalItemsCount={data.globalData.totalItemsCount}>
                <div className="row">
                    <div className="col-md-3">
                        <UserPanelSideBar />
                    </div>
                    <div className="col-md-9">
                        Content hier
                    </div>
                </div>
            </Wireframe>
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<Settings />, document.getElementById('app'));
}