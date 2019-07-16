import * as React from 'react';

export default class AdminPanelSideBar extends React.Component {

    private readonly blockName = "adminPanelSideBar";

    public render() {
        return(
            <div className="page-sidebar">
                <aside>
                    <div className="inner-box">
                        <div className="user-panel-sidebar">

                            <div className="collapse-box">
                                <h5 className="collapse-title no-border"> Products
                                    <a className="pull-right" aria-expanded="true" data-toggle="collapse" href="#MyAds">
                                        <i className="fa fa-angle-down"></i>
                                    </a>
                                </h5>

                                <div id="MyAds" className="panel-collapse collapse show">
                                    <ul className="acc-list">
                                        <li className="">
                                            <a href="https://liquidscout.com/user/saves">
                                                <i className="icon-star-circled"></i> Saved Products
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="collapse-box">
                                <h5 className="collapse-title"> Account
                                    <a className="pull-right" aria-expanded="true" data-toggle="collapse" href="#TerminateAccount">
                                        <i className="fa fa-angle-down"></i>
                                    </a>
                                </h5>

                                <div id="TerminateAccount" className="panel-collapse collapse show">
                                    <ul className="acc-list">
                                        <li className="active">
                                            <a href="https://liquidscout.com/user/settings">
                                                <i className="icon-cancel-circled "></i> Account Settings
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>
                </aside>
            </div>
        );
    }
}