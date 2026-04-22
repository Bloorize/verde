import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Card } from '@/src/components/ui/Card';
import { PageScaffold } from '@/src/components/shell/PageScaffold';
import { mockSupabase } from '@/src/lib/mockSupabase';
import { queryKeys } from '@/src/lib/queryKeys';
import { translateEmployee } from '@/src/lib/translation/translateRecords';
import { useAppStore } from '@/src/store/appStore';

export default function EmployeeDetailScreen() {
  const { t } = useTranslation();
  const { employeeId } = useLocalSearchParams<{ employeeId: string }>();
  const language = useAppStore((state) => state.language);
  const query = useQuery({
    queryKey: queryKeys.employee(employeeId, language),
    queryFn: async () => {
      const employee = await mockSupabase.getEmployee(employeeId);
      return employee ? translateEmployee(employee, language) : undefined;
    },
    enabled: Boolean(employeeId),
  });

  const employee = query.data;

  return (
    <PageScaffold title="Employee Detail" description="Profile, site access, training transcript, and inspection activity.">
      {employee ? (
        <>
          <Card>
            <Text className="text-lg font-bold text-slate-900">{employee.name}</Text>
            <Text className="text-sm text-slate-600">{employee.role}</Text>
            <Text className="mt-2 text-sm text-slate-700">{t('Assigned sites')}: {employee.assignedSites.join(', ')}</Text>
          </Card>
          <Card>
            <Text className="mb-1 text-base font-semibold text-slate-900">{t('Training Transcript')}</Text>
            {employee.trainingTranscript.map((entry) => (
              <Text key={entry} className="text-sm text-slate-700">- {entry}</Text>
            ))}
          </Card>
          <Card>
            <Text className="text-base font-semibold text-slate-900">{t('Inspection Activity')}</Text>
            <Text className="text-sm text-slate-700">{employee.inspectionActivity}</Text>
          </Card>
        </>
      ) : null}
    </PageScaffold>
  );
}
