import { useQuery } from '@tanstack/react-query';
import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { Card } from '@/src/components/ui/Card';
import { PageScaffold } from '@/src/components/shell/PageScaffold';
import { mockSupabase } from '@/src/lib/mockSupabase';
import { queryKeys } from '@/src/lib/queryKeys';

export default function TrainingSessionsScreen() {
  const query = useQuery({ queryKey: queryKeys.trainingSessions(), queryFn: () => mockSupabase.listTrainingSessions() });

  return (
    <PageScaffold title="Training Sessions" description="Scheduled sessions and attendance.">
      <Card>
        <View className="gap-2">
          {query.data?.map((session) => (
            <Link href={`/team/training/${session.id}` as any} key={session.id} asChild>
              <Pressable className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2">
                <Text className="text-sm font-semibold text-slate-900">{session.instructor}</Text>
                <Text className="text-xs text-slate-500">{session.date} • Attendees {session.attendees}</Text>
              </Pressable>
            </Link>
          ))}
        </View>
      </Card>
    </PageScaffold>
  );
}
