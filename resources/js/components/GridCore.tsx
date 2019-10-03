import * as React from 'react';
import AssetCard from './AssetCard';
import LoadingSpinner from './LoadingSpinner';
import axios from 'axios';

// Interfaces
/* eslint-disable-next-line no-unused-vars */
import { IUserInfoInterface } from '../interfaces/IUserInfoInterface';

// Services
import { UrlService } from '../Services/UrlService';

interface IGridCoreProps {
    assets: any;
    userInfo: IUserInfoInterface;
    numPerRow: 1 | 2 | 3 | 4;
    updateDownloads: boolean;
    updateLikes: boolean;
    sortType: 'id' | 'downloads' | 'likes';
    page: string;
    fetchURL: string;
    idURL: string;
    downloadsURL: string;
    likesURL: string;
    showLoadButton: boolean;
    queryString?: string;
}

interface IGridCoreState {
    hideForAssetIDs: number[];
    excludeIDs: any;
    assets: any;
    showLoadButton: boolean;
    showLoadingSpinner: boolean;
    isMoreLoadable: boolean;
}

export default class GridCore extends React.Component<IGridCoreProps, IGridCoreState> {
    private readonly urlService: UrlService;

    public render () {
      return (
        <>
            {this.renderSortingPanel()}

            <div className="row mb-5">
              {this.renderAssets()}
            </div>
            <div className="row mb-3">
              <div className="col-md-6 offset-md-3 text-center">
                {this.state.showLoadButton && (
                  <button
                    type="button"
                    className="btn-lg btn btn-outline-primary"
                    onClick={() => this.loadMoreAssets()}
                  >
                    Load More
                  </button>
                )}

              </div>
            </div>
          {<LoadingSpinner isVisible={this.state.showLoadingSpinner} />}
        </>
      );
    }

    public constructor (props: IGridCoreProps) {
      super(props);
      this.state = {
        hideForAssetIDs: [0],
        assets: this.props.assets,
        excludeIDs: this.props.assets.map(function (asset) { return asset.id; }),
        showLoadButton: this.props.showLoadButton,
        showLoadingSpinner: false,
        isMoreLoadable: true,
      };
      this.urlService = new UrlService();
    }

    public componentDidMount(): void {
      if (!this.props.showLoadButton) {
        document.addEventListener('scroll', this.trackScrolling);
      }
    }

    public componentDidUpdate(): void {
      if (!this.props.showLoadButton) {
        document.addEventListener('scroll', this.trackScrolling);
      }
    }

    public componentWillUnmount(): void {
      if (!this.props.showLoadButton) {
        document.addEventListener('scroll', this.trackScrolling);
      }
    }

    private trackScrolling = () => {
      const wrappedElement = document.getElementById('footer');
      if (this.isBottomScrolled(wrappedElement)) {
        this.state.isMoreLoadable ? this.loadMoreAssets() : null;
        document.removeEventListener('scroll', this.trackScrolling);
      }
    };

    private isBottomScrolled(el) {
      return el.getBoundingClientRect().bottom <= window.innerHeight;
    }

    private setAssetVisibility (assetID) {
      this.setState({
        hideForAssetIDs: [...this.state.hideForAssetIDs, assetID]
      });
    }

    private renderSortingPanel () {
      return (
        <div className="row mb-5">
          <div className="col-md-4">
            <h4>Sort By</h4>
            <select
              value={this.props.sortType}
              required={true}
              name="assetType"
              className="form-control"
              id="sortingPanel"
              onChange={() => this.handleSortingChange()}
            >
              <option value="id">Newest</option>
              <option value="downloads">Downloads</option>
              <option value="likes">Likes</option>
            </select>
          </div>
        </div>
      );
    }

    private renderAssets () {

      // Sort Assets by sortType before rendering them
      this.sortAssets();

      return this.state.assets.map(asset => {
        return (
          <div
            className={`${this.getClassName()} mb-4`}
            key={asset.assetType + '_' + asset.id}
            style={this.state.hideForAssetIDs.includes(asset.id) ? { display: 'none' } : { display: 'block' }}
          >
            <AssetCard
              id={asset.id}
              name={asset.name}
              author={asset.author}
              imagePath={asset.imagePath}
              username={asset.username}
              uploadDate={asset.uploadDate}
              userInfo={this.props.userInfo}
              downloads={asset.downloads}
              likes={asset.likes}
              isPublic={asset.isPublic}
              handleVisibilityChange={() => this.setAssetVisibility(asset.id)}
              updateDownloads={this.props.updateDownloads}
              updateLikes={this.props.updateLikes}
              locationType={'assetPage'}
              assetType={asset.assetType}
            />
          </div>
        );
      });
    }

    private sortAssets () {
      this.state.assets.sort((a, b) => {
        switch (this.props.sortType) {
          case "id":
            return +new Date(b.uploadDate) - +new Date(a.uploadDate);

          case "downloads":
            return b.downloads - a.downloads;

          case "likes":
            return b.likes - a.likes;
        }
      });
    }

    private loadMoreAssets () {
      // Show LoadingSpinner
      this.setState({ showLoadingSpinner: true });

      // Fetch Next Assets
      const postData = new FormData();
      postData.append('excludes', this.state.excludeIDs);
      postData.append('type', this.props.sortType);
      postData.append('queryString', this.props.queryString);

      axios.post(this.props.fetchURL, postData)
        .then(response => {
          response.data.map(asset => {
            this.setState({ assets: [...this.state.assets, asset] });
          });

          this.setState({
            excludeIDs: this.state.assets.map(asset => { return asset.id; }),
            showLoadButton: response.data.length !== 0 && this.props.showLoadButton,
            showLoadingSpinner: false,
            isMoreLoadable: response.data.length !== 0,
          });
        }, error => {
          console.log(error);
        });
    }

    private handleSortingChange () {
      const selectedSortingType = (document.getElementById('sortingPanel') as HTMLSelectElement).value;
      switch (selectedSortingType) {
        case 'id':
          this.urlService.redirectToAbsoluteURL(this.props.idURL);
          break;

        case 'downloads':
          this.urlService.redirectToAbsoluteURL(this.props.downloadsURL);
          break;

        case 'likes':
          this.urlService.redirectToAbsoluteURL(this.props.likesURL);
          break;
      }
    }

    private getClassName () {
      let className = '';

      switch (this.props.numPerRow) {
        case 1:
          className = 'col-lg-12 col-md-12 col-sm-12 col-xs-12';
          break;
        case 2:
          className = 'col-lg-6 col-md-6 col-sm-6 col-xs-6';
          break;
        case 3:
          className = 'col-lg-4 col-md-6 col-sm-6 col-xs-6';
          break;
        case 4:
          className = 'col-lg-3 col-md-4 col-sm-6 col-xs-6';
          break;
      }

      return className;
    }
}
