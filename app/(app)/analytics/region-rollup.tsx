import { AnalyticsPanel } from '@/src/components/modules/AnalyticsPanel';
import { PageScaffold } from '@/src/components/shell/PageScaffold';

export default function RegionRollupScreen() {
  return (
    <PageScaffold title="Region Rollup" description="Regional trend dashboard for operational leadership reviews.">
      <AnalyticsPanel metric="inspectionScoreTrends" />
      <AnalyticsPanel metric="serviceCoverage" />
      <AnalyticsPanel metric="incidents" />
    </PageScaffold>
  );
}
