import React from "react"
import ReactDOM from "react-dom"
import Header from './jsx/Header'
import MainNavbar from "./jsx/MainNavbar"
import GridCore from "./jsx/GridCore"
import ItemCounterBadge from "./jsx/ItemCounterBadge"
import 'bootstrap'
import Muuri from "muuri";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArchive } from '@fortawesome/free-solid-svg-icons'

class Home extends React.Component {
    render(){
        return(
            <>
                <div className="container mb-3">

                    <ItemCounterBadge style={"warning"} toRight={true}>
                        <FontAwesomeIcon icon={faArchive}/> 18.000+ Items in database
                    </ItemCounterBadge>

                    <Header/>
                    <MainNavbar/>
                    <section className="content">

                        <GridCore/>
                    </section>


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
    dragEnabled: true,
    sortData: {
        id: function (item, element) {
            return parseFloat(element.getAttribute("downloads"));
        }
    },
    dragStartPredicate: function (item, event) {
        // Prevent first item from being dragged.
        if (grid.getItems().indexOf(item) === 0) {
            return false;
        }
        // For other items use the default drag start predicate.
        return Muuri.ItemDrag.defaultStartPredicate(item, event);
    },
    dragSortPredicate: function (item) {
        var result = Muuri.ItemDrag.defaultSortPredicate(item, dragSortOptions);
        return result && result.index === 0 ? false : result;
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