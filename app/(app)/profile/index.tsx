import { RouteScreen } from '@/src/components/modules/RouteScreen';

export default function ProfileIndexScreen() {
  return (
    <RouteScreen
      title="Profile"
      description="User profile, notifications, preferences, and site access."
      links={[
        { href: '/profile/notifications', label: 'Notifications' },
        { href: '/profile/preferences', label: 'Preferences' },
        { href: '/profile/site-access', label: 'Site Access' },
      ]}
    />
  );
}
