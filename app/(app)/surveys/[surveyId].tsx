import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Card } from '@/src/components/ui/Card';
import { PageScaffold } from '@/src/components/shell/PageScaffold';
import { mockSupabase } from '@/src/lib/mockSupabase';
import { queryKeys } from '@/src/lib/queryKeys';
import { translateSurvey } from '@/src/lib/translation/translateRecords';
import { useAppStore } from '@/src/store/appStore';

export default function SurveyDetailScreen() {
  const { t } = useTranslation();
  const { surveyId } = useLocalSearchParams<{ surveyId: string }>();
  const language = useAppStore((state) => state.language);
  const query = useQuery({
    queryKey: queryKeys.survey(surveyId, language),
    queryFn: async () => {
      const survey = await mockSupabase.getSurvey(surveyId);
      return survey ? translateSurvey(survey, language) : undefined;
    },
    enabled: Boolean(surveyId),
  });
  const survey = query.data;

  return (
    <PageScaffold title="Survey Detail" description="Survey participation, scoring, and comments.">
      {survey ? (
        <Card>
          <Text className="text-lg font-bold text-slate-900">{survey.title}</Text>
          <Text className="text-sm text-slate-600">{t('Type')}: {survey.type}</Text>
          <Text className="text-sm text-slate-600">{t('Participation')}: {survey.participationRate}%</Text>
          <Text className="text-sm text-slate-600">{t('Score')}: {survey.score}</Text>
          <Text className="mt-2 text-sm font-semibold text-slate-900">{t('Comments')}</Text>
          {survey.comments.map((comment) => (
            <Text key={comment} className="text-sm text-slate-700">- {comment}</Text>
          ))}
        </Card>
      ) : null}
    </PageScaffold>
  );
}
