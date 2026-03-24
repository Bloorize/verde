import { useLocalSearchParams } from 'expo-router';
import { RouteScreen } from '@/src/components/modules/RouteScreen';

export default function EquipmentDetailSettingsScreen() {
  const { equipmentId } = useLocalSearchParams<{ equipmentId: string }>();
  return <RouteScreen title={`Equipment ${equipmentId}`} description="Equipment detail placeholder." />;
}
