export interface IDataInterface {
    viewData: IViewDataInterface;
    globalData: IGlobalDataInterface;
}

/**
 * The viewData is based on its view and 
 * therefore cant be explicitly stated
 */
export interface IViewDataInterface {
    [key: string]: any;
}

export interface IGlobalDataInterface {
    totalItemsCount: number;
}