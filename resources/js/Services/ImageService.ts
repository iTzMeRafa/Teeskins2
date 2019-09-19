/* eslint-disable no-unused-vars */

export class ImageService {
  public getErrorStatusImage (status) {
    switch (status) {
      case 404:
        return '/img/pepes/feelsbadman.png';
      case 500:
        return '/img/pepes/monkaS.png';
    }
  }
}
