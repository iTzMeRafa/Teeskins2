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
    
    public redirectToPageURL(url: URLS) {
        window.location.href =url;
    }

    public redirectToAbsoluteURL(url: string) {
        window.location.replace(url);
    }
}