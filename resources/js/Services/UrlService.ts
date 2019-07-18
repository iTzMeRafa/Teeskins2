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

    Dashboard = "/userpanel/dashboard",
    Settings = "/userpanel/settings",
    
    UserList = "/adminpanel/userlist",
    SkinUploads = "/adminpanel/uploads/skin",
    MapresUploads = "/adminpanel/uploads/mapres",
    GameskinUploads = "/adminpanel/uploads/gameskin",
    EmoticonUploads = "/adminpanel/uploads/emoticon",
    ParticleUploads = "/adminpanel/uploads/particle",
    CursorUploads = "/adminpanel/uploads/cursor",
}

export class UrlService {
    
    public getBaseURL() {
        const url = window.location;
        return url.protocol + "//" + url.host;
    }

    public getUrlPath() {
        const url = window.location.href;
        const startChar = url.indexOf('/', 8);
        return url.substr(startChar, url.length);
    }

    private navIsActive(naviPath) {
        if(this.getUrlPath() === naviPath) {
            return 'active';
        }
        return '';
    }

    public mergeBaseWithPathURL(path) {
        return this.getBaseURL() + path;
    } 

    public redirectToPageURL(url: URLS) {
        window.location.href = this.getBaseURL() + url;
    }

    public redirectToAbsoluteURL(url: string) {
        window.location.replace(url);
    }
}