import * as React from 'react';
import { observer, inject } from 'mobx-react';

// Services
import { URLS, UrlService } from '../Services/UrlService';

// Interfaces
/* eslint-disable-next-line no-unused-vars */
import { IStoreInterface } from '../interfaces/IStoreInterface';

interface IToastProps {
  stores?: IStoreInterface;
}

@inject('stores')
@observer
export default class Toast extends React.Component<IToastProps> {
  private readonly blockName = 'toastAlert';
  private readonly urlService;

  public constructor (props: IToastProps) {
    super(props);

    this.urlService = new UrlService();
  }

  public render () {
    return (
        <div className={`${this.blockName} ${this.blockName}__position--${this.props.stores.notificationStore!.toastPosition}`}>

          <div className={`toast ${this.blockName}__show`} role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header">
              <img src={this.urlService.mergeBaseWithPathURL(this.props.stores.notificationStore!.toastIcon)} className={`rounded mr-2 ${this.blockName}__headerImage`} alt="toast icon" />
              <strong className="mr-auto">{this.props.stores.notificationStore!.toastHeadline}</strong>
              <small>Just now</small>
              <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="toast-body">
              {this.props.stores.notificationStore!.toastText}
            </div>
          </div>

        </div>
    );
  }
}
