import * as React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header';
import Preloader from './components/Preloader';

// Interfaces
/* eslint-disable-next-line no-unused-vars */
import { IDataInterface } from './interfaces/IDataInterface';

require('./bootstrap');

/*
 * This global variable comes from the page associated controller
 * and contains all necessary data for its view and the wireframe
 */
declare var data: IDataInterface;

export default class PasswordVerify extends React.Component {
  public render () {
    return (
        <Preloader>
          <div className="container">
            <Header />
          </div>
        </Preloader>
    );
  }
}

if (document.getElementById('app')) {
  ReactDOM.render(<PasswordVerify />, document.getElementById('app'));
}
