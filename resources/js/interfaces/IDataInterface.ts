import { IUserInfoInterface } from './IUserInfoInterface';

export interface IDataInterface {
    viewData: IViewDataInterface;
    globalData: IGlobalDataInterface;
}

export interface IGlobalDataInterface {
    totalItemsCount: number;
    userInfo: IUserInfoInterface;
}

/**
 * The viewData is based on its view and 
 * therefore cant be explicitly stated
 */
export interface IViewDataInterface {
    [key: string]: any;
}
