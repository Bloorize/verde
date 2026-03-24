import { WorkItemList } from '@/src/components/modules/WorkItemList';
import { PageScaffold } from '@/src/components/shell/PageScaffold';

export default function ClosedWorkItemsScreen() {
  return (
    <PageScaffold title="Closed Work Items" description="Completed and verified actions.">
      <WorkItemList filter="Closed" />
    </PageScaffold>
  );
}
