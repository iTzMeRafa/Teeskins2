import * as React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header'
import MainNavbar from "./components/MainNavbar"
import GridCore from "./components/GridCore"
import ItemCounterBadge from "./components/ItemCounterBadge"
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import FontAwesome from "react-fontawesome";

/*
 * This global variable comes from the page associated controller
 * and contains all necessary data for its view
 */
declare var data: any;

export default class Skins extends React.Component {
    render(){
        return(
            <>
                <div className="container">
                    <ItemCounterBadge style="warning" toRight={true} itemsCount={100}>
                        <FontAwesome name='rocket' /> 18.000+ Items in database
                    </ItemCounterBadge>

                    <Header/>
                </div>
                <div className="container mb-3">

                    <MainNavbar/>
                    <section className="content">
                        <div className="row">
                            <div className="col-xl-2">
                                <Sidebar/>
                            </div>

                            <div className="col-xl-10">
                                <GridCore/>
                            </div>
                        </div>
                    </section>
                    <Footer/>
                </div>
            </>
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<Skins />, document.getElementById('app'));
}