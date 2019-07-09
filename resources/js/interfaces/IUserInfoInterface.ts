import { IAssetLikesInterface } from './IAssetLikesInterface';

export interface IUserInfoInterface {
    isLoggedIn: boolean;
    email: string | null;
    id: number | null;
    username: string | null;
    assetLikes: IAssetLikesInterface;
}