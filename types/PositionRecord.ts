import type { RecordModel } from 'pocketbase';

export interface PositionRecord extends RecordModel {
  id: string;
  longitude: number;
  latitude: number;
  user: string;
}

export interface PositionRecordInitData {
  longitude: number;
  latitude: number;
  user: string;
}
