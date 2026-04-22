export const customerPerformanceSummary = {
  headerTitle: 'Customer Performance Summary',
  headerSubtitle: 'Palm Springs Medical - April 2026',
  overviewTitle: 'Performance overview',
  overviewValue: '96%',
  overviewLabel: 'Inspection completion',
  overviewContext: 'Average completion rate across all scheduled inspections this month.',
  metrics: [
    {
      label: 'Repeat issues',
      value: '3',
      note: 'Down from 7 last month',
    },
    {
      label: '24-hour closure rate',
      value: '91%',
      note: 'Faster follow-through on visible items',
    },
  ],
  highlightsTitle: 'Customer-facing highlights',
  highlights: [
    'Day porter coverage at the visitor lobby held above target for the full month, reducing visible touch-up requests during peak hours.',
    'Restroom inspection misses dropped after the revised stocking checklist was introduced on the second floor.',
    'Open follow-up items were reviewed with site leadership weekly, which shortened the time between finding an issue and confirming it was closed.',
  ],
  summaryTitle: 'Suggested share-out',
  summaryText:
    'Performance remained stable in the most visible public areas, with faster issue closure and fewer repeat cleaning misses than last month.',
} as const;
