export enum URLS {
    Home = "/",
    Login = "/login",
    Register = "/register",

    Skins = "/skins",
    SkinsDownloads = "/skins/downloads",
    SkinsLikes = "/skins/likes",
    Mapres = "/mapres",
    Gameskins = "/gameskins",
    Emoticons = "/emoticons",
    Particles = "/particles",
    Cursors = "/cursors",
    Search = "/search",

    PrivacyPolicies = "/privacy-policies",
    TermsOfUse = "/terms-of-use",

    Dashboard = "/userpanel/dashboard",
    DashboardDownloads = "/userpanel/dashboard/downloads",
    DashboardLikes = "/userpanel/dashboard/likes",
    Settings = "/userpanel/settings",

    UserList = "/adminpanel/userlist",
    SkinUploads = "/adminpanel/uploads/skin",
    SkinUploadsDownload = "/adminpanel/uploads/skin/downloads",
    SkinUploadsLikes = "/adminpanel/uploads/skin/likes",
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

    public navIsActive(naviPath) {
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

    public redirectToPagePath(path) {
        window.location.href = this.mergeBaseWithPathURL(path);
    }

    public redirectToAbsoluteURL(url: string) {
        window.location.replace(url);
    }
}