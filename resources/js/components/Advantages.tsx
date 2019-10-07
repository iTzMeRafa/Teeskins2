import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripHorizontal, faSearch, faTools, faUpload } from '@fortawesome/free-solid-svg-icons';

// Services
import { URLS, UrlService } from '../Services/UrlService';

export default class Advantages extends React.Component {
  private readonly blockName = 'advantages';
  private readonly urlService: UrlService;

  public constructor (props: {}) {
    super(props);
    this.urlService = new UrlService();
  }

  public render () {
    return (
        <div className={this.blockName}>
          <div className="row mb-5">

            <div className="col-md-6">
              <div className={`${this.blockName}__outer`}>
                <div className="mr-3">
                  <FontAwesomeIcon icon={faUpload} size={'2x'}/>
                </div>
                <div>
                  <strong className="mb-1">Upload & Share.</strong> <br />
                  Do you want to share your art to the Teeworlds community?
                  Just use our <a href={this.urlService.mergeBaseWithURL(URLS.Upload)}>upload system</a> and publish them.
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className={`${this.blockName}__outer`}>
                <div className="mr-3">
                  <FontAwesomeIcon icon={faSearch} size={'2x'}/>
                </div>
                <div>
                  <strong className="mb-1">Search & Find.</strong> <br />
                  Simply use the search bar to look for any asset names or authors in our database.
                  Results will be listed for each type.
                </div>
              </div>
            </div>

          </div>
          <div className="row mb-5">

            <div className="col-md-6">
              <div className={`${this.blockName}__outer`}>
                <div className="mr-3">
                  <FontAwesomeIcon icon={faTools} size={'2x'}/>
                </div>
                <div>
                  <strong className="mb-1">Useful Tools.</strong> <br />
                  There are some tools which could be useful,
                  like a live <a href={this.urlService.mergeBaseWithURL(URLS.SkinRenderer)}>skin renderer</a> and
                  <a href={this.urlService.mergeBaseWithURL(URLS.BodyRenderer)}> body renderer</a>.
                  So you can see how the skins will look like in the game.
                  Soon there will be a Teeworlds Map Editor in browser and a Teeworlds Skin Maker to design your custom assets!
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className={`${this.blockName}__outer`}>
                <div className="mr-3">
                  <FontAwesomeIcon icon={faGripHorizontal} size={'2x'}/>
                </div>
                <div>
                  <strong className="mb-1">Grid System.</strong> <br />
                  With our custom grid system Teeworlds skins and assets will fit on any device and will be displayed
                  in an comprehensive asset-card. <br />
                  We use progressive loading, just scroll down to load more Teeworlds skins!
                </div>
              </div>
            </div>

          </div>
        </div>
    );
  }
}
