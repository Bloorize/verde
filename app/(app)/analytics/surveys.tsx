import { AnalyticsPanel } from '@/src/components/modules/AnalyticsPanel';
import { PageScaffold } from '@/src/components/shell/PageScaffold';

export default function AnalyticsSurveysScreen() {
  return (
    <PageScaffold title="Survey Analytics" description="Employee and customer survey participation and scores.">
      <AnalyticsPanel metric="surveys" />
    </PageScaffold>
  );
}
