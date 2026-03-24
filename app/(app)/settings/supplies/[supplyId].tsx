import { useLocalSearchParams } from 'expo-router';
import { RouteScreen } from '@/src/components/modules/RouteScreen';

export default function SupplyDetailSettingsScreen() {
  const { supplyId } = useLocalSearchParams<{ supplyId: string }>();
  return <RouteScreen title={`Supply ${supplyId}`} description="Supply detail placeholder." />;
}
