import {
  AnalyticsPayload,
  Building,
  CaseRecord,
  DashboardMetrics,
  DocumentRecord,
  Employee,
  Floor,
  Inspection,
  Manager,
  Region,
  ServiceCoverageLog,
  Site,
  SiteConfig,
  Space,
  SpaceType,
  Survey,
  TrainingCourse,
  TrainingSession,
  WorkItem,
} from '@/src/types/domain';

export const mockRegions: Region[] = [
  { id: 'reg_sw', name: 'Southwest Region' },
  { id: 'reg_ca', name: 'California Region' },
];

export const mockSites: Site[] = [
  { id: 'site_1', name: 'Estrella Community College', regionId: 'reg_sw' },
  { id: 'site_2', name: 'ASU Downtown', regionId: 'reg_sw' },
  { id: 'site_3', name: 'ASU Mesa Polytechnic', regionId: 'reg_sw' },
  { id: 'site_4', name: 'City of Carson', regionId: 'reg_ca' },
  { id: 'site_5', name: 'City of Palm Springs', regionId: 'reg_ca' },
  { id: 'site_6', name: 'Phoenix Museum', regionId: 'reg_sw' },
];

export const mockManagers: Manager[] = [
  { id: 'mgr_1', name: 'Brandon Dastrup', regionId: 'reg_sw', siteIds: ['site_1', 'site_2', 'site_3', 'site_6'] },
  { id: 'mgr_2', name: 'Melissa Grant', regionId: 'reg_ca', siteIds: ['site_4', 'site_5'] },
];

export const mockBuildings: Building[] = [
  { id: 'bld_1', siteId: 'site_1', name: 'Learning Commons' },
  { id: 'bld_2', siteId: 'site_2', name: 'Downtown Hall' },
  { id: 'bld_3', siteId: 'site_3', name: 'Innovation Wing' },
  { id: 'bld_4', siteId: 'site_4', name: 'Civic Operations' },
  { id: 'bld_5', siteId: 'site_5', name: 'Municipal Center' },
  { id: 'bld_6', siteId: 'site_6', name: 'Museum North' },
];

export const mockFloors: Floor[] = [
  { id: 'fl_1', buildingId: 'bld_1', name: 'Level 1' },
  { id: 'fl_2', buildingId: 'bld_1', name: 'Level 2' },
  { id: 'fl_3', buildingId: 'bld_2', name: 'Level 1' },
  { id: 'fl_4', buildingId: 'bld_3', name: 'Level 3' },
  { id: 'fl_5', buildingId: 'bld_4', name: 'Ground' },
  { id: 'fl_6', buildingId: 'bld_6', name: 'Mezzanine' },
];

export const spaceTypeNames = [
  'Atrium',
  'Auditorium',
  'Breakroom',
  'Cafe',
  'Classroom',
  'Closet',
  'Community Room',
  'Computer Lab',
  'Conference Room',
  'Cubicle',
  'Dance Room',
  'Theater Room',
  'Electrical Room',
  'Elevator',
  'Hallway',
  'Janitor Closet',
  'Kitchen',
  'Lab',
  'Library',
  'Lobby',
  'Meditation Space',
  'Men\'s Restroom',
  'Women\'s Restroom',
  'Mezzanine',
  'Office',
  'Pantry',
  'Patio',
  'Stairwell',
  'Storage Room',
  'Unisex Restroom',
  'Wellness Center',
];

export const mockSpaceTypes: SpaceType[] = spaceTypeNames.map((name, index) => ({
  id: `st_${index + 1}`,
  name,
  frequency: index % 3 === 0 ? 'Daily' : index % 3 === 1 ? 'Weekly' : 'Monthly',
}));

export const mockSpaces: Space[] = [
  {
    id: 'sp_1',
    floorId: 'fl_1',
    typeId: 'st_20',
    shortName: 'Main Lobby',
    description: 'Primary guest entry lobby.',
    inspectionSettings: 'Daily baseline + weekly joint inspections',
    serviceLogging: 'QR at reception',
  },
  {
    id: 'sp_2',
    floorId: 'fl_2',
    typeId: 'st_9',
    shortName: 'Conference Cedar',
    description: 'High-use conference room.',
    inspectionSettings: 'Post-event inspections enabled',
    serviceLogging: 'Manual service completion',
  },
  {
    id: 'sp_3',
    floorId: 'fl_3',
    typeId: 'st_3',
    shortName: 'Breakroom West',
    description: 'Shared kitchen and lounge area.',
    inspectionSettings: 'Joint inspection required twice weekly',
    serviceLogging: 'QR + mobile fallback',
  },
];

export const mockInspections: Inspection[] = [
  {
    id: 'insp_1',
    siteId: 'site_1',
    inspectorName: 'Ariana Lopez',
    inspectorAvatar: 'AL',
    timestamp: '2026-03-11T08:20:00.000Z',
    buildingName: 'Learning Commons',
    spacesInspected: 6,
    score: 4.2,
    baseline: true,
    jointInspection: false,
    rooms: [
      {
        id: 'room_1',
        name: 'Main Lobby',
        score: 4.4,
        photoCount: 2,
        commentCount: 1,
        items: [
          {
            id: 'it_1',
            roomId: 'room_1',
            name: 'Glass surfaces',
            status: 'pass',
            aboveAndBeyond: true,
            photoCount: 1,
            commentCount: 0,
          },
          {
            id: 'it_2',
            roomId: 'room_1',
            name: 'Floor corners',
            status: 'fail',
            reason: 'Smudges',
            aboveAndBeyond: false,
            photoCount: 1,
            commentCount: 1,
            notes: 'Smudges near south entry',
          },
        ],
      },
      {
        id: 'room_2',
        name: 'Conference Cedar',
        score: 4,
        photoCount: 0,
        commentCount: 2,
        items: [],
      },
    ],
    comments: ['High traffic improved after midday touchpoint.'],
    photos: ['lobby_1.jpg', 'lobby_2.jpg'],
    notes: 'Escalate repeat streaking near elevator.',
  },
  {
    id: 'insp_2',
    siteId: 'site_2',
    inspectorName: 'Brandon Dastrup',
    inspectorAvatar: 'BF',
    timestamp: '2026-03-10T16:05:00.000Z',
    buildingName: 'Downtown Hall',
    spacesInspected: 4,
    score: 3.8,
    baseline: false,
    jointInspection: true,
    rooms: [
      {
        id: 'room_3',
        name: 'Breakroom West',
        score: 3.6,
        photoCount: 1,
        commentCount: 1,
        items: [],
      },
    ],
    comments: ['Joint walk with facilities director complete.'],
    photos: ['breakroom_1.jpg'],
  },
];

export const mockWorkItems: WorkItem[] = [
  {
    id: 'work_1',
    title: 'Deep-clean elevator panels',
    siteId: 'site_1',
    siteName: 'Estrella Community College',
    space: 'Learning Commons - Elevator 2',
    assignee: 'Sam Reed',
    dueDate: '2026-03-12',
    status: 'Open',
    priority: 'High',
    notes: 'Follow-up from inspection fail reason.',
    photos: ['elevator_panel.jpg'],
    comments: ['Noticed fingerprints on chrome rails.'],
    history: ['Created by Ariana Lopez on Mar 10'],
  },
  {
    id: 'work_2',
    title: 'Restock sanitizer stations',
    siteId: 'site_1',
    siteName: 'Estrella Community College',
    space: 'Learning Commons - Lobby',
    assignee: 'Nina Patel',
    dueDate: '2026-03-09',
    status: 'Overdue',
    priority: 'Critical',
    notes: 'Client escalated',
    photos: ['station_refill.jpg'],
    comments: ['Refill delayed due to supplier delivery.'],
    history: ['Escalated by Operations on Mar 9'],
  },
  {
    id: 'work_3',
    title: 'Polish conference room glass',
    siteId: 'site_2',
    siteName: 'ASU Downtown',
    space: 'Downtown Hall - Conference 3B',
    assignee: 'Liam Brooks',
    dueDate: '2026-03-13',
    status: 'Closed',
    priority: 'Medium',
    notes: 'Completed during evening shift.',
    photos: ['glass_done.jpg'],
    comments: ['Completed and verified by supervisor.'],
    history: ['Closed by Liam Brooks on Mar 11'],
  },
];

export const mockCases: CaseRecord[] = [
  {
    id: 'case_1',
    title: 'Slip hazard near west entry',
    type: 'Safety Concern',
    siteId: 'site_1',
    siteName: 'Estrella Community College',
    status: 'In Review',
    owner: 'Melissa Grant',
    createdAt: '2026-03-10T14:10:00.000Z',
    comments: ['Area cordoned and drying signs posted.'],
    attachments: ['floor_photo_0310.jpg'],
    auditHistory: ['Case opened', 'Assigned to safety lead'],
  },
  {
    id: 'case_2',
    title: 'Positive feedback for overnight crew',
    type: 'Compliment',
    siteId: 'site_2',
    siteName: 'ASU Downtown',
    status: 'Resolved',
    owner: 'Brandon Dastrup',
    createdAt: '2026-03-09T09:30:00.000Z',
    comments: ['Forwarded to team recognition board.'],
    attachments: [],
    auditHistory: ['Case opened', 'Marked resolved'],
  },
  {
    id: 'case_3',
    title: 'Request: add afternoon touchpoint',
    type: 'Service Request',
    siteId: 'site_1',
    siteName: 'Estrella Community College',
    status: 'New',
    owner: 'Unassigned',
    createdAt: '2026-03-11T10:25:00.000Z',
    comments: ['Client asked for additional midday sweep.'],
    attachments: ['email_thread.msg'],
    auditHistory: ['Case opened'],
  },
];

export const mockEmployees: Employee[] = [
  {
    id: 'emp_1',
    name: 'Ariana Lopez',
    role: 'Quality Manager',
    sites: ['Estrella Community College', 'ASU Downtown'],
    trainingStatus: 'Current',
    assignedSites: ['Estrella Community College', 'ASU Downtown'],
    trainingTranscript: ['Safety Refresher - Jan 2026', 'Joint Inspection Coach - Feb 2026'],
    inspectionActivity: '18 inspections this month',
  },
  {
    id: 'emp_2',
    name: 'Sam Reed',
    role: 'Shift Supervisor',
    sites: ['ASU Mesa Polytechnic'],
    trainingStatus: 'Due Soon',
    assignedSites: ['ASU Mesa Polytechnic'],
    trainingTranscript: ['Hazmat Basics - Jul 2025'],
    inspectionActivity: '11 inspections this month',
  },
  {
    id: 'emp_3',
    name: 'Nina Patel',
    role: 'Facilities Specialist',
    sites: ['City of Carson'],
    trainingStatus: 'Overdue',
    assignedSites: ['City of Carson'],
    trainingTranscript: ['Equipment Safety - Apr 2025'],
    inspectionActivity: '6 inspections this month',
  },
];

export const mockTrainingCourses: TrainingCourse[] = [
  { id: 'course_1', title: 'Inspection Foundations', category: 'Quality', duration: '2h' },
  { id: 'course_2', title: 'Incident Intake Procedures', category: 'Safety', duration: '90m' },
  { id: 'course_3', title: 'Service Coverage Logging', category: 'Operations', duration: '75m' },
];

export const mockTrainingSessions: TrainingSession[] = [
  { id: 'session_1', courseId: 'course_1', instructor: 'Ariana Lopez', date: '2026-03-18', attendees: 22 },
  { id: 'session_2', courseId: 'course_2', instructor: 'Melissa Grant', date: '2026-03-21', attendees: 14 },
];

export const mockSurveys: Survey[] = [
  {
    id: 'survey_1',
    type: 'Employee',
    title: 'Quarterly Team Sentiment',
    participationRate: 82,
    score: 4.1,
    comments: ['Need better late-shift supply handoff', 'Training sessions are helpful'],
  },
  {
    id: 'survey_2',
    type: 'Customer',
    title: 'Client Satisfaction Pulse',
    participationRate: 68,
    score: 4.3,
    comments: ['Restrooms improved significantly this quarter'],
  },
];

export const mockDocuments: DocumentRecord[] = [
  { id: 'doc_1', type: 'SOW', title: 'Estrella Main SOW', siteId: 'site_1', updatedAt: '2026-02-20' },
  { id: 'doc_2', type: 'Addenda', title: 'ASU Downtown Addendum A', siteId: 'site_2', updatedAt: '2026-03-02' },
  { id: 'doc_3', type: 'MSA', title: 'Regional MSA 2026', siteId: 'site_1', updatedAt: '2026-01-10' },
];

export const mockCoverageLogs: ServiceCoverageLog[] = [
  {
    id: 'scan_1',
    siteId: 'site_1',
    spaceName: 'Main Lobby',
    frequency: 'Daily',
    completion: 93,
    lastScanAt: '2026-03-11T07:55:00.000Z',
  },
  {
    id: 'scan_2',
    siteId: 'site_1',
    spaceName: 'Breakroom West',
    frequency: 'Weekly',
    completion: 76,
    lastScanAt: '2026-03-10T18:15:00.000Z',
  },
];

export const mockDashboardBySite: Record<string, DashboardMetrics> = {
  site_1: {
    sageScore: 84,
    suggestions: ['Increase hallway spot checks after lunch rush', 'Escalate recurring glass touch-up in Learning Commons'],
    workItemAgingAlert: '3 high-priority work items over 48 hours',
    inspectionCoverage: 91,
    jointCoverage: 62,
    inspectionTrend: 5,
  },
  site_2: {
    sageScore: 79,
    suggestions: ['Adjust staffing in atrium between 3-5 PM'],
    workItemAgingAlert: '1 overdue work item',
    inspectionCoverage: 87,
    jointCoverage: 49,
    inspectionTrend: 2,
  },
  site_3: {
    sageScore: 82,
    suggestions: ['Improve pantry wipe-down consistency'],
    workItemAgingAlert: 'No critical aging items',
    inspectionCoverage: 89,
    jointCoverage: 55,
    inspectionTrend: 4,
  },
};

const defaultAnalytics: AnalyticsPayload = {
  inspectionScoreTrends: [
    { label: 'W1', value: 78 },
    { label: 'W2', value: 80 },
    { label: 'W3', value: 82 },
    { label: 'W4', value: 84 },
    { label: 'W5', value: 83 },
  ],
  workItemAging: [
    { label: '0-2d', value: 12 },
    { label: '3-5d', value: 6 },
    { label: '6+d', value: 3 },
  ],
  serviceCoverage: [
    { label: 'Lobby', value: 93 },
    { label: 'Breakroom', value: 76 },
    { label: 'Conference', value: 88 },
  ],
  incidents: [
    { label: 'Jan', value: 8 },
    { label: 'Feb', value: 6 },
    { label: 'Mar', value: 5 },
  ],
  complaints: [
    { label: 'Jan', value: 11 },
    { label: 'Feb', value: 9 },
    { label: 'Mar', value: 7 },
  ],
  surveys: [
    { label: 'Employee', value: 82 },
    { label: 'Customer', value: 68 },
  ],
  budgets: [
    { label: 'Labor', value: 92 },
    { label: 'Supplies', value: 81 },
    { label: 'Equipment', value: 74 },
  ],
};

export const mockAnalyticsBySite: Record<string, AnalyticsPayload> = {
  site_1: defaultAnalytics,
  site_2: defaultAnalytics,
  site_3: defaultAnalytics,
  site_4: defaultAnalytics,
  site_5: defaultAnalytics,
  site_6: defaultAnalytics,
};

export const baseSiteConfig: SiteConfig[] = mockSites.map((site) => ({
  site,
  buildings: mockBuildings.filter((building) => building.siteId === site.id),
  floors: mockFloors.filter((floor) =>
    mockBuildings.some((building) => building.id === floor.buildingId && building.siteId === site.id),
  ),
  spaceTypes: mockSpaceTypes,
  spaces: mockSpaces.filter((space) =>
    mockFloors.some(
      (floor) => floor.id === space.floorId && mockBuildings.some((building) => building.id === floor.buildingId && building.siteId === site.id),
    ),
  ),
}));
