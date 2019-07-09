export interface IAssetLikesInterface {
    skins: ISkinLikesInterface;
}

export interface ISkinLikesInterface {
    key: any;
    includes(id: number): any;
}