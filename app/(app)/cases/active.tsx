import { CaseList } from '@/src/components/modules/CaseList';
import { PageScaffold } from '@/src/components/shell/PageScaffold';

export default function ActiveCasesScreen() {
  return (
    <PageScaffold title="Active Cases" description="Open and in-review cases requiring follow-up.">
      <CaseList status="active" />
    </PageScaffold>
  );
}
