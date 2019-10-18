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

export default class AdminReports extends React.Component {
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
                  <th scope="col">username</th>
                  <th scope="col">assetID</th>
                  <th scope="col">assetType</th>
                  <th scope="col">type</th>
                  <th scope="col">message</th>
                  <th scope="col">upload date</th>
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
    const reports = [];

    data.viewData.reports.map(report => {
      reports.push(
          <tr key={report.id}>
            <th scope="row">{report.id}</th>
            <td>{report.username}</td>
            <td>{report.assetID}</td>
            <td>{report.assetType}</td>
            <td>{report.type}</td>
            <td>{report.message}</td>
            <td>{report.uploadDate}</td>
          </tr>
      );
    });

    return reports;
  }
}

if (document.getElementById('app')) {
  ReactDOM.render(<AdminReports />, document.getElementById('app'));
}
