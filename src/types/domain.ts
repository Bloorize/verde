export type InspectionFailureReason = 'Streaks' | 'Smudges' | 'Spots' | 'Fingerprints' | 'Dirty';

export type WorkItemStatus = 'Open' | 'Closed' | 'Overdue';
export type WorkItemPriority = 'Low' | 'Medium' | 'High' | 'Critical';
export type CaseStatus = 'New' | 'In Review' | 'Resolved' | 'Closed';
export type CaseType =
  | 'Incident'
  | 'Property Damage'
  | 'Near Miss'
  | 'Facility Catch'
  | 'Safety Concern'
  | 'Complaint'
  | 'Compliment'
  | 'Service Request'
  | 'HR Request'
  | 'Resignation'
  | 'Fleet Request'
  | 'Help Desk'
  | 'EHS Question';

export interface Site {
  id: string;
  name: string;
  regionId: string;
}

export interface Region {
  id: string;
  name: string;
}

export interface Manager {
  id: string;
  name: string;
  regionId: string;
  siteIds: string[];
}

export interface Building {
  id: string;
  siteId: string;
  name: string;
}

export interface Floor {
  id: string;
  buildingId: string;
  name: string;
}

export interface SpaceType {
  id: string;
  name: string;
  frequency: 'Daily' | 'Weekly' | 'Monthly' | 'Yearly';
}

export interface Space {
  id: string;
  floorId: string;
  typeId: string;
  shortName: string;
  description: string;
  inspectionSettings: string;
  serviceLogging: string;
}

export interface InspectionItem {
  id: string;
  roomId: string;
  name: string;
  status: 'pass' | 'fail';
  aboveAndBeyond: boolean;
  reason?: InspectionFailureReason;
  photoCount: number;
  commentCount: number;
  notes?: string;
}

export interface InspectionRoom {
  id: string;
  name: string;
  score: number;
  photoCount: number;
  commentCount: number;
  items: InspectionItem[];
}

export interface Inspection {
  id: string;
  siteId: string;
  inspectorName: string;
  inspectorAvatar: string;
  timestamp: string;
  buildingName: string;
  spacesInspected: number;
  score: number;
  baseline: boolean;
  jointInspection: boolean;
  rooms: InspectionRoom[];
  comments: string[];
  photos: string[];
  notes?: string;
}

export interface WorkItem {
  id: string;
  title: string;
  siteId: string;
  siteName: string;
  space: string;
  assignee: string;
  dueDate: string;
  status: WorkItemStatus;
  priority: WorkItemPriority;
  notes: string;
  photos: string[];
  comments: string[];
  history: string[];
}

export interface CaseRecord {
  id: string;
  title: string;
  type: CaseType;
  siteId: string;
  siteName: string;
  status: CaseStatus;
  owner: string;
  createdAt: string;
  comments: string[];
  attachments: string[];
  auditHistory: string[];
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  sites: string[];
  trainingStatus: 'Current' | 'Due Soon' | 'Overdue';
  assignedSites: string[];
  trainingTranscript: string[];
  inspectionActivity: string;
}

export interface TrainingCourse {
  id: string;
  title: string;
  category: string;
  duration: string;
}

export interface TrainingSession {
  id: string;
  courseId: string;
  instructor: string;
  date: string;
  attendees: number;
}

export interface Survey {
  id: string;
  type: 'Employee' | 'Customer';
  title: string;
  participationRate: number;
  score: number;
  comments: string[];
}

export interface DocumentRecord {
  id: string;
  type: 'SOW' | 'Addenda' | 'MSA' | 'Other';
  title: string;
  siteId: string;
  updatedAt: string;
}

export interface ServiceCoverageLog {
  id: string;
  siteId: string;
  spaceName: string;
  frequency: 'Daily' | 'Weekly' | 'Monthly';
  completion: number;
  lastScanAt: string;
}

export interface DashboardMetrics {
  sageScore: number;
  suggestions: string[];
  workItemAgingAlert: string;
  inspectionCoverage: number;
  jointCoverage: number;
  inspectionTrend: number;
}

export interface TrendPoint {
  label: string;
  value: number;
}

export interface AnalyticsPayload {
  inspectionScoreTrends: TrendPoint[];
  workItemAging: TrendPoint[];
  serviceCoverage: TrendPoint[];
  incidents: TrendPoint[];
  complaints: TrendPoint[];
  surveys: TrendPoint[];
  budgets: TrendPoint[];
}

export interface SiteConfig {
  site: Site;
  buildings: Building[];
  floors: Floor[];
  spaceTypes: SpaceType[];
  spaces: Space[];
}

export interface CurrentUser {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
}
