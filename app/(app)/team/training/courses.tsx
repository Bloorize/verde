import { useQuery } from '@tanstack/react-query';
import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { Card } from '@/src/components/ui/Card';
import { PageScaffold } from '@/src/components/shell/PageScaffold';
import { mockSupabase } from '@/src/lib/mockSupabase';
import { queryKeys } from '@/src/lib/queryKeys';

export default function TrainingCoursesScreen() {
  const query = useQuery({ queryKey: queryKeys.trainingCourses(), queryFn: () => mockSupabase.listTrainingCourses() });

  return (
    <PageScaffold title="Training Courses" description="Course catalog for operations training.">
      <Card>
        <View className="gap-2">
          {query.data?.map((course) => (
            <Link href={`/team/training/${course.id}` as any} key={course.id} asChild>
              <Pressable className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2">
                <Text className="text-sm font-semibold text-slate-900">{course.title}</Text>
                <Text className="text-xs text-slate-500">{course.category} • {course.duration}</Text>
              </Pressable>
            </Link>
          ))}
        </View>
      </Card>
    </PageScaffold>
  );
}
