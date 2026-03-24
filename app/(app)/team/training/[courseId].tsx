import { useLocalSearchParams } from 'expo-router';

import { RouteScreen } from '@/src/components/modules/RouteScreen';

export default function CourseDetailScreen() {
  const { courseId } = useLocalSearchParams<{ courseId: string }>();

  return <RouteScreen title={`Course ${courseId}`} description="Training course detail placeholder." />;
}
