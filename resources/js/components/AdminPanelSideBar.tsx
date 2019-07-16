import * as React from 'react';

// Services
import { TYPES } from './../Services/AssetService';

export default class AdminPanelSideBar extends React.Component {

    private readonly blockName = "adminPanelSideBar";

    public render() {
        return(
            <aside className={this.blockName}>

                <h5 className={`${this.blockName}__title`}> Users </h5>
                <div>
                    <ul className={`navbar ${this.blockName}__navbar`}>
                        <li className="nav-item">
                            <a className="nav-link" href="">
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
            uploadsList.push(
                <li className="nav-item">
                    <a className="nav-link" href={`adminpanel/uploads/${TYPES[key]}`}>
                        {key}
                    </a>
                </li>
            );
        });

        return uploadsList;
    }
}