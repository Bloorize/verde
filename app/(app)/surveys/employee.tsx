import { useQuery } from '@tanstack/react-query';
import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { Card } from '@/src/components/ui/Card';
import { PageScaffold } from '@/src/components/shell/PageScaffold';
import { mockSupabase } from '@/src/lib/mockSupabase';
import { queryKeys } from '@/src/lib/queryKeys';

export default function EmployeeSurveysScreen() {
  const query = useQuery({ queryKey: queryKeys.surveys(), queryFn: () => mockSupabase.listSurveys() });
  const employee = query.data?.filter((survey) => survey.type === 'Employee');

  return (
    <PageScaffold title="Employee Surveys" description="Participation and sentiment trends for workforce feedback.">
      <Card>
        <View className="gap-2">
          {employee?.map((survey) => (
            <Link key={survey.id} href={`/surveys/${survey.id}` as any} asChild>
              <Pressable className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2">
                <Text className="text-sm font-semibold text-slate-900">{survey.title}</Text>
                <Text className="text-xs text-slate-500">Participation {survey.participationRate}% • Score {survey.score}</Text>
              </Pressable>
            </Link>
          ))}
        </View>
      </Card>
    </PageScaffold>
  );
}
