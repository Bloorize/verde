import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';

import { Card } from '@/src/components/ui/Card';
import { PageScaffold } from '@/src/components/shell/PageScaffold';
import { mockSupabase } from '@/src/lib/mockSupabase';
import { queryKeys } from '@/src/lib/queryKeys';

export default function SurveyDetailScreen() {
  const { surveyId } = useLocalSearchParams<{ surveyId: string }>();
  const query = useQuery({ queryKey: queryKeys.survey(surveyId), queryFn: () => mockSupabase.getSurvey(surveyId), enabled: Boolean(surveyId) });
  const survey = query.data;

  return (
    <PageScaffold title="Survey Detail" description="Survey participation, scoring, and comments.">
      {survey ? (
        <Card>
          <Text className="text-lg font-bold text-slate-900">{survey.title}</Text>
          <Text className="text-sm text-slate-600">Type: {survey.type}</Text>
          <Text className="text-sm text-slate-600">Participation: {survey.participationRate}%</Text>
          <Text className="text-sm text-slate-600">Score: {survey.score}</Text>
          <Text className="mt-2 text-sm font-semibold text-slate-900">Comments</Text>
          {survey.comments.map((comment) => (
            <Text key={comment} className="text-sm text-slate-700">- {comment}</Text>
          ))}
        </Card>
      ) : null}
    </PageScaffold>
  );
}
