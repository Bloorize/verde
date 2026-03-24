import { useLocalSearchParams } from 'expo-router';
import { RouteScreen } from '@/src/components/modules/RouteScreen';

export default function BuildingDetailSettingsScreen() {
  const { buildingId } = useLocalSearchParams<{ buildingId: string }>();
  return <RouteScreen title={`Building ${buildingId}`} description="Building detail configuration placeholder." />;
}
