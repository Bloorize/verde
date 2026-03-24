import { RouteScreen } from '@/src/components/modules/RouteScreen';

export default function SettingsIndexScreen() {
  return (
    <RouteScreen
      title="Settings"
      description="Location, catalogs, supplies, equipment, and budget configuration."
      links={[
        { href: '/settings/location-profile', label: 'Location Profile' },
        { href: '/settings/buildings', label: 'Buildings' },
        { href: '/settings/floors', label: 'Floors' },
        { href: '/settings/spaces', label: 'Spaces' },
        { href: '/settings/space-types', label: 'Space Types' },
        { href: '/settings/service-catalog', label: 'Service Catalog' },
        { href: '/settings/course-catalog', label: 'Course Catalog' },
        { href: '/settings/supplies', label: 'Supplies' },
        { href: '/settings/equipment', label: 'Equipment' },
        { href: '/settings/budget', label: 'Budget' },
      ]}
    />
  );
}
