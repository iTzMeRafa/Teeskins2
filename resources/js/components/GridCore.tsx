import * as React from 'react';
import AssetCard from './AssetCard';
import LoadingSpinner from './LoadingSpinner';
import axios from 'axios';

// Interfaces
/* eslint-disable-next-line no-unused-vars */
import { IUserInfoInterface } from '../interfaces/IUserInfoInterface';

// Services
import { UrlService } from '../Services/UrlService';
import { TYPES } from '../Services/AssetService';
import { HelperService } from '../Services/HelperService';

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
    assets: any;
    seekData: any;
    showLoadButton: boolean;
    showLoadingSpinner: boolean;
    isMoreLoadable: boolean;
}

export default class GridCore extends React.Component<IGridCoreProps, IGridCoreState> {
    private readonly urlService: UrlService;
    private readonly helperService: HelperService;

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
      this.urlService = new UrlService();
      this.helperService = new HelperService();

      this.state = {
        hideForAssetIDs: [0],
        assets: this.props.assets,
        seekData: this.getSeekData(this.props.assets),
        showLoadButton: this.props.showLoadButton,
        showLoadingSpinner: false,
        isMoreLoadable: true,
      };
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
              extension={asset.extension}
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
      postData.append('type', this.props.sortType);
      postData.append('seekData', JSON.stringify(this.state.seekData));
      postData.append('queryString', this.props.queryString || '');

      axios.post(this.props.fetchURL, postData)
        .then(response => {

          // Set new values for seek data
          this.setState({seekData: this.getSeekData(response.data)});

          // Add new assets
          response.data.map(asset => {
            this.setState({ assets: [...this.state.assets, asset] });
          });

          // Update configs
          this.setState({
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

  private getSeekData(assets) {
      const seekData = {};

      Object.keys(TYPES).map(key => {
        const assetGrouped = this.helperService.groupArrayOfObjectsByKey(assets, asset => asset.assetType);
        const assetsFiltered = assetGrouped.get(TYPES[key]);
        if (assetsFiltered) {
          const lastAssetID = assetsFiltered[assetsFiltered.length -1].id;
          const lastAssetTypeValue = assetsFiltered[assetsFiltered.length -1][this.props.sortType];

          seekData[TYPES[key]] = ({id: lastAssetID, value: lastAssetTypeValue});
        }
      });

      return seekData;
  }
}
