export interface IAssetTypeLikesInterface {
    skins: IAssetLikesInterface;
    body: IAssetLikesInterface;
    decoration: IAssetLikesInterface;
    eyes: IAssetLikesInterface;
    feet: IAssetLikesInterface;
    hands: IAssetLikesInterface;
    marking: IAssetLikesInterface;
}

export interface IAssetLikesInterface {
    key: any;
    includes(id: number): any;
}
