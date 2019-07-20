import * as React from 'react';

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
               <div className="row mb-4">
                   
                   <div className="col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Uploads</h5>
                                <p className="card-text">{this.props.statistics.uploadCount}</p>
                            </div>
                        </div>
                   </div>

                   <div className="col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Total Likes</h5>
                                <p className="card-text">{this.props.statistics.totalLikes}</p>
                            </div>
                        </div>
                   </div>

                   <div className="col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Total Downloads</h5>
                                <p className="card-text">{this.props.statistics.totalDownloads}</p>
                            </div>
                        </div>
                   </div>

               </div>
        );
    }
}