import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';

import { Card } from '@/src/components/ui/Card';
import { PageScaffold } from '@/src/components/shell/PageScaffold';
import { mockSupabase } from '@/src/lib/mockSupabase';
import { queryKeys } from '@/src/lib/queryKeys';

export default function DocumentDetailScreen() {
  const { documentId } = useLocalSearchParams<{ documentId: string }>();
  const selectedSiteId = 'site_1';
  const query = useQuery({ queryKey: queryKeys.documents(selectedSiteId), queryFn: () => mockSupabase.listDocuments(selectedSiteId) });
  const doc = query.data?.find((item) => item.id === documentId);

  return (
    <PageScaffold title="Document Detail" description="Document metadata and content placeholder.">
      {doc ? (
        <Card>
          <Text className="text-lg font-bold text-slate-900">{doc.title}</Text>
          <Text className="text-sm text-slate-600">Type: {doc.type}</Text>
          <Text className="text-sm text-slate-600">Updated: {doc.updatedAt}</Text>
        </Card>
      ) : null}
    </PageScaffold>
  );
}
