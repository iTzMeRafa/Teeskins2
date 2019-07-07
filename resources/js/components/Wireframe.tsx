import * as React from 'react';
import Header from './Header'
import MainNavbar from "./MainNavbar"
import ItemCounterBadge from "./ItemCounterBadge"
import Footer from "./Footer";

export default class Skins extends React.Component {
    render(){
        return(
            <>
                <div className="container">
                    <ItemCounterBadge style="warning" toRight={true} itemsCount={100} />

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