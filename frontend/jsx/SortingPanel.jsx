import React from "react";

export default class SortingPanel extends React.Component {
    render(){
        return(
            <>
                <div className="btn-group btn-block">
                    <button type="button" className="btn btn-danger dropdown-toggle btn-block"
                            data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">
                        Sort by
                    </button>
                    <div className="dropdown-menu actions btn-block">
                        <button className="dropdown-item sort-downloads-asc" type="button">Downloads (asc)</button>
                        <button className="dropdown-item sort-downloads-desc" type="button">Downloads (desc)
                        </button>
                    </div>
                </div>

                <div className="btn-group btn-block">
                    <button type="button" className="btn btn-danger dropdown-toggle btn-block"
                            data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">
                        Filters
                    </button>
                    <div className="dropdown-menu actions btn-block">
                        <button className="dropdown-item " type="button">Personal
                        </button>
                        <button className="dropdown-item " type="button">Clan
                        </button>
                    </div>
                </div>
            </>
        );
    }
}