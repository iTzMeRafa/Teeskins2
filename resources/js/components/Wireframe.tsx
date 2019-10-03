import * as React from 'react';
import Header from './Header';
import MainNavbar from './MainNavbar';
import ItemCounterBadge from './ItemCounterBadge';
import PartnerCarousel from './PartnerCarousel';
import Footer from './Footer';
import Preloader from './Preloader';

interface IWireframeProps {
    totalItemsCount: number;
    showPartnersCarousel?: boolean;
}

export default class Skins extends React.Component<IWireframeProps> {
  public render () {
    return (
            <Preloader>
                <div className="container">
                  <ItemCounterBadge style="warning" toRight={true} itemsCount={this.props.totalItemsCount} />

                  <Header/>

                  <MainNavbar/>
                  <section className="content">
                    {this.props.children}
                  </section>
                  {this.props.showPartnersCarousel && (
                    <PartnerCarousel />
                  )}
                  <Footer/>
                </div>
            </Preloader>
    );
  }
}
