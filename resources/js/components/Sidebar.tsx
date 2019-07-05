import * as React from 'react';
import SortingPanel from "./SortingPanel";

export default class Sidebar extends React.Component {
    render(){
        return(
            <nav className="sidebar">

                    <div className="title">
                        Sort / Filter
                    </div>

                    <div className="navigation">
                        <SortingPanel/>
                    </div>

            </nav>
        );
    }
}