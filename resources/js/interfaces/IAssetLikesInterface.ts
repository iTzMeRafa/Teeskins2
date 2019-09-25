export interface IAssetTypeLikesInterface {
    skins: IAssetLikesInterface;
    body: IAssetLikesInterface;
    decoration: IAssetLikesInterface;
    eye: IAssetLikesInterface;
    feet: IAssetLikesInterface;
    hand: IAssetLikesInterface;
    marking: IAssetLikesInterface;
}

export interface IAssetLikesInterface {
    key: any;
    includes(id: number): any;
}
