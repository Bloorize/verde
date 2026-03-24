import { WorkItemList } from '@/src/components/modules/WorkItemList';
import { PageScaffold } from '@/src/components/shell/PageScaffold';

export default function MyWorkItemsScreen() {
  return (
    <PageScaffold title="My Work Items" description="Items assigned to the current user.">
      <WorkItemList filter="Mine" />
    </PageScaffold>
  );
}
