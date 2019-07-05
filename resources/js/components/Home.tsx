import * as React from 'react';
import ReactDOM from 'react-dom';
import Carousel from './Carousel'
import Header from './Header'
import MainNavbar from "./MainNavbar"
import ItemCounterBadge from "./ItemCounterBadge"
import Footer from "./Footer";
import Trending from "./Trending";

export default class Home extends React.Component {
    public render() {
        return (
            <div className="container">
                <ItemCounterBadge style={"warning"} toRight={true} itemsCount={100}/>

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
