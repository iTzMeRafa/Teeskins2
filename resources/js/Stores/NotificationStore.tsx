import { observable, computed } from "mobx";

//Services
import { ICONS } from "../Services/ImageService";

// Interfaces
/* eslint-disable-next-line no-unused-vars */
import { IToastInterface, INotificationStoreInterface } from '../interfaces/INotificationStoreInterface';

class NotificationStore {
  @observable toasts: IToastInterface[] = [
    {
      'id': 0,
      'headline': 'undefined',
      'text': 'undefined',
      'icon': ICONS.MAIN_TEE_FLIPPED,
      'isVisible': false,
    }
  ];

  @observable toastsPosition: INotificationStoreInterface['toastsPosition'] = 'bottomLeft';

  public addLikedToast(id, assetName) {
    if (this.toasts.find(toast => toast.id === id)) return;

    this.toasts.push(
        {
          'id': id,
          'headline': 'Liked',
          'text': 'You liked ' + assetName,
          'icon': ICONS.MAIN_TEE_FLIPPED,
          'isVisible': true,
        }
    );
    this.removeToast(id);
  }

  public addUnlikedToast(id, assetName) {
    if (this.toasts.find(toast => toast.id === id)) return;

    this.toasts.push(
        {
          'id': id,
          'headline': 'Disliked',
          'text': 'You disliked ' + assetName,
          'icon': ICONS.MAIN_TEE_FLIPPED,
          'isVisible': true,
        }
    );
    this.removeToast(id);
  }

  public addDownloadToast(id, assetName) {
    if (this.toasts.find(toast => toast.id === id)) return;

    this.toasts.push(
        {
          'id': id,
          'headline': 'Download',
          'text': 'Your download for ' + assetName + ' is starting',
          'icon': ICONS.MAIN_TEE_FLIPPED,
          'isVisible': true,
        }
    );
    this.removeToast(id);
  }

  public addReportedToast(id, assetName) {
    if (this.toasts.find(toast => toast.id === id)) return;

    this.toasts.push(
        {
          'id': id,
          'headline': 'Reported',
          'text': 'Thanks for reporting ' + assetName,
          'icon': ICONS.MAIN_TEE_FLIPPED,
          'isVisible': true,
        }
    );
    this.removeToast(id);
  }

  public addDownloadLimit(id, assetName) {
    if (this.toasts.find(toast => toast.id === id)) return;

    this.toasts.push(
        {
          'id': id,
          'headline': 'Download Limit',
          'text': `Your download limit for ${assetName} has been reached, please wait 1 minute.`,
          'icon': ICONS.MAIN_TEE_FLIPPED,
          'isVisible': true,
        }
    );
    this.removeToast(id);
  }

  private removeToast(id) {
    setTimeout(() => {
      // Set Toast invisible for fade out animation
      this.toasts.find(toast => toast.id === id).isVisible = false;

      // Remove toast object from array
      setTimeout(() => {
        for (let i =0; i < this.toasts.length; i++)
          if (this.toasts[i].id === id) {
            this.toasts.splice(i,1);
            break;
          }
      }, 2000);
    }, 4000);
  }
}

export default new NotificationStore();

