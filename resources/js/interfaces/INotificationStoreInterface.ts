//Services
import { ICONS } from "../Services/ImageService";

export interface IToastInterface {
  id: string | number;
  headline: string | JSX.Element;
  text: string | JSX.Element;
  icon: ICONS;
  isVisible: boolean;
}

export interface INotificationStoreInterface {
  toasts: IToastInterface[];
  toastsPosition: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
  addLikedToast(id: string | number, assetName: string | JSX.Element);
  addUnlikedToast(id: string | number, assetName: string | JSX.Element);
  addDownloadToast(id: string | number, assetName: string | JSX.Element);
  addReportedToast(id: string | number, assetName: string | JSX.Element);
  addDownloadLimit(id: string | number, assetName: string | JSX.Element);
}