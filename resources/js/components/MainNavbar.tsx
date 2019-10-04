import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

// Services
import { URLS, UrlService } from '../Services/UrlService';

export default class MainNavbar extends React.Component {
    private readonly urlService: UrlService;

    public constructor (props: {}) {
      super(props);
      this.urlService = new UrlService();
    }

    public render () {
      return (

          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#"></a>
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
              <FontAwesomeIcon icon={faBars} size={'2x'}/>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">

                {/* Skins 0.6 */}
                <li className={'nav-item ' + this.urlService.navIsActive(URLS.Skins)}>
                  <a className="nav-link" href={this.urlService.mergeBaseWithPathURL(URLS.Skins)}>
                    Skins <span className="badge badge-secondary">0.6</span> <span className="sr-only">(current)</span>
                  </a>
                </li>

                {/* Skins 0.7 */}
                <li
                    className={
                      "nav-item dropdown " +
                      this.urlService.navIsActive(URLS.Body) +
                      this.urlService.navIsActive(URLS.Decoration) +
                      this.urlService.navIsActive(URLS.Eyes) +
                      this.urlService.navIsActive(URLS.Feet) +
                      this.urlService.navIsActive(URLS.Hands) +
                      this.urlService.navIsActive(URLS.Marking)
                    }
                >
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                     data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Skins <span className="badge badge-secondary">0.7</span>
                  </a>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a className={"dropdown-item " + this.urlService.navIsActive(URLS.Body)} href={this.urlService.mergeBaseWithPathURL(URLS.Body)}>Body</a>
                    <a className={"dropdown-item " + this.urlService.navIsActive(URLS.Decoration)} href={this.urlService.mergeBaseWithPathURL(URLS.Decoration)}>Decoration</a>
                    <a className={"dropdown-item " + this.urlService.navIsActive(URLS.Eyes)} href={this.urlService.mergeBaseWithPathURL(URLS.Eyes)}>Eyes</a>
                    <a className={"dropdown-item " + this.urlService.navIsActive(URLS.Feet)} href={this.urlService.mergeBaseWithPathURL(URLS.Feet)}>Feet</a>
                    <a className={"dropdown-item " + this.urlService.navIsActive(URLS.Hands)} href={this.urlService.mergeBaseWithPathURL(URLS.Hands)}>Hands</a>
                    <a className={"dropdown-item " + this.urlService.navIsActive(URLS.Marking)} href={this.urlService.mergeBaseWithPathURL(URLS.Marking)}>Marking</a>
                  </div>
                </li>

                {/* Assets */}
                <li
                    className={
                      "nav-item dropdown " +
                      this.urlService.navIsActive(URLS.Mapres) +
                      this.urlService.navIsActive(URLS.Gameskins) +
                      this.urlService.navIsActive(URLS.Emoticons) +
                      this.urlService.navIsActive(URLS.Cursors) +
                      this.urlService.navIsActive(URLS.Particles) +
                      this.urlService.navIsActive(URLS.Grids)
                    }
                >
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                     data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Assets
                  </a>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a className={"dropdown-item " + this.urlService.navIsActive(URLS.Mapres)} href={this.urlService.mergeBaseWithPathURL(URLS.Mapres)}>Mapres</a>
                    <a className={"dropdown-item " + this.urlService.navIsActive(URLS.Gameskins)} href={this.urlService.mergeBaseWithPathURL(URLS.Gameskins)}>Gameskins</a>
                    <a className={"dropdown-item " + this.urlService.navIsActive(URLS.Emoticons)} href={this.urlService.mergeBaseWithPathURL(URLS.Emoticons)}>Emoticons</a>
                    <a className={"dropdown-item " + this.urlService.navIsActive(URLS.Cursors)} href={this.urlService.mergeBaseWithPathURL(URLS.Cursors)}>Cursors</a>
                    <a className={"dropdown-item " + this.urlService.navIsActive(URLS.Particles)} href={this.urlService.mergeBaseWithPathURL(URLS.Particles)}>Particles</a>
                    <a className={"dropdown-item " + this.urlService.navIsActive(URLS.Grids)} href={this.urlService.mergeBaseWithPathURL(URLS.Grids)}>Grids</a>
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
          </nav>
      );
    }

    private handleSearchSubmit (event) {
      event.preventDefault();

      const query = (document.getElementById('searchinput') as HTMLInputElement).value;
      this.urlService.redirectToPagePath('/search/' + query);
    }
}
