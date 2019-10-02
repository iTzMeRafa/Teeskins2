import * as React from 'react';
import ReactDOM from 'react-dom';
import Wireframe from './components/Wireframe';
import Trending from './components/Trending';
import Jumbotron from './components/Jumbotron';
import PartnerCarousel from './components/PartnerCarousel';

// Interfaces
/* eslint-disable-next-line no-unused-vars */
import { IDataInterface } from './interfaces/IDataInterface';

require('./bootstrap');

/*
 * This global variable comes from the page associated controller
 * and contains all necessary data for its view and the wireframe
 */
declare var data: IDataInterface;

export default class Home extends React.Component {
  public render () {
    return (
      <Wireframe totalItemsCount={data.globalData.totalItemsCount}>
        <Jumbotron
          title="Teeworlds Skins"
          subtitle={'' +
          'Teeskins is a web-based teeworlds skins database. We have a huge collection of 0.6 and 0.7 teeworlds skins. ' +
          'Here you can share and download teeworlds skins for free.' +
          ''}
          showButton={false}

        />
        <Trending
          mostDownloadedAsset={data.viewData.mostDownloadedAsset}
          mostLikedAsset={data.viewData.mostLikedAsset}
          newestAsset={data.viewData.newestAsset}
          userInfo={data.globalData.userInfo}
        />
        <PartnerCarousel />
      </Wireframe>
    );
  }
}

if (document.getElementById('app')) {
  ReactDOM.render(<Home />, document.getElementById('app'));
}
