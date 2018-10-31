import React from "react";
import Newest from "./Newest";
import MostLikes from "./MostLikes"
import MostDownloads from "./MostDownloads"

export default class Trending extends React.Component {
    render(){
        return(
            <div className="trending">
                <div className="row">
                    <div className="col-md-4">
                        <Newest/>
                    </div>
                    <div className="col-md-4">
                        <MostLikes/>
                    </div>
                    <div className="col-md-4">
                        <MostDownloads/>
                    </div>
                </div>
            </div>
        );
    }
}