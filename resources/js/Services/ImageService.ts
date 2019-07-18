export class ImageService {
    
    public getErrorStatusImage(status) {
        switch (status) {
            case 404:
                return "/img/pepes/feelsbadman.png";
                break;
            case 500:
                return "/img/pepes/monkaS.png";
                break;
        }
    }
}