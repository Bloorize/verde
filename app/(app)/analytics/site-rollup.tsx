import { AnalyticsPanel } from '@/src/components/modules/AnalyticsPanel';
import { PageScaffold } from '@/src/components/shell/PageScaffold';

export default function SiteRollupScreen() {
  return (
    <PageScaffold title="Site Rollup" description="Cross-site service and coverage KPIs for the selected account scope.">
      <AnalyticsPanel metric="serviceCoverage" />
    </PageScaffold>
  );
}
