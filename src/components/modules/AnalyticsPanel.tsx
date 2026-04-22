import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Text } from 'react-native';

import { EChart } from '@/src/components/charts/EChart';
import { buildBarOption, buildLineOption } from '@/src/components/charts/echartOptions';
import { Card } from '@/src/components/ui/Card';
import { mockSupabase } from '@/src/lib/mockSupabase';
import { queryKeys } from '@/src/lib/queryKeys';
import { translateAnalyticsPayload } from '@/src/lib/translation/translateRecords';
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
  const { t } = useTranslation();
  const selectedSiteId = useAppStore((state) => state.selectedSiteId);
  const language = useAppStore((state) => state.language);
  const query = useQuery({
    queryKey: queryKeys.analytics(selectedSiteId, language),
    queryFn: async () => translateAnalyticsPayload(await mockSupabase.getAnalyticsSeries(selectedSiteId), language),
  });

  const data = query.data?.[metric] ?? [];
  const isLine = metric === 'inspectionScoreTrends';

  return (
    <Card>
      <Text className="mb-3 text-base font-semibold text-slate-900">{title ? t(title) : t(metricLabels[metric])}</Text>
      {data.length > 0 ? (
        <EChart option={isLine ? buildLineOption(data, '#2f7a58') : buildBarOption(data, '#2f7a58')} height={220} />
      ) : (
        <Text className="text-sm text-slate-500">{t('No data available for this metric.')}</Text>
      )}
    </Card>
  );
};
