import { RouteScreen } from '@/src/components/modules/RouteScreen';

export default function ServiceCatalogSettingsScreen() {
  return <RouteScreen title="Service Catalog" description="Service items and task definitions." links={[{ href: '/settings/service-catalog/service_1', label: 'Open Service Item service_1' }]} />;
}
