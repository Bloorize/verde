export const sageScoreSummary = {
  slideKicker: 'HeySage - Regional Manager',
  slideTitle: 'SAGE Score Natural Language Summary',
  slideSubtitle:
    'Instead of just a number, AI explains exactly why each site scored the way it did - in plain English.',
  url: 'app.heysage.com/home',
  siteSelector: 'All Sites - Southwest Region',
  refreshLabel: 'Refresh insights',
  pageTitle: 'Regional Dashboard',
  pageSubtitle: 'Southwest Region - March 2026',
  sidebarItems: [
    { id: 'home', label: 'Home', active: true },
    { id: 'inspections', label: 'Inspections' },
    { id: 'work-items', label: 'Work Items' },
    { id: 'reports', label: 'Reports' },
    { id: 'settings', label: 'Settings' },
  ],
  cards: [
    {
      id: 'estrella',
      siteName: 'Estrella Community College',
      score: '88',
      scoreTone: 'green',
      trendDirection: 'up',
      trendValue: '+3',
      summary:
        'Inspection coverage is strong at 94% and all work items are current. Daily lobby touchpoints are driving consistent scores across high-traffic areas.',
      details: [
        { value: '94%', label: 'Inspection Coverage' },
        { value: '0', label: 'Overdue Items' },
        { value: '0', label: 'Safety Incidents' },
      ],
    },
    {
      id: 'asu',
      siteName: 'ASU Downtown',
      score: '72',
      scoreTone: 'amber',
      trendDirection: 'down',
      trendValue: '-5',
      summary:
        'Joint inspection frequency is below the monthly target and a safety incident from last week is still in review. Two overdue work items in Building B are pulling the score down.',
      details: [
        { value: '76%', label: 'Inspection Coverage' },
        { value: '2', label: 'Overdue Items', valueTone: 'amber' },
        { value: '1', label: 'Safety Incidents', valueTone: 'red' },
      ],
    },
    {
      id: 'palmsprings',
      siteName: 'Palm Springs Medical',
      score: '81',
      scoreTone: 'amber',
      trendDirection: 'up',
      trendValue: '+1',
      summary:
        'Steady improvement driven by resolved backlog in Q1. One recurring grout issue in the east wing restrooms needs a preventive maintenance plan.',
      details: [
        { value: '91%', label: 'Inspection Coverage' },
        { value: '0', label: 'Overdue Items' },
        { value: '0', label: 'Safety Incidents' },
      ],
    },
  ],
  viewDetailsLabel: 'View details ->',
  sageChipLabel: 'SAGE',
  regionalSummaryLabel: 'Regional Summary',
  regionalSummaryText:
    'Across all 3 sites, inspection coverage averaged 87% this month. ASU Downtown needs immediate attention on overdue work items and the open safety incident.',
} as const;
