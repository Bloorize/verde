import { InspectionFailureReason } from '@/src/types/domain';

export type InspectionType = 'Routine' | 'Quality Assurance' | 'Follow-up';

export interface DraftInspectionItem {
  id: string;
  name: string;
  status: 'unset' | 'pass' | 'fail';
  aboveAndBeyond: boolean;
  reason?: InspectionFailureReason;
  photoCount: number;
}

export interface DraftInspectionRoom {
  id: string;
  name: string;
  buildingId: string;
  floorId: string;
  spaceTypeId: string;
  score: number;
  items: DraftInspectionItem[];
}

export interface InspectionDraft {
  step: 1 | 2 | 3;
  type: InspectionType;
  baseline: boolean;
  jointInspection: boolean;
  inspectionDate: string;
  buildingId?: string;
  floorId?: string;
  spaceTypeId?: string;
  roomIdentifier: string;
  completedRooms: DraftInspectionRoom[];
  activeRoomItems: DraftInspectionItem[];
  activeRoomScore: number;
  notes: string;
}
