import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';

import { Badge } from '@/src/components/ui/Badge';
import { Card } from '@/src/components/ui/Card';
import { PageScaffold } from '@/src/components/shell/PageScaffold';
import { mockSupabase } from '@/src/lib/mockSupabase';
import { queryKeys } from '@/src/lib/queryKeys';

export default function CaseDetailScreen() {
  const { caseId } = useLocalSearchParams<{ caseId: string }>();
  const query = useQuery({
    queryKey: queryKeys.case(caseId),
    queryFn: () => mockSupabase.getCase(caseId),
    enabled: Boolean(caseId),
  });

  const item = query.data;

  return (
    <PageScaffold title="Case Detail" description="Status, owner, comments, attachments, and audit trail.">
      {item ? (
        <>
          <Card>
            <Text className="text-lg font-bold text-slate-900">{item.title}</Text>
            <Text className="text-sm text-slate-600">Owner: {item.owner}</Text>
            <Text className="text-sm text-slate-600">Site: {item.siteName}</Text>
            <Text className="mt-2 text-sm text-slate-700">Type: {item.type}</Text>
            <Badge label={item.status} tone={item.status === 'Resolved' ? 'success' : 'warning'} />
          </Card>

          <Card>
            <Text className="mb-1 text-base font-semibold text-slate-900">Comments</Text>
            {item.comments.map((comment) => (
              <Text key={comment} className="text-sm text-slate-700">- {comment}</Text>
            ))}
          </Card>

          <Card>
            <Text className="mb-1 text-base font-semibold text-slate-900">Attachments</Text>
            {item.attachments.map((attachment) => (
              <Text key={attachment} className="text-sm text-slate-700">- {attachment}</Text>
            ))}
          </Card>

          <Card>
            <Text className="mb-1 text-base font-semibold text-slate-900">Audit History</Text>
            {item.auditHistory.map((entry) => (
              <Text key={entry} className="text-sm text-slate-700">- {entry}</Text>
            ))}
          </Card>
        </>
      ) : null}
    </PageScaffold>
  );
}
