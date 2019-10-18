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

export default class AdminUserlist extends React.Component {
  public render () {
    return (
      <Wireframe totalItemsCount={data.globalData.totalItemsCount}>
        <div className="row">
          <div className="col-md-3">
            <AdminPanelSideBar assetUploadsCount={data.viewData.assetUploadsCount} />
          </div>
          <div className="col-md-9">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">id</th>
                  <th scope="col">Username</th>
                  <th scope="col">Email</th>
                  <th scope="col">Role</th>
                  <th scope="col">Register Date</th>
                </tr>
              </thead>
              <tbody>
                {this.renderUserRows()}
              </tbody>
            </table>
          </div>
        </div>
      </Wireframe>
    );
  }

  private renderUserRows () {
    const userList = [];

    data.viewData.userList.map(user => {
      userList.push(
        <tr key={user.id}>
          <th scope="row">{user.id}</th>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.role}</td>
          <td>{user.created_at}</td>
        </tr>
      );
    });

    return userList;
  }
}

if (document.getElementById('app')) {
  ReactDOM.render(<AdminUserlist />, document.getElementById('app'));
}
