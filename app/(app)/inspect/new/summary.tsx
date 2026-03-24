import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { Pressable, Text } from 'react-native';

import { Card } from '@/src/components/ui/Card';
import { PageScaffold } from '@/src/components/shell/PageScaffold';
import { mockSupabase } from '@/src/lib/mockSupabase';
import { queryKeys } from '@/src/lib/queryKeys';
import { useAppStore } from '@/src/store/appStore';
import { averageScore } from '@/src/utils/score';

export default function InspectSummaryScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const selectedSiteId = useAppStore((state) => state.selectedSiteId);
  const currentUser = useAppStore((state) => state.currentUser);
  const { completedRooms, notes, baseline, jointInspection, inspectionDate, buildingId, resetDraft } = useAppStore();

  const siteConfigQuery = useQuery({
    queryKey: queryKeys.siteConfig(selectedSiteId),
    queryFn: () => mockSupabase.getSiteConfig(selectedSiteId),
  });

  const summaryStats = {
    avgScore: averageScore(completedRooms.map((room) => room.score)),
    failedItems: completedRooms.flatMap((room) => room.items).filter((item) => item.status === 'fail').length,
    starred: completedRooms.flatMap((room) => room.items).filter((item) => item.aboveAndBeyond).length,
  };

  const submitMutation = useMutation({
    mutationFn: async () => {
      const buildingName = siteConfigQuery.data?.buildings.find((building) => building.id === buildingId)?.name ?? 'Unknown Building';
      return mockSupabase.createInspection({
        id: 'temp',
        siteId: selectedSiteId,
        inspectorName: currentUser.name,
        inspectorAvatar: currentUser.avatar,
        timestamp: new Date(`${inspectionDate}T08:00:00.000Z`).toISOString(),
        buildingName,
        spacesInspected: completedRooms.length,
        score: summaryStats.avgScore,
        baseline,
        jointInspection,
        rooms: completedRooms.map((room) => ({
          id: room.id,
          name: room.name,
          score: room.score,
          photoCount: room.items.reduce((total, item) => total + item.photoCount, 0),
          commentCount: room.items.filter((item) => item.status === 'fail').length,
          items: room.items.map((item) => ({
            id: item.id,
            roomId: room.id,
            name: item.name,
            status: item.status === 'unset' ? 'fail' : item.status,
            aboveAndBeyond: item.aboveAndBeyond,
            reason: item.reason,
            photoCount: item.photoCount,
            commentCount: item.status === 'fail' ? 1 : 0,
          })),
        })),
        comments: notes ? [notes] : [],
        photos: [],
        notes,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.inspections(selectedSiteId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard(selectedSiteId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.analytics(selectedSiteId) });
      resetDraft();
      router.replace('/inspect/feed');
    },
  });

  return (
    <PageScaffold title="Step 5: Summary" description="Review final inspection totals and submit.">
      <Card>
        <Text className="text-sm text-slate-700">Rooms inspected: {completedRooms.length}</Text>
        <Text className="text-sm text-slate-700">Average score: {summaryStats.avgScore.toFixed(1)}</Text>
        <Text className="text-sm text-slate-700">Failed items: {summaryStats.failedItems}</Text>
        <Text className="text-sm text-slate-700">Starred items: {summaryStats.starred}</Text>

        <Pressable onPress={() => router.push('/inspect/new/work-item')} className="mt-3 rounded-xl border border-brand-200 bg-brand-50 py-2">
          <Text className="text-center text-sm font-semibold text-brand-700">Create Work Item from Failed Room</Text>
        </Pressable>

        <Pressable onPress={() => submitMutation.mutate()} disabled={completedRooms.length === 0} className={`mt-3 rounded-xl py-3 ${completedRooms.length > 0 ? 'bg-brand-700' : 'bg-slate-300'}`}>
          <Text className="text-center text-sm font-semibold text-white">Submit Inspection</Text>
        </Pressable>
      </Card>
    </PageScaffold>
  );
}
