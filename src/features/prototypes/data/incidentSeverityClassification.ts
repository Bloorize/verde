export const incidentSeverityClassification = {
  headerTitle: 'Incident Severity Classification',
  headerSubtitle: 'Phoenix Medical Center - April 18, 2026',
  scoreBadge: 'High',
  summaryTitle: 'Incident summary',
  incidentIdLabel: 'Incident ID',
  incidentId: 'INC-2408',
  locationLabel: 'Location',
  location: 'Phoenix Medical Center - Loading Dock',
  reportedByLabel: 'Reported by',
  reportedBy: 'Evening supervisor at 6:42 PM',
  severityTitle: 'Severity explanation',
  severityLabel: 'High severity',
  severitySummary:
    'The spill reached a staff access path, created an immediate slip hazard, and required a temporary area closure while cleanup and root-cause checks were completed.',
  severityContext:
    'No injury was reported, but the combination of employee exposure, interrupted dock traffic, and repeat moisture in the same zone pushes this above a routine cleanup miss.',
  nextActionsTitle: 'Next actions',
  nextActionsIntro: 'Use the next response window to close immediate risk and prevent recurrence.',
  nextActions: [
    'Dispatch the evening engineering lead to inspect the drain cover assembly.',
    'Document the closure timeline and cleanup completion in the supervisor handoff.',
    'Schedule a 48-hour follow-up check after the next dock wash-down cycle.',
  ],
} as const;
