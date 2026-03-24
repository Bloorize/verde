import { useLocalSearchParams } from 'expo-router';

import { RouteScreen } from '@/src/components/modules/RouteScreen';

export default function SessionDetailScreen() {
  const { sessionId } = useLocalSearchParams<{ sessionId: string }>();

  return <RouteScreen title={`Session ${sessionId}`} description="Training session detail placeholder." />;
}
