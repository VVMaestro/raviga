import type { RecordModel } from 'pocketbase';
import type { PositionRecord, PositionRecordInitData } from './PositionRecord';

export interface PhotoRecord extends RecordModel {
  id: string;
  file: string;
  user: string;
  description?: string;
  created: Date;
  updated: Date;
  expand: {
    position?: PositionRecord;
  }
}

export interface PhotoRecordInitData {
  user: string;
  description?: string;
  file: File;
  position: PositionRecordInitData;
}