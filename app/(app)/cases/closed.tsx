import { CaseList } from '@/src/components/modules/CaseList';
import { PageScaffold } from '@/src/components/shell/PageScaffold';

export default function ClosedCasesScreen() {
  return (
    <PageScaffold title="Closed Cases" description="Resolved and closed cases for audit history.">
      <CaseList status="closed" />
    </PageScaffold>
  );
}
