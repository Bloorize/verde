import { RouteScreen } from '@/src/components/modules/RouteScreen';

export default function TeamIndexScreen() {
  return (
    <RouteScreen
      title="Team"
      description="Workforce management, training, roles, and site access."
      links={[
        { href: '/team/employees', label: 'Employees' },
        { href: '/team/roles', label: 'Roles' },
        { href: '/team/access', label: 'Access' },
        { href: '/team/training', label: 'Training' },
      ]}
    />
  );
}
