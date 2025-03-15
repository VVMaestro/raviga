import type { IPhotoData } from '../../types/PhotoData';
import type { TypedPocketBase } from '../../types/PocketBase';
import { PHOTO_POSITION_EXPAND } from './constants';
import type { PhotoRecord, PhotoRecordInitData } from '../../types/PhotoRecord';
import type { PositionRecord, PositionRecordInitData } from '../../types/PositionRecord';

export class Photo {
  private readonly pocketbase: TypedPocketBase;

  private readonly photoCollectionName = 'photos';

  private readonly positionsCollectionName = 'positions';

  constructor() {
    this.pocketbase = Auth.getPB();
  }

  public async getUserPhotos(): Promise<IPhotoData[]> {
    const userId = this.pocketbase.authStore.record?.id;

    const photos = await this.pocketbase.collection(this.photoCollectionName).getList(1, 20, {
      filter: this.pocketbase.filter('user = {:userId}', { userId }),
      expand: PHOTO_POSITION_EXPAND
    });

    const photosData = [];

    for (const photo of photos.items) {
      let photoMapData: IPhotoData;

      try {
        photoMapData = this.getMapPhotoData(photo);
      } catch(e: unknown) {
        console.error(e);

        continue;
      }

      photosData.push(photoMapData);
    }

    return photosData;
  }

  public getMapPhotoData(photoRecord: PhotoRecord): IPhotoData {
    const photoName = photoRecord.file;

    if (!photoRecord.expand?.position) {
      throw new Error(`No position for photo: ${photoRecord.id}`);
    }

    const id = photoRecord.id;
    const url = this.pocketbase.files.getURL(photoRecord, photoName);
    const latitude = photoRecord.expand?.position?.latitude;
    const longitude = photoRecord.expand?.position?.longitude;
    const description = photoRecord.description;

    return {
      id,
      url,
      geometry: {
        coordinates: [longitude, latitude]
      },
      properties: {
        description: description ?? '',
      },
    };
  }

  public async createPhoto(photoData: PhotoRecordInitData): Promise<PhotoRecord> {
    const { position, ...restPhotoData } = photoData;

    const positionRecord = await this.createPosition(position);

    return this.pocketbase.collection(this.photoCollectionName).create({
      ...restPhotoData,
      position: positionRecord.id,
    }, {expand: PHOTO_POSITION_EXPAND});
  }

  private async createPosition(positionData: PositionRecordInitData): Promise<PositionRecord> {
    return this.pocketbase.collection(this.positionsCollectionName).create(positionData);
  }
}