import { WorkItemList } from '@/src/components/modules/WorkItemList';
import { PageScaffold } from '@/src/components/shell/PageScaffold';

export default function OverdueWorkItemsScreen() {
  return (
    <PageScaffold title="Overdue Work Items" description="Items beyond due date requiring escalation.">
      <WorkItemList filter="Overdue" />
    </PageScaffold>
  );
}
