import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Badge } from '@/src/components/ui/Badge';
import { Card } from '@/src/components/ui/Card';
import { PageScaffold } from '@/src/components/shell/PageScaffold';
import { mockSupabase } from '@/src/lib/mockSupabase';
import { queryKeys } from '@/src/lib/queryKeys';
import { translateCaseRecord } from '@/src/lib/translation/translateRecords';
import { useAppStore } from '@/src/store/appStore';

export default function CaseDetailScreen() {
  const { t } = useTranslation();
  const { caseId } = useLocalSearchParams<{ caseId: string }>();
  const language = useAppStore((state) => state.language);
  const query = useQuery({
    queryKey: queryKeys.case(caseId, language),
    queryFn: async () => {
      const item = await mockSupabase.getCase(caseId);
      return item ? translateCaseRecord(item, language) : undefined;
    },
    enabled: Boolean(caseId),
  });

  const item = query.data;

  return (
    <PageScaffold title="Case Detail" description="Status, owner, comments, attachments, and audit trail.">
      {item ? (
        <>
          <Card>
            <Text className="text-lg font-bold text-slate-900">{item.title}</Text>
            <Text className="text-sm text-slate-600">{t('Owner')}: {item.owner}</Text>
            <Text className="text-sm text-slate-600">{t('Site')}: {item.siteName}</Text>
            <Text className="mt-2 text-sm text-slate-700">{t('Type')}: {item.type}</Text>
            <Badge label={item.status} tone={item.status === 'Resolved' ? 'success' : 'warning'} />
          </Card>

          <Card>
            <Text className="mb-1 text-base font-semibold text-slate-900">{t('Comments')}</Text>
            {item.comments.map((comment) => (
              <Text key={comment} className="text-sm text-slate-700">- {comment}</Text>
            ))}
          </Card>

          <Card>
            <Text className="mb-1 text-base font-semibold text-slate-900">{t('Attachments')}</Text>
            {item.attachments.map((attachment) => (
              <Text key={attachment} className="text-sm text-slate-700">- {attachment}</Text>
            ))}
          </Card>

          <Card>
            <Text className="mb-1 text-base font-semibold text-slate-900">{t('Audit History')}</Text>
            {item.auditHistory.map((entry) => (
              <Text key={entry} className="text-sm text-slate-700">- {entry}</Text>
            ))}
          </Card>
        </>
      ) : null}
    </PageScaffold>
  );
}
