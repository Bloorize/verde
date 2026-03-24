import { WorkItemList } from '@/src/components/modules/WorkItemList';
import { PageScaffold } from '@/src/components/shell/PageScaffold';

export default function OpenWorkItemsScreen() {
  return (
    <PageScaffold title="Open Work Items" description="Active work requiring completion.">
      <WorkItemList filter="Open" />
    </PageScaffold>
  );
}
