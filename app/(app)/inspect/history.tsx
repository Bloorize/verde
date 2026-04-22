import { useQuery } from '@tanstack/react-query';
import { Text, View } from 'react-native';

import { Card } from '@/src/components/ui/Card';
import { PageScaffold } from '@/src/components/shell/PageScaffold';
import { mockSupabase } from '@/src/lib/mockSupabase';
import { queryKeys } from '@/src/lib/queryKeys';
import { useAppStore } from '@/src/store/appStore';
import { formatTimestamp } from '@/src/utils/format';

export default function InspectionHistoryScreen() {
  const selectedSiteId = useAppStore((state) => state.selectedSiteId);
  const inspectionsQuery = useQuery({
    queryKey: queryKeys.inspections(selectedSiteId),
    queryFn: async () => (await mockSupabase.listInspections(selectedSiteId)).data,
  });

  return (
    <PageScaffold title="Inspection History" description="Historical inspection records with trend context.">
      <Card>
        {inspectionsQuery.data?.map((item) => (
          <View key={item.id} className="mb-2 rounded-md bg-slate-50 px-3 py-2">
            <Text className="text-sm font-semibold text-slate-900">{item.buildingName}</Text>
            <Text className="text-xs text-slate-500">{formatTimestamp(item.timestamp)}</Text>
            <Text className="text-xs text-slate-700">Score: {item.score.toFixed(1)}</Text>
          </View>
        ))}
      </Card>
    </PageScaffold>
  );
}
