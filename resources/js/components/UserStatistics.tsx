import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload, faThumbsUp, faDownload } from '@fortawesome/free-solid-svg-icons'

// Interfaces
import { IUserInfoInterface } from './../interfaces/IUserInfoInterface';
import { IUserStatisticsInterface } from './../interfaces/IUserStatisticsInterface';

interface IUserStatisticsInterfaceProps {
    statistics: IUserStatisticsInterface;
    userInfo: IUserInfoInterface;
}

export default class UserStatistics extends React.Component<IUserStatisticsInterfaceProps> {
    render(){
        return(
            <>
                <h3>Statistics for your assets</h3>
                <div className="row mb-5">
                    
                    <div className="col-md-4">
                            <div className="card">
                                <div className="card-body">
                                    <FontAwesomeIcon icon={faUpload} /> <strong>{this.props.statistics.uploadCount}</strong> Uploads
                                </div>
                            </div>
                    </div>

                    <div className="col-md-4">
                            <div className="card">
                                <div className="card-body">
                                    <FontAwesomeIcon icon={faThumbsUp} /> <strong>{this.props.statistics.totalLikes}</strong> Total Likes
                                </div>
                            </div>
                    </div>

                    <div className="col-md-4">
                            <div className="card">
                                <div className="card-body">
                                    <FontAwesomeIcon icon={faDownload} /> <strong>{this.props.statistics.totalDownloads}</strong> Total Downloads
                                </div>
                            </div>
                    </div>

                </div>
            </>
        );
    }
}