import { RouteScreen } from '@/src/components/modules/RouteScreen';

export default function BuildingsSettingsScreen() {
  return <RouteScreen title="Buildings" description="Building registry and detail routing." links={[{ href: '/settings/buildings/bld_1', label: 'Open Building bld_1' }]} />;
}
