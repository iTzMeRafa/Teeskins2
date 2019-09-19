import * as React from 'react';
import ReactDOM from 'react-dom';
import Wireframe from './components/Wireframe';
import AdminPanelSideBar from './components/AdminPanelSideBar';

// Interfaces
/* eslint-disable-next-line no-unused-vars */
import { IDataInterface } from './interfaces/IDataInterface';

require('./bootstrap');

/*
 * This global variable comes from the page associated controller
 * and contains all necessary data for its view and the wireframe
 */
declare var data: IDataInterface;

export default class AdminHome extends React.Component {
  public render () {
    return (
      <Wireframe totalItemsCount={data.globalData.totalItemsCount}>
        <div className="row">
          <div className="col-md-3">
            <AdminPanelSideBar />
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
  ReactDOM.render(<AdminHome />, document.getElementById('app'));
}
