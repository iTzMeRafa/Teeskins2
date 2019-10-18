import * as React from 'react';

// Interfaces
/* eslint-disable-next-line no-unused-vars */
import { IAssetUploadCountInterface } from '../interfaces/IAssetUploadCountInterface';

// Services
import { TYPES } from '../Services/AssetService';
import { URLS, UrlService } from '../Services/UrlService';

interface IAdminPanelSideBarInterface {
  assetUploadsCount: IAssetUploadCountInterface;
}

export default class AdminPanelSideBar extends React.Component<IAdminPanelSideBarInterface> {
    private readonly blockName = 'AdminPanelSideBar';
    private readonly urlService;

    public constructor (props: IAdminPanelSideBarInterface) {
      super(props);
      this.urlService = new UrlService();
    }

    public render () {
      return (
        <aside className={this.blockName}>

          <h5 className={`${this.blockName}__title`}> Users </h5>
          <div>
            <ul className={`navbar ${this.blockName}__navbar`}>
              <li className="nav-item">
                <a className={`nav-link ${this.urlService.navIsActive(URLS.UserList)}`} href={this.urlService.mergeBaseWithPathURL(URLS.UserList)}>
                  Userlist
                </a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${this.urlService.navIsActive(URLS.Reports)}`} href={this.urlService.mergeBaseWithPathURL(URLS.Reports)}>
                  Reports
                </a>
              </li>
            </ul>
          </div>

          <h5 className={`${this.blockName}__title`}> Uploads </h5>
          <div>
            <ul className={`navbar ${this.blockName}__navbar`}>
              {this.renderUploads()}
            </ul>
          </div>

        </aside>
      );
    }

    private renderUploads () {
      const uploadsList = [];

      Object.keys(TYPES).map(key => {
        const enumValue = TYPES[key];
        const href = this.urlService.mergeBaseWithPathURL('/adminpanel/uploads/' + enumValue);
        uploadsList.push(
          <li key={key} className={`nav-item ${this.urlService.navIsActive('/adminpanel/uploads/' + enumValue)}`}>
            <a
              className="nav-link"
              href={href}
            >
              {key} <span className="badge badge-secondary float-right">{this.props.assetUploadsCount[enumValue]}</span>
            </a>
          </li>
        );
      });

      return uploadsList;
    }
}
