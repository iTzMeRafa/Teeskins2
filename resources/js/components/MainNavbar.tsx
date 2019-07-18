import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faSearch, faBars } from '@fortawesome/free-solid-svg-icons'

// Services
import { UrlService } from './../Services/UrlService';

const skinsPath      = "/skins";
const mapresPath     = "/mapres";
const gameskinsPath  = "/gameskins";
const emoticonsPath  = "/emoticons";
const particlesPath  = "/particles";
const cursorsPath    = "/cursors";

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
                            <li className={'nav-item ' + this.isActive(skinsPath)}>
                                <a className="nav-link" href={skinsPath}>Skins <span className="sr-only">(current)</span></a>
                            </li>
                            <li className={'nav-item ' + this.isActive(mapresPath)}>
                                <a className="nav-link"><FontAwesomeIcon icon={faLock} /> Mapres</a>
                            </li>
                            <li className={'nav-item ' + this.isActive(gameskinsPath)}>
                                <a className="nav-link"><FontAwesomeIcon icon={faLock} /> Gameskins</a>
                            </li>
                            <li className={'nav-item ' + this.isActive(emoticonsPath)}>
                                <a className="nav-link"><FontAwesomeIcon icon={faLock} /> Emoticons</a>
                            </li>
                            <li className={'nav-item ' + this.isActive(particlesPath)}>
                                <a className="nav-link"><FontAwesomeIcon icon={faLock} /> Particles</a>
                            </li>
                            <li className={'nav-item ' + this.isActive(cursorsPath)}>
                                <a className="nav-link"><FontAwesomeIcon icon={faLock} /> Cursors</a>
                            </li>
                        </ul>
                        <form method="GET" className="form-inline" onSubmit={() => this.handleSearchSubmit(event)}>
                            <input id="searchinput" required={true} className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                            <FontAwesomeIcon icon={faSearch} />
                        </form>
                    </div>
                </div>
            </nav>
        );
    }

    private isActive(naviPath) {
        if(this.urlService.getUrlPath() === naviPath) {
            return 'active';
        }
        return '';
    }

    private handleSearchSubmit(event) {
        event.preventDefault();
        
        const query = (document.getElementById("searchinput") as HTMLInputElement).value;
        this.urlService.redirectToPageURL('search/' + query);
    }
}