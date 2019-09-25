/* eslint-disable-next-line no-unused-vars */
import { IAssetTypeLikesInterface } from './IAssetLikesInterface';

export interface IUserInfoInterface {
    isLoggedIn: boolean;
    email: string | null;
    id: number | null;
    username: string | null;
    role: string | null;
    assetLikes: IAssetTypeLikesInterface;
    triggerParentVisibility: () => void;
}
