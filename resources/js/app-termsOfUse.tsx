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

export default class TermsOfUse extends React.Component {
  public render () {
    return (
      <Wireframe totalItemsCount={data.globalData.totalItemsCount}>
        {this.renderTermsOfUseText()}
      </Wireframe>
    );
  }

  private renderTermsOfUseText () {
    return (
      <div>
        <h1>Impressum</h1>
        <p>Angaben gemäß § 5 Telemediengesetz</p>
        <p>Teeskins.de - Teeworlds Assets Database</p>
        <h2>Allgemeine Informationen</h2>
        <dl>
          <dt>E-Mail-Adresse</dt>
          <dd>craetical@gmail.com</dd>
        </dl>
        <br />

        <p>Special thanks to <strong>Whis</strong> for designing Teeskins' logo</p>
      </div>
    );
  }
}

if (document.getElementById('app')) {
  ReactDOM.render(<TermsOfUse />, document.getElementById('app'));
}
