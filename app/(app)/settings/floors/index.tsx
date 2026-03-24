import { RouteScreen } from '@/src/components/modules/RouteScreen';

export default function FloorsSettingsScreen() {
  return <RouteScreen title="Floors" description="Floor registry and detail routing." links={[{ href: '/settings/floors/fl_1', label: 'Open Floor fl_1' }]} />;
}
