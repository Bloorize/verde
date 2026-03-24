import { AnalyticsPanel } from '@/src/components/modules/AnalyticsPanel';
import { RouteLinks } from '@/src/components/modules/RouteLinks';
import { PageScaffold } from '@/src/components/shell/PageScaffold';
import { AnalyticsOverviewActivity } from '@/src/components/analytics/AnalyticsOverviewActivity';

export default function AnalyticsIndexScreen() {
  return (
    <PageScaffold title="Analytics" description="Inspection and service performance trends.">
      <AnalyticsOverviewActivity />

      <RouteLinks
        title="Analytics Views"
        links={[
          { href: '/analytics/inspections', label: 'Inspection Trends' },
          { href: '/analytics/work-items', label: 'Work Item Aging' },
          { href: '/analytics/service-coverage', label: 'Service Coverage' },
          { href: '/analytics/incidents', label: 'Incidents' },
          { href: '/analytics/catches', label: 'Catches / Complaints' },
          { href: '/analytics/surveys', label: 'Surveys' },
          { href: '/analytics/budgets', label: 'Budgets' },
          { href: '/analytics/site-rollup', label: 'Site Rollup' },
          { href: '/analytics/manager-rollup', label: 'Manager Rollup' },
          { href: '/analytics/region-rollup', label: 'Region Rollup' },
        ]}
      />

      <AnalyticsPanel metric="inspectionScoreTrends" title="Inspection Score Trend" />
      <AnalyticsPanel metric="workItemAging" title="Work Item Aging Snapshot" />
    </PageScaffold>
  );
}
