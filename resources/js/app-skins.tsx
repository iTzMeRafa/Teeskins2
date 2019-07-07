import * as React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header'
import MainNavbar from "./components/MainNavbar"
import GridCore from "./components/GridCore"
import ItemCounterBadge from "./components/ItemCounterBadge"
import SortingPanel from "./components/SortingPanel";
import Footer from "./components/Footer";
import Wireframe from "./components/Wireframe";

/*
 * This global variable comes from the page associated controller
 * and contains all necessary data for its view
 */
declare var data: any;

export default class Skins extends React.Component {
    render(){
        return(
            <Wireframe>
                <SortingPanel/>
                <GridCore/>
            </Wireframe>
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<Skins />, document.getElementById('app'));
}