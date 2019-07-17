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
    PrivacyPolicies = "/privacy-policies",
    TermsOfUse = "/terms-of-use",
}

export class UrlService {
    
    public getBaseURL() {
        const url = window.location;
        return url.protocol + "//" + url.host + "/";
    }

    public getUrlPath() {
        const url = window.location.href;
        const startChar = url.indexOf('/', 8);
        return url.substr(startChar, url.length);
    }

    public redirectToPageURL(url: URLS) {
        window.location.href =url;
    }

    public redirectToAbsoluteURL(url: string) {
        window.location.replace(url);
    }
}