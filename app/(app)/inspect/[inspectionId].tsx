import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { Card } from '@/src/components/ui/Card';
import { ScorePill } from '@/src/components/ui/ScorePill';
import { PageScaffold } from '@/src/components/shell/PageScaffold';
import { mockSupabase } from '@/src/lib/mockSupabase';
import { queryKeys } from '@/src/lib/queryKeys';
import { formatTimestamp } from '@/src/utils/format';

export default function InspectionDetailScreen() {
  const { inspectionId } = useLocalSearchParams<{ inspectionId: string }>();

  const inspectionQuery = useQuery({
    queryKey: queryKeys.inspection(inspectionId),
    queryFn: () => mockSupabase.getInspection(inspectionId),
    enabled: Boolean(inspectionId),
  });

  const inspection = inspectionQuery.data;

  return (
    <PageScaffold title="Inspection Detail" description="Inspection metadata, room outcomes, and follow-up actions.">
      {inspection ? (
        <>
          <Card>
            <View className="mb-2 flex-row items-center justify-between">
              <View>
                <Text className="text-base font-bold text-slate-900">{inspection.inspectorName}</Text>
                <Text className="text-xs text-slate-500">{formatTimestamp(inspection.timestamp)}</Text>
              </View>
              <ScorePill score={inspection.score} />
            </View>
            <Text className="text-sm text-slate-700">Building: {inspection.buildingName}</Text>
            <Text className="text-sm text-slate-700">Baseline: {inspection.baseline ? 'Yes' : 'No'}</Text>
            <Text className="text-sm text-slate-700">Joint inspection: {inspection.jointInspection ? 'Yes' : 'No'}</Text>
            <Text className="text-sm text-slate-700">Inspected spaces: {inspection.spacesInspected}</Text>
          </Card>

          <Card>
            <Text className="mb-2 text-base font-semibold text-slate-900">Rooms</Text>
            {inspection.rooms.map((room) => (
              <View key={room.id} className="mb-2 rounded-xl bg-slate-50 px-3 py-2">
                <Text className="text-sm font-semibold text-slate-800">{room.name}</Text>
                <Text className="text-xs text-slate-500">Score {room.score.toFixed(1)} • Photos {room.photoCount} • Comments {room.commentCount}</Text>
              </View>
            ))}
          </Card>

          <Card>
            <Text className="mb-2 text-base font-semibold text-slate-900">Actions</Text>
            <View className="flex-row flex-wrap gap-2">
              {['Download', 'Print', 'Edit', 'Delete'].map((action) => (
                <Pressable key={action} className="rounded-xl border border-brand-200 bg-brand-50 px-3 py-2">
                  <Text className="text-xs font-semibold text-brand-700">{action}</Text>
                </Pressable>
              ))}
            </View>
          </Card>
        </>
      ) : null}
    </PageScaffold>
  );
}
