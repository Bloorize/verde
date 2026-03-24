import { useQuery } from '@tanstack/react-query';
import { Text } from 'react-native';

import { EChart } from '@/src/components/charts/EChart';
import { buildBarOption, buildLineOption } from '@/src/components/charts/echartOptions';
import { Card } from '@/src/components/ui/Card';
import { mockSupabase } from '@/src/lib/mockSupabase';
import { queryKeys } from '@/src/lib/queryKeys';
import { useAppStore } from '@/src/store/appStore';

type AnalyticsMetric =
  | 'inspectionScoreTrends'
  | 'workItemAging'
  | 'serviceCoverage'
  | 'incidents'
  | 'complaints'
  | 'surveys'
  | 'budgets';

const metricLabels: Record<AnalyticsMetric, string> = {
  inspectionScoreTrends: 'Inspection Score Trends',
  workItemAging: 'Work Item Aging',
  serviceCoverage: 'Service Coverage',
  incidents: 'Incidents',
  complaints: 'Complaints and Catches',
  surveys: 'Survey Results',
  budgets: 'Budget Utilization',
};

export const AnalyticsPanel = ({ metric, title }: { metric: AnalyticsMetric; title?: string }) => {
  const selectedSiteId = useAppStore((state) => state.selectedSiteId);
  const query = useQuery({
    queryKey: queryKeys.analytics(selectedSiteId),
    queryFn: () => mockSupabase.getAnalyticsSeries(selectedSiteId),
  });

  const data = query.data?.[metric] ?? [];
  const isLine = metric === 'inspectionScoreTrends';

  return (
    <Card>
      <Text className="mb-3 text-base font-semibold text-slate-900">{title ?? metricLabels[metric]}</Text>
      {data.length > 0 ? (
        <EChart option={isLine ? buildLineOption(data, '#2f7a58') : buildBarOption(data, '#2f7a58')} height={220} />
      ) : (
        <Text className="text-sm text-slate-500">No data available for this metric.</Text>
      )}
    </Card>
  );
};
