export type IncidentSeverityKey = 'firstaid' | 'recordable' | 'serious';

export const incidentSeverityClassification = {
  slideKicker: 'HeySage — EHS Function',
  slideTitle: 'Automated Incident Severity Classification',
  slideSubtitle:
    'When an incident is submitted, AI reads the description and suggests a severity level — helping EHS prioritize response immediately.',
  toggleOptions: ['Slip & Fall — Building A', 'Chemical Splash — Building C'],
  windowUrlPrefix: 'app.heysage.com/cases/',
  siteName: 'Estrella Community College',
  avatarInitials: 'TS',
  pageTitle: 'Incident Review',
  aiLabel: 'SAGE — Severity Classification',
  acceptLabel: 'Accept Classification',
  acceptedLabel: 'Accepted ✓',
  overrideLabel: 'Override',
  addNotesLabel: 'Add Notes',
  overrideOptions: [
    { label: 'First Aid', severity: 'firstaid' },
    { label: 'Recordable', severity: 'recordable' },
    { label: 'Serious', severity: 'serious' },
  ],
  incidents: [
    {
      caseId: 'INC-0891',
      toggleLabel: 'Slip & Fall — Building A',
      title: 'Slip and fall near loading dock — Building A',
      type: 'Safety Concern',
      status: 'New',
      submitter: 'Maria Santos',
      submitTime: 'Today, 10:23 AM',
      description:
        'Employee slipped on wet floor near the loading dock entrance. Reported knee pain and received ice pack from on-site first aid kit. Employee continued working after 15-minute rest.',
      severity: 'recordable' as IncidentSeverityKey,
      severityLabel: 'RECORDABLE',
      rationale:
        'Based on the description, this incident involved a slip and fall resulting in a knee injury that required first aid treatment. The employee continued working, but any injury requiring treatment beyond basic first aid is classified as Recordable under OSHA guidelines.',
      confidence: 92,
      confidenceText: 'Confidence: High (92%)',
      steps: [
        { text: 'First aid administered', done: true },
        { text: 'Supervisor notified', done: true },
        { text: 'Employee statement collected', done: true },
        { text: 'OSHA 300 log entry', done: false },
        { text: 'Follow-up within 24 hours', done: false },
        { text: 'Root cause investigation initiated', done: false },
      ],
    },
    {
      caseId: 'INC-0904',
      toggleLabel: 'Chemical Splash — Building C',
      title: 'Chemical splash near cleaning station — Building C',
      type: 'Hazardous Material',
      status: 'New',
      submitter: 'James Okafor',
      submitTime: 'Today, 11:47 AM',
      description:
        'Employee splashed diluted cleaning solution on forearm while refilling dispenser. Area was rinsed with water for 5 minutes at the eyewash station. No redness or irritation observed after rinsing. Employee returned to normal duties.',
      severity: 'firstaid' as IncidentSeverityKey,
      severityLabel: 'FIRST AID',
      rationale:
        'The incident involved minor skin contact with a diluted cleaning agent. The affected area was rinsed promptly and no lasting irritation was observed. Since the treatment consisted only of flushing with water — which qualifies as basic first aid — this does not meet the threshold for OSHA recordability.',
      confidence: 88,
      confidenceText: 'Confidence: High (88%)',
      steps: [
        { text: 'First aid administered', done: true },
        { text: 'Supervisor notified', done: true },
        { text: 'Employee statement collected', done: false },
        { text: 'SDS reviewed for chemical', done: true },
        { text: 'Follow-up within 24 hours', done: false },
        { text: 'Root cause investigation initiated', done: false },
      ],
    },
  ],
} as const;
