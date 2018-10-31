import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faClock } from '@fortawesome/free-solid-svg-icons'

export default class Newest extends React.Component {
    render(){
        return(
            <>
                <h3 className="headline">newest</h3>
                <p className="value">
                    <FontAwesomeIcon icon={faClock}/> 2018-05-09 19:49:34
                </p>
                <div className="card mb-5 mt-1">
                    <div className="card-body">
                        <p className="assetName">
                            patwo's cat
                        </p>
                        <div className="assetImage">
                            <img src="http://teeskins.net/skinrenderer.php?skin=assets/db/patwo%27s%20cat.png"/>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}