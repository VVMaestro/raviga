import type { LngLat } from '@yandex/ymaps3-types';

export interface IPhotoData {
  id: string;
  url: string;
  geometry: {
    coordinates: LngLat;
  };
  properties: {
    description: string;
  }
}