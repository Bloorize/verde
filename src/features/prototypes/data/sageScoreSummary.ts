export const sageScoreSummary = {
  headerTitle: 'Sage Score Summary',
  headerSubtitle: 'Southwest Region - March 2026',
  scoreTitle: 'Overall score',
  scoreValue: '87',
  scoreTrend: '+2 vs last month',
  scoreContext: 'Average performance across three active demo sites.',
  metrics: [
    {
      label: 'Inspection coverage',
      value: '87%',
      note: 'Regional average this month',
    },
    {
      label: 'Overdue items',
      value: '2',
      note: 'Both tied to one site',
    },
    {
      label: 'Open safety incidents',
      value: '1',
      note: 'Still under review',
    },
  ],
  highlightsTitle: 'Regional highlights',
  highlights: [
    'Estrella Community College stayed strong with 94% inspection coverage and no overdue work.',
    'ASU Downtown remains the main drag on the regional score because two work items are still overdue.',
    'Palm Springs Medical improved after clearing its Q1 backlog, but one restroom issue still needs preventive planning.',
  ],
  narrativeTitle: 'Narrative summary',
  narrative:
    'The region ended the month stronger overall, but the score is still being held back by unresolved follow-up work at ASU Downtown. The cleanest next gain is to close overdue items there while keeping Palm Springs on its preventive maintenance plan.',
} as const;
