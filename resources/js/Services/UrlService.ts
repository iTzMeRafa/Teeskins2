/* eslint-disable no-unused-vars */

export enum URLS {
    Home = '/',
    Login = '/login',
    Register = '/register',

    Skins = '/skins',
    SkinsDownloads = '/skins/downloads',
    SkinsLikes = '/skins/likes',

    Body = '/body',
    BodyDownloads = '/body/downloads',
    BodyLikes = '/body/likes',

    Decoration = '/decoration',
    DecorationDownloads = '/decoration/downloads',
    DecorationLikes = '/decoration/likes',

    Eyes = '/eyes',
    EyesDownloads = '/eyes/downloads',
    EyesLikes = '/eyes/likes',

    Feet = '/feet',
    FeetDownloads = '/feet/downloads',
    FeetLikes = '/feet/likes',

    Hands = '/hands',
    HandsDownloads = '/hands/downloads',
    HandsLikes = '/hands/likes',

    Marking = '/marking',
    MarkingDownloads = '/marking/downloads',
    MarkingLikes = '/marking/likes',

    SkinGenerator = '/skinGenerator',

    Mapres = '/mapres',
    Gameskins = '/gameskins',
    Emoticons = '/emoticons',
    Particles = '/particles',
    Cursors = '/cursors',
    Search = '/search',

    PrivacyPolicies = '/privacy-policies',
    TermsOfUse = '/terms-of-use',

    API = '/api',
    APISkins = '/api/skins',

    Dashboard = '/userpanel/dashboard',
    DashboardDownloads = '/userpanel/dashboard/downloads',
    DashboardLikes = '/userpanel/dashboard/likes',
    Settings = '/userpanel/settings',

    UserList = '/adminpanel/userlist',

    BodyUploads = '/adminpanel/uploads/body',
    BodyUploadsDownload = '/adminpanel/uploads/body/downloads',
    BodyUploadsLikes = '/adminpanel/uploads/body/likes',

    DecorationUploads = '/adminpanel/uploads/decoration',
    DecorationUploadsDownload = '/adminpanel/uploads/decoration/downloads',
    DecorationUploadsLikes = '/adminpanel/uploads/decoration/likes',

    EyesUploads = '/adminpanel/uploads/eyes',
    EyesUploadsDownload = '/adminpanel/uploads/eyes/downloads',
    EyesUploadsLikes = '/adminpanel/uploads/eyes/likes',

    FeetUploads = '/adminpanel/uploads/feet',
    FeetUploadsDownload = '/adminpanel/uploads/feet/downloads',
    FeetUploadsLikes = '/adminpanel/uploads/feet/likes',

    HandsUploads = '/adminpanel/uploads/hands',
    HandsUploadsDownload = '/adminpanel/uploads/hands/downloads',
    HandsUploadsLikes = '/adminpanel/uploads/hands/likes',

    MarkingUploads = '/adminpanel/uploads/marking',
    MarkingUploadsDownload = '/adminpanel/uploads/marking/downloads',
    MarkingUploadsLikes = '/adminpanel/uploads/marking/likes',

    SkinUploads = '/adminpanel/uploads/skin',
    SkinUploadsDownload = '/adminpanel/uploads/skin/downloads',
    SkinUploadsLikes = '/adminpanel/uploads/skin/likes',

    MapresUploads = '/adminpanel/uploads/mapres',
    GameskinUploads = '/adminpanel/uploads/gameskin',
    EmoticonUploads = '/adminpanel/uploads/emoticon',
    ParticleUploads = '/adminpanel/uploads/particle',
    CursorUploads = '/adminpanel/uploads/cursor',

    FetchSkins = '/fetch/skins',
    FetchBody = '/fetch/body',
    FetchDecoration = '/fetch/decoration',
    FetchEyes = '/fetch/eyes',
    FetchFeet = '/fetch/feet',
    FetchHands = '/fetch/hands',
    FetchMarking = '/fetch/Marking',
    FetchSearch = '/fetch/search',
    FetchUserUploads = '/fetch/userUploads',
    FetchSkinUploads = '/fetch/skinUploads',
    FetchBodyUploads = '/fetch/bodyUploads',
    FetchDecorationUploads = '/fetch/decorationUploads',
    FetchEyesUploads = '/fetch/eyesUploads',
    FetchFeetUploads = '/fetch/feetUploads',
    FetchHandsUploads = '/fetch/handsUploads',
    FetchMarkingUploads = '/fetch/markingUploads',
}

export class UrlService {
  public getBaseURL () {
    const url = window.location;
    return url.protocol + '//' + url.host;
  }

  public getUrlPath () {
    const url = window.location.href;
    const startChar = url.indexOf('/', 8);
    return url.substr(startChar, url.length);
  }

  public navIsActive (naviPath) {
    if (this.getUrlPath() === naviPath) {
      return 'active';
    }
    return '';
  }

  public mergeBaseWithPathURL (path) {
    return this.getBaseURL() + path;
  }

  public mergeBaseWithURL (url: URLS) {
    return this.getBaseURL() + url;
  }

  public redirectToPageURL (url: URLS) {
    window.location.href = this.getBaseURL() + url;
  }

  public redirectToPagePath (path) {
    window.location.href = this.mergeBaseWithPathURL(path);
  }

  public redirectToAbsoluteURL (url: string) {
    window.location.replace(url);
  }
}
