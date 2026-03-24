import { RouteScreen } from '@/src/components/modules/RouteScreen';

export default function SpacesSettingsScreen() {
  return <RouteScreen title="Spaces" description="Space registry and detail routing." links={[{ href: '/settings/spaces/sp_1', label: 'Open Space sp_1' }]} />;
}
