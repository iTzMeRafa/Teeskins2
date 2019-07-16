require('./bootstrap');

import * as React from 'react';
import ReactDOM from 'react-dom';
import Wireframe from './components/Wireframe'
import AdminPanelSideBar from './components/adminPanelSidebar';
import { IDataInterface } from "./interfaces/IDataInterface";

/*
 * This global variable comes from the page associated controller
 * and contains all necessary data for its view and the wireframe
 */
declare var data: IDataInterface;

export default class AdminHome extends React.Component {
     render() {
        return (
            <Wireframe totalItemsCount={data.globalData.totalItemsCount}>
                <div className="col-md-3">
                    <AdminPanelSideBar />
                </div>
                <div className="col-md-9">
                    Content hier
                </div>
            </Wireframe>
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<AdminHome />, document.getElementById('app'));
}
