import { useLocalSearchParams } from 'expo-router';
import { RouteScreen } from '@/src/components/modules/RouteScreen';

export default function ServiceItemDetailSettingsScreen() {
  const { serviceItemId } = useLocalSearchParams<{ serviceItemId: string }>();
  return <RouteScreen title={`Service Item ${serviceItemId}`} description="Service catalog detail placeholder." />;
}
