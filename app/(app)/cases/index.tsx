import { RouteScreen } from '@/src/components/modules/RouteScreen';

export default function CasesIndexScreen() {
  return (
    <RouteScreen
      title="Cases"
      description="Incident and service case management across all request types."
      links={[
        { href: '/cases/active', label: 'Active Cases' },
        { href: '/cases/closed', label: 'Closed Cases' },
        { href: '/cases/new', label: 'Create New Case' },
      ]}
    />
  );
}
