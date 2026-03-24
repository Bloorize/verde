import { useLocalSearchParams } from 'expo-router';
import { RouteScreen } from '@/src/components/modules/RouteScreen';

export default function FloorDetailSettingsScreen() {
  const { floorId } = useLocalSearchParams<{ floorId: string }>();
  return <RouteScreen title={`Floor ${floorId}`} description="Floor detail configuration placeholder." />;
}
