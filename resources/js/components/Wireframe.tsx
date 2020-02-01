import * as React from 'react';
import Header from './Header';
import MainNavbar from './MainNavbar';
import ItemCounterBadge from './ItemCounterBadge';
import PartnerCarousel from './PartnerCarousel';
import Footer from './Footer';
import Toast from './Toast';

import { Provider } from 'mobx-react';

// Stores
import stores from '../Stores/stores';

interface IWireframeProps {
    totalItemsCount: number;
    showPartnersCarousel?: boolean;
}

export default class Wireframe extends React.Component<IWireframeProps> {
  private readonly blockName = 'wireframe';

  public constructor (props: IWireframeProps) {
    super(props);
  }

  public render () {
    return (
      <Provider stores={stores}>
          <div className={`${this.blockName}`}>

              <Toast />

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

          </div>
      </Provider>
    );
  }
}
