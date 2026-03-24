import { useQuery } from '@tanstack/react-query';
import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { Badge } from '@/src/components/ui/Badge';
import { Card } from '@/src/components/ui/Card';
import { mockSupabase } from '@/src/lib/mockSupabase';
import { queryKeys } from '@/src/lib/queryKeys';
import { useAppStore } from '@/src/store/appStore';

export const CaseList = ({ status }: { status: 'active' | 'closed' }) => {
  const selectedSiteId = useAppStore((state) => state.selectedSiteId);

  const query = useQuery({
    queryKey: queryKeys.cases(selectedSiteId),
    queryFn: () => mockSupabase.listCases(selectedSiteId),
  });

  const filtered = query.data?.filter((item) => (status === 'closed' ? item.status === 'Resolved' || item.status === 'Closed' : item.status !== 'Resolved' && item.status !== 'Closed'));

  return (
    <Card>
      <View className="gap-2">
        {filtered?.map((item) => (
          <Link key={item.id} href={`/cases/${item.id}` as any} asChild>
            <Pressable className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
              <Text className="text-sm font-semibold text-slate-900">{item.title}</Text>
              <View className="mt-1 flex-row items-center justify-between">
                <Badge label={item.type} />
                <Badge label={item.status} tone={item.status === 'Resolved' ? 'success' : 'warning'} />
              </View>
            </Pressable>
          </Link>
        ))}
      </View>
    </Card>
  );
};
