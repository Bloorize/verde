import { useLocalSearchParams } from 'expo-router';

import { RouteScreen } from '@/src/components/modules/RouteScreen';

export default function DraftInspectionScreen() {
  const { draftId } = useLocalSearchParams<{ draftId: string }>();

  return <RouteScreen title={`Draft ${draftId}`} description="Saved draft inspection placeholder." />;
}
