//Services
import { ICONS } from "../Services/ImageService";

export interface INotificationStoreInterface {
  toastHeadline: string | JSX.Element;
  toastText: string | JSX.Element;
  toastIcon: ICONS;
  toastPosition: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
  toastIsVisible: boolean;
}