import { AnalyticsPanel } from '@/src/components/modules/AnalyticsPanel';
import { PageScaffold } from '@/src/components/shell/PageScaffold';

export default function AnalyticsServiceCoverageScreen() {
  return (
    <PageScaffold title="Service Coverage Analytics" description="Frequency completion and scan performance trends.">
      <AnalyticsPanel metric="serviceCoverage" />
    </PageScaffold>
  );
}
