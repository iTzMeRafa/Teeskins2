import React from "react"
import ReactDOM from "react-dom"
import Header from './jsx/Header'
import MainNavbar from "./jsx/MainNavbar"
import GridCore from "./jsx/GridCore"
import ItemCounterBadge from "./jsx/ItemCounterBadge"
import Sidebar from "./jsx/Sidebar";
import Footer from "./jsx/Footer";
import 'bootstrap'
import Muuri from "muuri";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArchive } from '@fortawesome/free-solid-svg-icons'


class Home extends React.Component {
    render(){
        return(
            <>
                <div className="container">
                    <ItemCounterBadge style={"warning"} toRight={true}>
                        <FontAwesomeIcon icon={faArchive}/> 18.000+ Items in database
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

ReactDOM.render(<Home/>, document.getElementById('root'));

var dragSortOptions = {
    action: 'swap',
    threshold: 50
};
var grid = new Muuri('.grid', {
    dragEnabled: false,
    sortData: {
        id: function (item, element) {
            return parseFloat(element.getAttribute("downloads"));
        }
    }
});

var sortDownloadsAsc = document.querySelector('.sort-downloads-asc');
var sortDownloadsDesc = document.querySelector('.sort-downloads-desc');

// Sort the items before the initial layout
// and do the initial layout
grid.sort('id', {layout: 'instant'})

// Bind the button event listeners
if(sortDownloadsAsc) {
    sortDownloadsAsc.addEventListener('click', function () {
        grid.sort('id');
    });
}
if(sortDownloadsDesc) {
    sortDownloadsDesc.addEventListener('click', function () {
        grid.sort('id:desc');
    });
}