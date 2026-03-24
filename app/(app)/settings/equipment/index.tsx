import { RouteScreen } from '@/src/components/modules/RouteScreen';

export default function EquipmentSettingsScreen() {
  return <RouteScreen title="Equipment" description="Equipment list, status, and maintenance planning." links={[{ href: '/settings/equipment/equip_1', label: 'Open Equipment equip_1' }]} />;
}
