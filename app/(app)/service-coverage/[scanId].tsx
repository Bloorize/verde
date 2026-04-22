import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Card } from '@/src/components/ui/Card';
import { PageScaffold } from '@/src/components/shell/PageScaffold';
import { mockSupabase } from '@/src/lib/mockSupabase';
import { queryKeys } from '@/src/lib/queryKeys';
import { translateCoverageLog } from '@/src/lib/translation/translateRecords';
import { useAppStore } from '@/src/store/appStore';
import { formatTimestamp } from '@/src/utils/format';

export default function CoverageScanDetailScreen() {
  const { t } = useTranslation();
  const { scanId } = useLocalSearchParams<{ scanId: string }>();
  const language = useAppStore((state) => state.language);
  const query = useQuery({
    queryKey: queryKeys.coverageLog(scanId, language),
    queryFn: async () => {
      const coverageLog = await mockSupabase.getCoverageLog(scanId);
      return coverageLog ? translateCoverageLog(coverageLog, language) : undefined;
    },
    enabled: Boolean(scanId),
  });
  const scan = query.data;

  return (
    <PageScaffold title="Coverage Scan Detail" description="Service log detail for frequency completion tracking.">
      {scan ? (
        <Card>
          <Text className="text-lg font-bold text-slate-900">{scan.spaceName}</Text>
          <Text className="text-sm text-slate-600">{t('Frequency')}: {scan.frequency}</Text>
          <Text className="text-sm text-slate-600">{t('Completion')}: {scan.completion}%</Text>
          <Text className="text-sm text-slate-600">{t('Last scan')}: {formatTimestamp(scan.lastScanAt, language)}</Text>
        </Card>
      ) : null}
    </PageScaffold>
  );
}
