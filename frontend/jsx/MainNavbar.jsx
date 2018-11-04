import React from "react";

export default class MainNavbar extends React.Component {

     skinsPath      = "/skins";
     mapresPath     = "/mapres";
     gameskinsPath  = "/gameskins";
     emoticonsPath  = "/emoticons";
     particlesPath  = "/particles";
     cursorsPath    = "/cursors";

    render(){
        return(
            <nav className="navbar navbar-expand-lg bg-realWhite">
                <div className="container">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01"
                            aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarColor01">
                        <ul className="navbar-nav mr-auto">
                            <li className={'nav-item ' + this.isActive(this.skinsPath)}>
                                <a className="nav-link" href={this.skinsPath}>Skins <span className="sr-only">(current)</span></a>
                            </li>
                            <li className={'nav-item ' + this.isActive(this.mapresPath)}>
                                <a className="nav-link" href={this.mapresPath}>Mapres</a>
                            </li>
                            <li className={'nav-item ' + this.isActive(this.gameskinsPath)}>
                                <a className="nav-link" href={this.gameskinsPath}>Gameskins</a>
                            </li>
                            <li className={'nav-item ' + this.isActive(this.emoticonsPath)}>
                                <a className="nav-link" href={this.emoticonsPath}>Emoticons</a>
                            </li>
                            <li className={'nav-item ' + this.isActive(this.particlesPath)}>
                                <a className="nav-link" href={this.particlesPath}>Particles</a>
                            </li>
                            <li className={'nav-item ' + this.isActive(this.cursorsPath)}>
                                <a className="nav-link" href={this.cursorsPath}>Cursors</a>
                            </li>
                        </ul>
                        <form className="form-inline">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search"
                                   aria-label="Search" />
                                <button className="btn btn-outline-info my-2 my-sm-0" type="submit">Search </button>
                        </form>
                    </div>
                </div>
            </nav>
        );
    }

    getUrlPath() {
        const url = window.location.href;
        const startChar = url.indexOf('/', 8);
        const path = url.substr(startChar, url.length);
        return path;
    }

    isActive(naviPath) {
        if(this.getUrlPath() === naviPath) {
            return 'active';
        }
        return '';
    }
}