import * as React from 'react';
import ReactDOM from 'react-dom';
import Wireframe from './components/Wireframe';
import ErrorCode from './components/ErrorCode';

// Interfaces
/* eslint-disable-next-line no-unused-vars */
import { IDataInterface } from './interfaces/IDataInterface';

require('./bootstrap');

/*
 * This global variable comes from the page associated controller
 * and contains all necessary data for its view and the wireframe
 */
declare var data: IDataInterface;

export default class Error404 extends React.Component {
  public render () {
    return (
      <Wireframe totalItemsCount={data.globalData.totalItemsCount}>
        <ErrorCode
          errorCode={404}
          text="Page not found."
        />
      </Wireframe>
    );
  }
}

if (document.getElementById('app')) {
  ReactDOM.render(<Error404 />, document.getElementById('app'));
}
