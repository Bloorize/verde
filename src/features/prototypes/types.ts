export const prototypeRoutes = [
  '/prototypes/plain-language-work-item',
  '/prototypes/ai-inspection-comments',
  '/prototypes/sage-score-summary',
  '/prototypes/incident-severity-classification',
  '/prototypes/monthly-operational-narrative',
  '/prototypes/customer-performance-summary',
] as const;

const prototypesRoutePrefix = '/prototypes/' as const;

export const prototypeScreenNames = prototypeRoutes.map((route) =>
  route.slice(prototypesRoutePrefix.length),
) as readonly string[];

export const [
  plainLanguageWorkItemRoute,
  aiInspectionCommentsRoute,
  sageScoreSummaryRoute,
  incidentSeverityClassificationRoute,
  monthlyOperationalNarrativeRoute,
  customerPerformanceSummaryRoute,
] = prototypeRoutes;

export type PrototypeRoute = (typeof prototypeRoutes)[number];

export interface PrototypeCatalogItem {
  id: string;
  title: string;
  description: string;
  route: PrototypeRoute;
}
