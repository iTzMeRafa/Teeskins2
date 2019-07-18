import * as React from 'react';

// Services
import { TYPES } from './../Services/AssetService';
import { URLS, UrlService } from './../Services/UrlService';

export default class AdminPanelSideBar extends React.Component {

    private readonly blockName = "AdminPanelSideBar";
    private readonly urlService;

    public constructor(props: {}) {
        super(props);
        this.urlService = new UrlService();
    }

    public render() {
        return(
            <aside className={this.blockName}>

                <h5 className={`${this.blockName}__title`}> Users </h5>
                <div>
                    <ul className={`navbar ${this.blockName}__navbar`}>
                        <li className="nav-item">
                            <a className={`nav-link ${this.urlService.navIsActive(URLS.UserList)}`} href="">
                                Userlist
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

    private renderUploads() {
        const uploadsList= [];

        Object.keys(TYPES).map(key => {
            const href = this.urlService.mergeBaseWithPathURL("/adminpanel/uploads/" + TYPES[key]);
            uploadsList.push(
                <li className={`nav-item ${this.urlService.navIsActive("/adminpanel/uploads/" + TYPES[key])}`}> 
                    <a 
                        className="nav-link"
                        href={href}
                    >
                        {key}
                    </a>
                </li>
            );
        });

        return uploadsList;
    }
}