export interface SitePlan {
  isometric: boolean;
  layers: {
    'layer-id': string;
  }[];
  origin: string;
}
