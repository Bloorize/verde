import { useQuery } from '@tanstack/react-query';

import { Card } from '@/src/components/ui/Card';
import { MetricGrid } from '@/src/components/modules/MetricGrid';
import { RouteLinks } from '@/src/components/modules/RouteLinks';
import { PageScaffold } from '@/src/components/shell/PageScaffold';
import { mockSupabase } from '@/src/lib/mockSupabase';
import { queryKeys } from '@/src/lib/queryKeys';
import { useAppStore } from '@/src/store/appStore';
import { Text, View } from 'react-native';

export default function HomeDashboardScreen() {
  const selectedSiteId = useAppStore((state) => state.selectedSiteId);
  const setAskSageOpen = useAppStore((state) => state.setAskSageOpen);
  const dashboardQuery = useQuery({
    queryKey: queryKeys.dashboard(selectedSiteId),
    queryFn: () => mockSupabase.getDashboardMetrics(selectedSiteId),
  });

  const metrics = dashboardQuery.data;

  return (
    <PageScaffold title="Home" description="Operational dashboard for the selected site.">
      <Card>
        <Text className="text-2xl font-bold text-slate-900">Good Morning, Brandon</Text>
        <Text className="mt-1 text-sm text-slate-600">
          Site health and inspection readiness are summarized below for leadership review.
        </Text>
      </Card>

      <Card>
        <Text className="mb-2 text-lg font-bold text-slate-900">Location Health</Text>
        <View className="flex-row items-end justify-between">
          <View>
            <Text className="text-xs text-slate-500">Sage Score</Text>
            <Text className="text-3xl font-bold text-brand-700">{metrics?.sageScore ?? '--'}</Text>
          </View>
          <View className="rounded-full bg-brand-100 px-3 py-1">
            <Text className="text-xs font-semibold text-brand-700">+{metrics?.inspectionTrend ?? 0}% trend</Text>
          </View>
        </View>
        <View className="mt-4 gap-2">
          <Text className="text-xs font-semibold uppercase tracking-wider text-slate-500">Suggestions</Text>
          {metrics?.suggestions.map((suggestion) => (
            <View key={suggestion} className="rounded-xl bg-brand-50 px-3 py-2">
              <Text className="text-sm text-slate-700">{suggestion}</Text>
            </View>
          ))}
          <View className="rounded-xl bg-amber-100 px-3 py-2">
            <Text className="text-sm font-semibold text-amber-800">{metrics?.workItemAgingAlert}</Text>
          </View>
        </View>
      </Card>

      <MetricGrid
        title="Stats"
        metrics={[
          { label: 'Inspection coverage', value: `${metrics?.inspectionCoverage ?? 0}%` },
          { label: 'Joint inspection coverage', value: `${metrics?.jointCoverage ?? 0}%` },
          { label: 'Inspection trend', value: `+${metrics?.inspectionTrend ?? 0}%` },
        ]}
      />

      <RouteLinks
        title="Dashboard Views"
        links={[
          {
            label: 'Ask Sage',
            description: 'Open the Sage assistant from the bottom-right corner.',
            onPress: () => setAskSageOpen(true),
          },
          { href: '/home/sage-score', label: 'Sage Score' },
          { href: '/home/suggestions', label: 'Suggestions' },
          { href: '/home/stats', label: 'Stats' },
          { href: '/home/manager-dashboard', label: 'Manager Dashboard' },
          { href: '/home/region-dashboard', label: 'Region Dashboard' },
        ]}
      />
    </PageScaffold>
  );
}
