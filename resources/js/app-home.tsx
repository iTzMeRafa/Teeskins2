import * as React from 'react';
import ReactDOM from 'react-dom';
import Carousel from './components/Carousel'
import Header from './components/Header'
import MainNavbar from "./components/MainNavbar"
import ItemCounterBadge from "./components/ItemCounterBadge"
import Footer from "./components/Footer";
import Trending from "./components/Trending";

/*
 * This global variable comes from the page associated controller
 * and contains all necessary data for its view
 */
declare var data: any;

export default class Home extends React.Component {
     render() {
        return (
            <div className="container">
                <ItemCounterBadge style={"warning"} toRight={true} itemsCount={data.globalData.totalItemsCount}/>

                <Header/>
                <MainNavbar/>
                <section className="content">
                    <Carousel/>
                    <Trending/>
                </section>
                <Footer/>
            </div>
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<Home />, document.getElementById('app'));
}
