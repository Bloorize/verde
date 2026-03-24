import { useLocalSearchParams } from 'expo-router';
import { RouteScreen } from '@/src/components/modules/RouteScreen';

export default function SpaceDetailSettingsScreen() {
  const { spaceId } = useLocalSearchParams<{ spaceId: string }>();
  return <RouteScreen title={`Space ${spaceId}`} description="Space detail fields: type, parent, short name, inspection settings, service logging." />;
}
