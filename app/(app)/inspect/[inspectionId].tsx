import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Card } from '@/src/components/ui/Card';
import { ScorePill } from '@/src/components/ui/ScorePill';
import { PageScaffold } from '@/src/components/shell/PageScaffold';
import { mockSupabase } from '@/src/lib/mockSupabase';
import { queryKeys } from '@/src/lib/queryKeys';
import { translateInspection } from '@/src/lib/translation/translateRecords';
import { useAppStore } from '@/src/store/appStore';
import { formatTimestamp } from '@/src/utils/format';

export default function InspectionDetailScreen() {
  const { t } = useTranslation();
  const { inspectionId } = useLocalSearchParams<{ inspectionId: string }>();
  const language = useAppStore((state) => state.language);

  const inspectionQuery = useQuery({
    queryKey: queryKeys.inspection(inspectionId, language),
    queryFn: async () => {
      const inspection = await mockSupabase.getInspection(inspectionId);
      return inspection ? translateInspection(inspection, language) : undefined;
    },
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
            <Text className="text-sm text-slate-700">{t('Building')}: {inspection.buildingName}</Text>
            <Text className="text-sm text-slate-700">{t('Baseline')}: {inspection.baseline ? t('Yes') : t('No')}</Text>
            <Text className="text-sm text-slate-700">
              {t('Joint inspection')}: {inspection.jointInspection ? t('Yes') : t('No')}
            </Text>
            <Text className="text-sm text-slate-700">{t('Inspected spaces')}: {inspection.spacesInspected}</Text>
          </Card>

          <Card>
            <Text className="mb-2 text-base font-semibold text-slate-900">{t('Rooms')}</Text>
            {inspection.rooms.map((room) => (
              <View key={room.id} className="mb-2 rounded-xl bg-slate-50 px-3 py-2">
                <Text className="text-sm font-semibold text-slate-800">{room.name}</Text>
                <Text className="text-xs text-slate-500">
                  {t('Score')} {room.score.toFixed(1)} • {t('Photos')} {room.photoCount} • {t('Comments')} {room.commentCount}
                </Text>
              </View>
            ))}
          </Card>

          <Card>
            <Text className="mb-2 text-base font-semibold text-slate-900">{t('Actions')}</Text>
            <View className="flex-row flex-wrap gap-2">
              {['Download', 'Print', 'Edit', 'Delete'].map((action) => (
                <Pressable key={action} className="rounded-xl border border-brand-200 bg-brand-50 px-3 py-2">
                  <Text className="text-xs font-semibold text-brand-700">{t(action)}</Text>
                </Pressable>
              ))}
            </View>
          </Card>
        </>
      ) : null}
    </PageScaffold>
  );
}
