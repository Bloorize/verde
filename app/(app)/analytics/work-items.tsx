import { AnalyticsPanel } from '@/src/components/modules/AnalyticsPanel';
import { PageScaffold } from '@/src/components/shell/PageScaffold';

export default function AnalyticsWorkItemsScreen() {
  return (
    <PageScaffold title="Work Item Analytics" description="Aging, closure pace, and backlog analysis.">
      <AnalyticsPanel metric="workItemAging" />
    </PageScaffold>
  );
}
