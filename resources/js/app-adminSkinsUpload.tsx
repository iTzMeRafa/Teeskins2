require('./bootstrap');

import * as React from 'react';
import ReactDOM from 'react-dom';
import Wireframe from './components/Wireframe'
import GridCore from "./components/GridCore"
import AdminPanelSideBar from './components/AdminPanelSideBar';
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
               <div className="row">
                    <div className="col-md-3">
                        <AdminPanelSideBar />
                    </div>
                    <div className="col-md-9">
                        <GridCore 
                            userInfo={data.globalData.userInfo} 
                            assets={data.viewData.skins} 
                            numPerRow={3} 
                            updateDownloads={false} 
                            updateLikes={false}
                            sortType={data.viewData.sortType}
                            page={'search'}
                        />
                    </div>
                </div>
            </Wireframe>
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<AdminSkinsUpload />, document.getElementById('app'));
}
