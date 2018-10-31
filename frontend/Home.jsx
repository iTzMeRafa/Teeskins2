import React from "react"
import ReactDOM from "react-dom"
import Jumbotron from './jsx/Jumbotron'
import Carousel from './jsx/Carousel'
import Header from './jsx/Header'
import MainNavbar from "./jsx/MainNavbar"
import ItemCounterBadge from "./jsx/ItemCounterBadge"
import Footer from "./jsx/Footer";
import 'bootstrap'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArchive } from '@fortawesome/free-solid-svg-icons'
import Trending from "./jsx/Trending";

class Home extends React.Component {
    render(){
        return(
            <>
                <div className="container">

                    <ItemCounterBadge style={"warning"} toRight={true}>
                        <FontAwesomeIcon icon={faArchive}/> 18.000+ Items in database
                    </ItemCounterBadge>

                    <Header/>
                    <MainNavbar/>
                    <section className="content">
                        {/*<Jumbotron
                            title="Welcome to Teeskins ☺"
                            buttonURL="https://github.com/iTzMeRafa/Teeskins"
                            buttonText="Fork me on Github"
                        >
                            Teeskins is a graphics-based comprehensive database for Teeworlds assets. <br />
                            You can easily search and find items with our searchbar or our sort and filter options for each category. <br />
                            Download for free.
                        </Jumbotron>*/}
                        <Carousel/>
                        <Trending/>
                     </section>
                    <Footer/>
                </div>

            </>
        );
    }
}

ReactDOM.render(<Home/>, document.getElementById('root'));