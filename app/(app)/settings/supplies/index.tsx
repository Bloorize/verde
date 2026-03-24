import { RouteScreen } from '@/src/components/modules/RouteScreen';

export default function SuppliesSettingsScreen() {
  return <RouteScreen title="Supplies" description="Supply inventory and reorder thresholds." links={[{ href: '/settings/supplies/supply_1', label: 'Open Supply supply_1' }]} />;
}
