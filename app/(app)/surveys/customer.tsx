import { useQuery } from '@tanstack/react-query';
import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { Card } from '@/src/components/ui/Card';
import { PageScaffold } from '@/src/components/shell/PageScaffold';
import { mockSupabase } from '@/src/lib/mockSupabase';
import { queryKeys } from '@/src/lib/queryKeys';

export default function CustomerSurveysScreen() {
  const query = useQuery({ queryKey: queryKeys.surveys(), queryFn: () => mockSupabase.listSurveys() });
  const customer = query.data?.filter((survey) => survey.type === 'Customer');

  return (
    <PageScaffold title="Customer Surveys" description="Customer satisfaction pulse and comments.">
      <Card>
        <View className="gap-2">
          {customer?.map((survey) => (
            <Link key={survey.id} href={`/surveys/${survey.id}` as any} asChild>
              <Pressable className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
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
