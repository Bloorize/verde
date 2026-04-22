import {
  aiInspectionCommentsRoute,
  customerPerformanceSummaryRoute,
  incidentSeverityClassificationRoute,
  monthlyOperationalNarrativeRoute,
  plainLanguageWorkItemRoute,
  sageScoreSummaryRoute,
  type PrototypeRoute,
  type PrototypeCatalogItem,
} from '@/src/features/prototypes/types';

export const prototypeCatalog: PrototypeCatalogItem[] = [
  {
    id: 'plain-language-work-item',
    title: 'Plain-Language Work Item Translation',
    description: 'AI rewrites supervisor notes into worker-ready steps.',
    route: plainLanguageWorkItemRoute,
  },
  {
    id: 'ai-inspection-comments',
    title: 'AI Inspection Comments',
    description: 'Inspection findings rendered as clearer guided comments.',
    route: aiInspectionCommentsRoute,
  },
  {
    id: 'sage-score-summary',
    title: 'Sage Score Summary',
    description: 'Static summary view for site score storytelling.',
    route: sageScoreSummaryRoute,
  },
  {
    id: 'incident-severity-classification',
    title: 'Incident Severity Classification',
    description: 'Triage-style incident explanation and severity framing.',
    route: incidentSeverityClassificationRoute,
  },
  {
    id: 'monthly-operational-narrative',
    title: 'Monthly Operational Narrative',
    description: 'Narrative reporting screen for monthly performance context.',
    route: monthlyOperationalNarrativeRoute,
  },
  {
    id: 'customer-performance-summary',
    title: 'Customer Performance Summary',
    description: 'Customer-facing summary screen with static performance detail.',
    route: customerPerformanceSummaryRoute,
  },
];

export const getPrototypeRouteNeighbors = (route: PrototypeRoute) => {
  const currentIndex = prototypeCatalog.findIndex((item) => item.route === route);

  if (currentIndex === -1) {
    return {
      previous: undefined,
      next: undefined,
    };
  }

  return {
    previous: currentIndex > 0 ? prototypeCatalog[currentIndex - 1] : undefined,
    next: currentIndex < prototypeCatalog.length - 1 ? prototypeCatalog[currentIndex + 1] : undefined,
  };
};
