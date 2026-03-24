import { RouteScreen } from '@/src/components/modules/RouteScreen';

export default function SpaceTypesSettingsScreen() {
  return <RouteScreen title="Space Types" description="Global space type list and schedules." links={[{ href: '/settings/space-types/st_1', label: 'Open Space Type st_1' }]} />;
}
