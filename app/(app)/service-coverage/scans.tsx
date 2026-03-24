import { useQuery } from '@tanstack/react-query';
import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { Card } from '@/src/components/ui/Card';
import { PageScaffold } from '@/src/components/shell/PageScaffold';
import { mockSupabase } from '@/src/lib/mockSupabase';
import { queryKeys } from '@/src/lib/queryKeys';
import { useAppStore } from '@/src/store/appStore';

export default function CoverageScansScreen() {
  const selectedSiteId = useAppStore((state) => state.selectedSiteId);
  const query = useQuery({ queryKey: queryKeys.coverageLogs(selectedSiteId), queryFn: () => mockSupabase.listCoverageLogs(selectedSiteId) });

  return (
    <PageScaffold title="Service Coverage Scans" description="Service completion logs by frequency and space.">
      <Card>
        <View className="gap-2">
          {query.data?.map((scan) => (
            <Link href={`/service-coverage/${scan.id}` as any} key={scan.id} asChild>
              <Pressable className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                <Text className="text-sm font-semibold text-slate-900">{scan.spaceName}</Text>
                <Text className="text-xs text-slate-500">{scan.frequency} • Completion {scan.completion}%</Text>
              </Pressable>
            </Link>
          ))}
        </View>
      </Card>
    </PageScaffold>
  );
}
