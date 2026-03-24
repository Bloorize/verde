import { AnalyticsPanel } from '@/src/components/modules/AnalyticsPanel';
import { PageScaffold } from '@/src/components/shell/PageScaffold';

export default function AnalyticsInspectionsScreen() {
  return (
    <PageScaffold title="Inspection Analytics" description="Inspection score trends and quality movement.">
      <AnalyticsPanel metric="inspectionScoreTrends" />
    </PageScaffold>
  );
}
