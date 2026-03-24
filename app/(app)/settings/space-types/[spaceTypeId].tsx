import { useLocalSearchParams } from 'expo-router';
import { RouteScreen } from '@/src/components/modules/RouteScreen';

export default function SpaceTypeDetailSettingsScreen() {
  const { spaceTypeId } = useLocalSearchParams<{ spaceTypeId: string }>();
  return <RouteScreen title={`Space Type ${spaceTypeId}`} description="Checklist and schedule placeholders: daily/weekly/monthly/yearly." />;
}
