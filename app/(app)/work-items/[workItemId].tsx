import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Badge } from '@/src/components/ui/Badge';
import { Card } from '@/src/components/ui/Card';
import { PageScaffold } from '@/src/components/shell/PageScaffold';
import { mockSupabase } from '@/src/lib/mockSupabase';
import { queryKeys } from '@/src/lib/queryKeys';
import { translateWorkItem } from '@/src/lib/translation/translateRecords';
import { useAppStore } from '@/src/store/appStore';

export default function WorkItemDetailScreen() {
  const { t } = useTranslation();
  const { workItemId } = useLocalSearchParams<{ workItemId: string }>();
  const queryClient = useQueryClient();
  const language = useAppStore((state) => state.language);

  const workItemQuery = useQuery({
    queryKey: queryKeys.workItem(workItemId, language),
    queryFn: async () => {
      const workItem = await mockSupabase.getWorkItem(workItemId);
      return workItem ? translateWorkItem(workItem, language) : undefined;
    },
    enabled: Boolean(workItemId),
  });

  const completeMutation = useMutation({
    mutationFn: () => mockSupabase.updateWorkItem(workItemId, { status: 'Closed' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.workItem(workItemId, language) });
      queryClient.invalidateQueries({ queryKey: ['work-items'] });
    },
  });

  const item = workItemQuery.data;

  return (
    <PageScaffold title="Work Item Detail" description="Photos, comments, history, and ownership actions.">
      {item ? (
        <>
          <Card>
            <Text className="text-lg font-bold text-slate-900">{item.title}</Text>
            <View className="mt-2 flex-row flex-wrap gap-2">
              <Badge label={item.status} tone={item.status === 'Closed' ? 'success' : item.status === 'Overdue' ? 'danger' : 'warning'} />
              <Badge label={item.priority} tone={item.priority === 'Critical' ? 'danger' : 'warning'} />
            </View>
            <Text className="mt-2 text-sm text-slate-700">{t('Assignee')}: {item.assignee}</Text>
            <Text className="text-sm text-slate-700">{t('Due')}: {item.dueDate}</Text>
            <Text className="text-sm text-slate-700">{t('Space')}: {item.space}</Text>
          </Card>

          <Card>
            <Text className="mb-1 text-base font-semibold text-slate-900">{t('Notes')}</Text>
            <Text className="text-sm text-slate-700">{item.notes}</Text>
          </Card>

          <Card>
            <Text className="mb-1 text-base font-semibold text-slate-900">{t('History')}</Text>
            {item.history.map((entry) => (
              <Text key={entry} className="text-sm text-slate-700">- {entry}</Text>
            ))}
          </Card>

          <Card>
            <Text className="mb-2 text-base font-semibold text-slate-900">{t('Actions')}</Text>
            <View className="flex-row flex-wrap gap-2">
              <Pressable className="rounded-xl border border-brand-200 bg-brand-50 px-3 py-2">
                <Text className="text-xs font-semibold text-brand-700">{t('Reassign')}</Text>
              </Pressable>
              <Pressable onPress={() => completeMutation.mutate()} className="rounded-xl bg-brand-600 px-3 py-2">
                <Text className="text-xs font-semibold text-white">{t('Mark Complete')}</Text>
              </Pressable>
            </View>
          </Card>
        </>
      ) : null}
    </PageScaffold>
  );
}
