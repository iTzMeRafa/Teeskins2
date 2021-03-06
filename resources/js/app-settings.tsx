import * as React from 'react';
import ReactDOM from 'react-dom';
import Wireframe from './components/Wireframe';
import UserPanelSideBar from './components/UserPanelSideBar';
import UpdateNameForm from './components/UpdateNameForm';
import UpdateEmailForm from './components/UpdateEmailForm';

// Interfaces
/* eslint-disable-next-line no-unused-vars */
import { IDataInterface } from './interfaces/IDataInterface';

require('./bootstrap');

/*
 * This global variable comes from the page associated controller
 * and contains all necessary data for its view and the wireframe
 */
declare var data: IDataInterface;

export default class Settings extends React.Component {
  public render () {
    return (
      <Wireframe totalItemsCount={data.globalData.totalItemsCount}>
        <div className="row">
          <div className="col-md-3">
            <UserPanelSideBar />
          </div>
          <div className="col-md-9">
            <h3 className="mb-4">Update User Informations</h3>
            <div className="row">
              <div className="col-md-12">
                <UpdateNameForm userInfo={data.globalData.userInfo} />
                <UpdateEmailForm userInfo={data.globalData.userInfo} />
              </div>
              {/*
                <div className="col-md-6"> Right </div>
              */}
            </div>
          </div>
        </div>
      </Wireframe>
    );
  }
}

if (document.getElementById('app')) {
  ReactDOM.render(<Settings />, document.getElementById('app'));
}
