import { AnalyticsPanel } from '@/src/components/modules/AnalyticsPanel';
import { PageScaffold } from '@/src/components/shell/PageScaffold';

export default function AnalyticsCatchesScreen() {
  return (
    <PageScaffold
      title="Catches Analytics"
      description="Complaints, compliments, and facility catch volume over time."
    >
      <AnalyticsPanel metric="complaints" />
    </PageScaffold>
  );
}
