import * as React from 'react';
import FontAwesome from "react-fontawesome";

export default class Newest extends React.Component {
    render(){
        return(
            <>
                <h3 className="headline">most likes</h3>
                <p className="value">
                    <FontAwesome name='rocket' /> 293
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