import PocketBase from 'pocketbase';
import type { RecordService } from 'pocketbase';
import type { PhotoRecord } from './PhotoRecord';
import type { PositionRecord } from './PositionRecord';

export interface TypedPocketBase extends PocketBase {
  collection(idOrName: string): RecordService;
  collection(idOrNAme: 'photos'): RecordService<PhotoRecord>;
  collection(idOrNAme: 'positions'): RecordService<PositionRecord>;
}