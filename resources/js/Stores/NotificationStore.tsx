import { observable } from "mobx";

//Services
import { ICONS } from "../Services/ImageService";

// Interfaces
/* eslint-disable-next-line no-unused-vars */
import { INotificationStoreInterface } from '../interfaces/INotificationStoreInterface';

class NotificationStore {
  @observable toastHeadline:  INotificationStoreInterface['toastHeadline']  = "Empty";
  @observable toastText:      INotificationStoreInterface['toastText']      = "Empty";
  @observable toastIcon:      INotificationStoreInterface['toastIcon']      = ICONS.MAIN_TEE_FLIPPED;
  @observable toastPosition:  INotificationStoreInterface['toastPosition']  = "topRight";
  @observable toastIsVisible: INotificationStoreInterface['toastIsVisible'] = true;
}

export default new NotificationStore();

