import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { View } from 'react-native';

import { InspectionCard } from '@/src/components/inspection/InspectionCard';
import { PageScaffold } from '@/src/components/shell/PageScaffold';
import { mockSupabase } from '@/src/lib/mockSupabase';
import { queryKeys } from '@/src/lib/queryKeys';
import { useAppStore } from '@/src/store/appStore';

export default function InspectionFeedScreen() {
  const router = useRouter();
  const selectedSiteId = useAppStore((state) => state.selectedSiteId);

  const inspectionsQuery = useQuery({
    queryKey: queryKeys.inspections(selectedSiteId),
    queryFn: async () => (await mockSupabase.listInspections(selectedSiteId)).data,
  });

  return (
    <PageScaffold title="Inspection Feed" description="Latest inspections for the selected site.">
      <View className="gap-3">
        {inspectionsQuery.data?.map((inspection) => (
          <InspectionCard key={inspection.id} inspection={inspection} onPress={() => router.push(`/inspect/${inspection.id}`)} />
        ))}
      </View>
    </PageScaffold>
  );
}
