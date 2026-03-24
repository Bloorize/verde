import { AnalyticsPanel } from '@/src/components/modules/AnalyticsPanel';
import { PageScaffold } from '@/src/components/shell/PageScaffold';

export default function AnalyticsIncidentsScreen() {
  return (
    <PageScaffold title="Incident Analytics" description="Incident count and severity trend view.">
      <AnalyticsPanel metric="incidents" />
    </PageScaffold>
  );
}
