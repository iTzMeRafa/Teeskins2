import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faSearch, faBars } from '@fortawesome/free-solid-svg-icons'

const skinsPath      = "/skins";
const mapresPath     = "/mapres";
const gameskinsPath  = "/gameskins";
const emoticonsPath  = "/emoticons";
const particlesPath  = "/particles";
const cursorsPath    = "/cursors";

export default class MainNavbar extends React.Component {

    render(){
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
                        <form className="form-inline">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-info" type="submit"><FontAwesomeIcon icon={faSearch} /></button>
                        </form>
                    </div>
                </div>
            </nav>
        );
    }

    private getUrlPath() {
        const url = window.location.href;
        const startChar = url.indexOf('/', 8);
        return url.substr(startChar, url.length);
    }

    private isActive(naviPath) {
        if(this.getUrlPath() === naviPath) {
            return 'active';
        }
        return '';
    }
}