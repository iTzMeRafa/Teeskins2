import { TYPES } from '../Services/AssetService';

export interface Asset {
  author: string;
  id: number;
  imagePath?: string;
  name: string;
  username: string;
  uploadDate: string;
  downloads: number;
  likes: number;
  isPublic: number;
  assetType: TYPES;
}
