import * as React from 'react';
import Header from './Header'
import MainNavbar from "./MainNavbar"
import ItemCounterBadge from "./ItemCounterBadge"
import Footer from "./Footer";

interface IWireframeProps {
    totalItemsCount: number;
}
export default class Skins extends React.Component<IWireframeProps> {
    render(){
        return(
            <>
                <div className="container">
                    <ItemCounterBadge style="warning" toRight={true} itemsCount={this.props.totalItemsCount} />

                    <Header/>

                    <MainNavbar/>
                    <section className="content">
                        {this.props.children}
                    </section>
                    <Footer/>
                </div>
            </>
        );
    }
}