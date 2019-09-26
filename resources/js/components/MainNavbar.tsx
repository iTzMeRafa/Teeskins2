import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

// Services
import { URLS, UrlService } from '../Services/UrlService';

export default class MainNavbar extends React.Component {
    private readonly urlService;

    public constructor (props: {}) {
      super(props);
      this.urlService = new UrlService();
    }

    public render () {
      return (

        <nav className="navbar navbar-expand-lg bg-realWhite">
          <div className="container">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01"
              aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
              <FontAwesomeIcon icon={faBars} size={'2x'}/>
            </button>

            <div className="collapse navbar-collapse">
              <ul className="navbar-nav mr-auto">

                <li className={'nav-item ' + this.urlService.navIsActive(URLS.Skins)}>
                  <a className="nav-link" href={this.urlService.mergeBaseWithPathURL(URLS.Skins)}>
                    Skins <span className="badge badge-secondary">0.6</span> <span className="sr-only">(current)</span>
                  </a>
                </li>

                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                     data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Skins <span className="badge badge-secondary">0.7</span>
                  </a>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a className="dropdown-item" href={this.urlService.mergeBaseWithPathURL(URLS.Body)}>Body</a>
                    <a className="dropdown-item" href={this.urlService.mergeBaseWithPathURL(URLS.Decoration)}>Decoration</a>
                    <a className="dropdown-item" href={this.urlService.mergeBaseWithPathURL(URLS.Eyes)}>Eyes</a>
                    <a className="dropdown-item" href={this.urlService.mergeBaseWithPathURL(URLS.Feet)}>Feet</a>
                    <a className="dropdown-item" href={this.urlService.mergeBaseWithPathURL(URLS.Hands)}>Hands</a>
                    <a className="dropdown-item" href={this.urlService.mergeBaseWithPathURL(URLS.Marking)}>Marking</a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href={this.urlService.mergeBaseWithPathURL(URLS.SkinGenerator)}>Skin Generator</a>
                  </div>
                </li>

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

    private handleSearchSubmit (event) {
      event.preventDefault();

      const query = (document.getElementById('searchinput') as HTMLInputElement).value;
      this.urlService.redirectToPageURL('/search/' + query);
    }
}
