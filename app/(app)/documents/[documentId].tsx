import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Card } from '@/src/components/ui/Card';
import { PageScaffold } from '@/src/components/shell/PageScaffold';
import { mockSupabase } from '@/src/lib/mockSupabase';
import { queryKeys } from '@/src/lib/queryKeys';
import { translateDocumentRecord } from '@/src/lib/translation/translateRecords';
import { useAppStore } from '@/src/store/appStore';
import { formatDate } from '@/src/utils/format';

export default function DocumentDetailScreen() {
  const { t } = useTranslation();
  const { documentId } = useLocalSearchParams<{ documentId: string }>();
  const selectedSiteId = 'site_1';
  const language = useAppStore((state) => state.language);
  const query = useQuery({
    queryKey: queryKeys.documents(selectedSiteId, language),
    queryFn: async () => Promise.all((await mockSupabase.listDocuments(selectedSiteId)).map((item) => translateDocumentRecord(item, language))),
  });
  const doc = query.data?.find((item) => item.id === documentId);

  return (
    <PageScaffold title="Document Detail" description="Document metadata and content placeholder.">
      {doc ? (
        <Card>
          <Text className="text-lg font-bold text-slate-900">{doc.title}</Text>
          <Text className="text-sm text-slate-600">{t('Type')}: {doc.type}</Text>
          <Text className="text-sm text-slate-600">{t('Updated')}: {formatDate(doc.updatedAt, language)}</Text>
        </Card>
      ) : null}
    </PageScaffold>
  );
}
