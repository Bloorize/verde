import { RouteScreen } from '@/src/components/modules/RouteScreen';

export default function LocationProfileScreen() {
  return (
    <RouteScreen
      title="Location Profile"
      description="Site > Building > Floor > Space hierarchy and local operations settings."
      links={[
        { href: '/settings/location-profile/space-types', label: 'Space Types' },
        { href: '/settings/location-profile/spaces', label: 'Spaces' },
        { href: '/settings/location-profile/contracts', label: 'Contracts' },
        { href: '/settings/location-profile/poc-admin', label: 'POC Admin' },
        { href: '/settings/location-profile/scheduling', label: 'Scheduling' },
      ]}
      bullets={['Space detail fields include type, parent, short name, inspection settings, and service logging.']}
    />
  );
}
