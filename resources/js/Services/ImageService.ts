/* eslint-disable no-unused-vars */

export enum PARTNERS {
  STATUS = '/img/partner-logos/status.tw.png',
  ISPONE = '/img/partner-logos/ispone.png',
  TEEWORLDSFRIENDS = '/img/partner-logos/teeworlds-friends.png',
  TEECLOUD = '/img/partner-logos/teecloud.png',
  CLOUDFLARE = '/img/partner-logos/cloudflare.png',
}

export enum ICONS {
  THINK_FORWARD = '/img/icons/think-forward.png',
  THINK_LEFT = '/img/icons/think-left.png',
}

export class ImageService {

  public static getErrorStatusImage (status) {
    switch (status) {
      case 404:
        return '/img/pepes/feelsbadman.png';
      case 500:
        return '/img/pepes/monkaS.png';
    }
  }


}
