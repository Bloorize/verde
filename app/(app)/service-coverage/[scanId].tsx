import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';

import { Card } from '@/src/components/ui/Card';
import { PageScaffold } from '@/src/components/shell/PageScaffold';
import { mockSupabase } from '@/src/lib/mockSupabase';
import { queryKeys } from '@/src/lib/queryKeys';

export default function CoverageScanDetailScreen() {
  const { scanId } = useLocalSearchParams<{ scanId: string }>();
  const query = useQuery({ queryKey: queryKeys.coverageLog(scanId), queryFn: () => mockSupabase.getCoverageLog(scanId), enabled: Boolean(scanId) });
  const scan = query.data;

  return (
    <PageScaffold title="Coverage Scan Detail" description="Service log detail for frequency completion tracking.">
      {scan ? (
        <Card>
          <Text className="text-lg font-bold text-slate-900">{scan.spaceName}</Text>
          <Text className="text-sm text-slate-600">Frequency: {scan.frequency}</Text>
          <Text className="text-sm text-slate-600">Completion: {scan.completion}%</Text>
          <Text className="text-sm text-slate-600">Last scan: {scan.lastScanAt}</Text>
        </Card>
      ) : null}
    </PageScaffold>
  );
}
