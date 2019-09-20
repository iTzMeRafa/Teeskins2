import * as React from 'react';
import ReactDOM from 'react-dom';
import Wireframe from './components/Wireframe';

// Interfaces
/* eslint-disable-next-line no-unused-vars */
import { IDataInterface } from './interfaces/IDataInterface';

require('./bootstrap');

/*
 * This global variable comes from the page associated controller
 * and contains all necessary data for its view and the wireframe
 */
declare var data: IDataInterface;

export default class API extends React.Component {
  public render () {
    return (
        <Wireframe totalItemsCount={data.globalData.totalItemsCount}>
         <h1>API SEITE</h1>
        </Wireframe>
    );
  }
}

if (document.getElementById('app')) {
  ReactDOM.render(<API />, document.getElementById('app'));
}
