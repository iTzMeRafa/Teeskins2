export interface NewestAsset {
    author: string;
    id: number;
    imagePath: string;
    name: string;
    uploadDate: string;
}

export interface MostDownloadedAsset{
    author: string;
    id: number;
    imagePath: string;
    name: string;
    uploadDate: string;
    downloads: number;
}

export interface MostLikedAsset{
    author: string;
    id: number;
    imagePath: string;
    name: string;
    uploadDate: string;
    likes: number;
}


