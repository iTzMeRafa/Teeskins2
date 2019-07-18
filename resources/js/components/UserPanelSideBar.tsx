import * as React from 'react';

// Services
import { UrlService } from './../Services/UrlService';

export default class UserPanelSideBar extends React.Component {

    private readonly blockName = "AdminPanelSideBar";
    private readonly urlService;

    public constructor(props: {}) {
        super(props);

        this.urlService = new UrlService();
    }

    public render() {
        return(
            <aside className={this.blockName}>

                <h5 className={`${this.blockName}__title`}> Userpanel </h5>
                <div>
                    <ul className={`navbar ${this.blockName}__navbar`}>
                        <li className="nav-item">
                            <a className="nav-link" href={this.urlService.mergeBaseWithPathURL('userpanel/dashboard')}>
                                Dashboard
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href={this.urlService.mergeBaseWithPathURL('userpanel/settings')}>
                                Settings
                            </a>
                        </li>
                    </ul>
                </div>
            </aside>
        );
    }
}