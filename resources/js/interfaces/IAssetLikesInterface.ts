export interface IAssetTypeLikesInterface {
    skins: IAssetLikesInterface;
    body: IAssetLikesInterface;
    decoration: IAssetLikesInterface;
    eyes: IAssetLikesInterface;
    feet: IAssetLikesInterface;
    hands: IAssetLikesInterface;
    marking: IAssetLikesInterface;
    mapres: IAssetLikesInterface;
    gameskins: IAssetLikesInterface;
    emoticons: IAssetLikesInterface;
    cursors: IAssetLikesInterface;
    particles: IAssetLikesInterface;
    grids: IAssetLikesInterface;
}

export interface IAssetLikesInterface {
    key: any;
    includes(id: number): any;
}
