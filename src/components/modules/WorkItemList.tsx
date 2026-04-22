import { useQuery } from '@tanstack/react-query';
import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { Badge } from '@/src/components/ui/Badge';
import { Card } from '@/src/components/ui/Card';
import { mockSupabase } from '@/src/lib/mockSupabase';
import { queryKeys } from '@/src/lib/queryKeys';
import { translateWorkItem } from '@/src/lib/translation/translateRecords';
import { useAppStore } from '@/src/store/appStore';

export const WorkItemList = ({ filter }: { filter: 'Open' | 'Closed' | 'Overdue' | 'Mine' }) => {
  const selectedSiteId = useAppStore((state) => state.selectedSiteId);
  const currentUser = useAppStore((state) => state.currentUser);
  const language = useAppStore((state) => state.language);

  const query = useQuery({
    queryKey: queryKeys.workItems(selectedSiteId, filter, language),
    queryFn: async () =>
      Promise.all(
        (await mockSupabase.listWorkItems(selectedSiteId, { filter, currentUserName: currentUser.name })).data.map((item) =>
          translateWorkItem(item, language),
        ),
      ),
  });

  return (
    <Card>
      <View className="gap-2">
        {query.data?.map((item) => (
          <Link key={item.id} href={`/work-items/${item.id}` as any} asChild>
            <Pressable className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2">
              <View className="mb-1 flex-row items-center justify-between gap-2">
                <Text className="flex-1 text-sm font-semibold text-slate-900">{item.title}</Text>
                <Badge label={item.priority} tone={item.priority === 'Critical' ? 'danger' : item.priority === 'High' ? 'warning' : 'neutral'} />
              </View>
              <Text className="text-xs text-slate-500">{item.space}</Text>
              <View className="mt-1 flex-row items-center justify-between">
                <Text className="text-xs text-slate-700">{item.assignee}</Text>
                <Badge label={item.status} tone={item.status === 'Closed' ? 'success' : item.status === 'Overdue' ? 'danger' : 'warning'} />
              </View>
            </Pressable>
          </Link>
        ))}
      </View>
    </Card>
  );
};
