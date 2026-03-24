import { AnalyticsPanel } from '@/src/components/modules/AnalyticsPanel';
import { PageScaffold } from '@/src/components/shell/PageScaffold';

export default function AnalyticsBudgetsScreen() {
  return (
    <PageScaffold title="Budget Analytics" description="Budget utilization and variance trends.">
      <AnalyticsPanel metric="budgets" />
    </PageScaffold>
  );
}
