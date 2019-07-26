import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faBars } from '@fortawesome/free-solid-svg-icons'

// Services
import { URLS, UrlService } from './../Services/UrlService';

export default class MainNavbar extends React.Component {

    private readonly urlService;

    public constructor(props: {}) {
        super(props);
        this.urlService = new UrlService();
    }

    public render() {
        return(

            <nav className="navbar navbar-expand-lg bg-realWhite">
                <div className="container">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01"
                            aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                        <FontAwesomeIcon icon={faBars} size={"2x"}/>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarColor01">
                        <ul className="navbar-nav mr-auto">
                            <li className={'nav-item ' + this.urlService.navIsActive(URLS.Skins)}>
                                <a className="nav-link" href={this.urlService.mergeBaseWithPathURL(URLS.Skins)}>Skins 0.6<span className="sr-only">(current)</span></a>
                            </li>

                            <li className={'nav-item'}>
                                <a className="nav-link"><FontAwesomeIcon icon={faLock} /> Skins 0.7</a>
                            </li>
                            {/*
                                <li className={'nav-item ' + this.urlService.navIsActive(URLS.Mapres)}>
                                    <a className="nav-link"><FontAwesomeIcon icon={faLock} /> Mapres</a>
                                </li>
                                <li className={'nav-item ' + this.urlService.navIsActive(URLS.Gameskins)}>
                                    <a className="nav-link"><FontAwesomeIcon icon={faLock} /> Gameskins</a>
                                </li>
                                <li className={'nav-item ' + this.urlService.navIsActive(URLS.Emoticons)}>
                                    <a className="nav-link"><FontAwesomeIcon icon={faLock} /> Emoticons</a>
                                </li>
                                <li className={'nav-item ' + this.urlService.navIsActive(URLS.Particles)}>
                                    <a className="nav-link"><FontAwesomeIcon icon={faLock} /> Particles</a>
                                </li>
                                <li className={'nav-item ' + this.urlService.navIsActive(URLS.Cursors)}>
                                    <a className="nav-link"><FontAwesomeIcon icon={faLock} /> Cursors</a>
                                </li>
                            */}
                        </ul>
                        <form method="GET" className="form-inline" onSubmit={() => this.handleSearchSubmit(event)}>
                            <input 
                                id="searchinput" 
                                required={true} 
                                className="form-control mr-sm-2 searchInput" 
                                type="search" 
                                placeholder="Search Name or Author..."
                                aria-label="Search" 
                            />
                            
                        </form>
                    </div>
                </div>
            </nav>
        );
    }

    private handleSearchSubmit(event) {
        event.preventDefault();
        
        const query = (document.getElementById("searchinput") as HTMLInputElement).value;
        this.urlService.redirectToPageURL('/search/' + query);
    }
}