import { AnalyticsPanel } from '@/src/components/modules/AnalyticsPanel';
import { PageScaffold } from '@/src/components/shell/PageScaffold';

export default function ManagerRollupScreen() {
  return (
    <PageScaffold title="Manager Rollup" description="Manager-level quality and throughput trends for assigned portfolios.">
      <AnalyticsPanel metric="inspectionScoreTrends" />
      <AnalyticsPanel metric="workItemAging" />
    </PageScaffold>
  );
}
