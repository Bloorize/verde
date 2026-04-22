import { useQuery } from '@tanstack/react-query';
import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { Badge } from '@/src/components/ui/Badge';
import { Card } from '@/src/components/ui/Card';
import { PageScaffold } from '@/src/components/shell/PageScaffold';
import { mockSupabase } from '@/src/lib/mockSupabase';
import { queryKeys } from '@/src/lib/queryKeys';
import { useAppStore } from '@/src/store/appStore';

export default function TeamEmployeesScreen() {
  const selectedSiteId = useAppStore((state) => state.selectedSiteId);
  const query = useQuery({
    queryKey: queryKeys.employees(selectedSiteId),
    queryFn: () => mockSupabase.listEmployees(selectedSiteId),
  });

  return (
    <PageScaffold title="Employees" description="Employee roster with roles, sites, and training status.">
      <Card>
        <View className="gap-2">
          {query.data?.map((employee) => (
            <Link key={employee.id} href={`/team/${employee.id}` as any} asChild>
              <Pressable className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2">
                <View className="mb-1 flex-row items-center justify-between">
                  <Text className="text-sm font-semibold text-slate-900">{employee.name}</Text>
                  <Badge label={employee.trainingStatus} tone={employee.trainingStatus === 'Current' ? 'success' : employee.trainingStatus === 'Due Soon' ? 'warning' : 'danger'} />
                </View>
                <Text className="text-xs text-slate-500">{employee.role}</Text>
                <Text className="text-xs text-slate-500">Sites: {employee.sites.join(', ')}</Text>
              </Pressable>
            </Link>
          ))}
        </View>
      </Card>
    </PageScaffold>
  );
}
