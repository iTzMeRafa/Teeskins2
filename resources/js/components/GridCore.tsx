import * as React from 'react';
import Skin from './Skin';
import axios from 'axios';

// Interfaces
import { IUserInfoInterface } from '../interfaces/IUserInfoInterface';

// Services
import {URLS, UrlService} from '../Services/UrlService';

interface IGridCoreProps {
    assets: any;
    userInfo: IUserInfoInterface;
    numPerRow: 1 | 2 | 3 | 4;
    updateDownloads: boolean;
    updateLikes: boolean;
    sortType: 'id' | 'downloads' | 'likes';
    page: string;
    queryString?: string;
}

interface IGridCoreState {
    hideForAssetIDs: number[];
    excludeIDs: any;
    assets: any;
    showLoadButton: boolean;
}

export default class GridCore extends React.Component<IGridCoreProps, IGridCoreState> {

    private readonly urlService: UrlService;

    public render() {
        console.log(this.state.excludeIDs);
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
            </>
        );
    }

    public constructor(props: IGridCoreProps) {
        super(props);
        this.state = {
            hideForAssetIDs: [0],
            assets: this.props.assets,
            excludeIDs: this.props.assets.map(function(asset) { return asset.id; }),
            showLoadButton: true,
        };

        this.urlService = new UrlService();
    }
    
    private setAssetVisibility(assetID) {
        this.setState({
            hideForAssetIDs: [...this.state.hideForAssetIDs, assetID],
        });
    }

    private renderSortingPanel() {
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
    
    private renderAssets() {
        return this.state.assets.map(asset => {
            return (
                <div 
                    className={`${this.getClassName()} mb-4`} 
                    key={asset.id} 
                    style={this.state.hideForAssetIDs.includes(asset.id) ? { display: "none" } : { display: "block" }}
                >
                    <Skin
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
                    />
                </div>
            );
        });
    }

    private loadMoreAssets() {
        // Fetch Next Assets

        const postData = new FormData();
        postData.append('excludes', this.state.excludeIDs);
        postData.append('type', this.props.sortType);
        postData.append('queryString', this.props.queryString);

        let fetchUrl;

        switch(this.props.page) {
            case 'skins':
                fetchUrl = this.urlService.mergeBaseWithPathURL('/fetch/skins');
                break;

            case 'search':
                fetchUrl = this.urlService.mergeBaseWithPathURL('/fetch/search');
                break;

            case 'dashboard':
                fetchUrl = this.urlService.mergeBaseWithPathURL('/fetch/userUploads');
                break;

            case 'adminUploadSkins':
                fetchUrl = this.urlService.mergeBaseWithPathURL('/fetch/skinUploads');
                break;
        }

        axios.post(fetchUrl, postData)
        .then(response => {

            response.data.map(asset => {
                this.setState({ assets: [...this.state.assets, asset] });
            });

            this.setState({ 
                excludeIDs: this.state.assets.map(asset => { return asset.id; }, () => console.log(this.state.excludeIDs)),
                showLoadButton: response.data.length !== 0, 
            });

        }, error => {
            console.log(error);
        });
    }

    private handleSortingChange() {
        const selectedSortingType = (document.getElementById("sortingPanel") as HTMLSelectElement).value;
        switch (selectedSortingType) {
            case "id":
                if (this.props.page === 'skins') {
                    this.urlService.redirectToPageURL(URLS.Skins);
                }
                else if (this.props.page === 'search') {
                    this.urlService.redirectToPagePath('/search/'+this.props.queryString);
                }
                else if (this.props.page === 'dashboard') {
                    this.urlService.redirectToPageURL(URLS.Dashboard);
                }
                else if (this.props.page === 'adminUploadSkins') {
                    this.urlService.redirectToPageURL(URLS.SkinUploads);
                }
                break;

            case "downloads":
                if (this.props.page === 'skins') {
                    this.urlService.redirectToPageURL(URLS.SkinsDownloads);
                }
                else if (this.props.page === 'search') {
                    this.urlService.redirectToPagePath('/search/'+this.props.queryString+'/downloads');
                }
                else if (this.props.page === 'dashboard') {
                    this.urlService.redirectToPageURL(URLS.DashboardDownloads);
                }
                else if (this.props.page === 'adminUploadSkins') {
                    this.urlService.redirectToPageURL(URLS.SkinUploadsDownload);
                }
                break;

            case "likes":
                if (this.props.page === 'skins') {
                    this.urlService.redirectToPageURL(URLS.SkinsLikes);
                }
                else if (this.props.page === 'search') {
                    this.urlService.redirectToPagePath('/search/'+this.props.queryString+'/likes');
                }
                else if (this.props.page === 'dashboard') {
                    this.urlService.redirectToPageURL(URLS.DashboardLikes);
                }
                else if (this.props.page === 'adminUploadSkins') {
                    this.urlService.redirectToPageURL(URLS.SkinUploadsLikes);
                }
                break;
        }
    }

    private getClassName() {
        let className = "";

        switch(this.props.numPerRow) {
            case 1:
                className = "col-lg-12 col-md-12 col-sm-12 col-xs-12";
                break;
            case 2:
                className = "col-lg-6 col-md-6 col-sm-6 col-xs-6";
                break;
            case 3:
                className = "col-lg-4 col-md-6 col-sm-6 col-xs-6";
                break;
            case 4: 
                className = "col-lg-3 col-md-4 col-sm-6 col-xs-6";
                break;
        }

        return className;
    }
}
