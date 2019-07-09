export enum URLS {
    Home = "/",
    Login = "/login",
    Register = "/register",
    Skins = "/skins",
    Mapres = "/mapres",
    Gameskins = "/gameskins",
    Emoticons = "/emoticons",
    Particles = "/particles",
    Cursors = "/cursors",
}

export class UrlService {

    private baseDomain;



    public redirectToPageURL(url: URLS) {
        window.location.replace(url);
    }

    public redirectToAbsoluteURL(url: string) {
        window.location.replace(url);
    }
}