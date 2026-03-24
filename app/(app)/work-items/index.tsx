import { RouteScreen } from '@/src/components/modules/RouteScreen';

export default function WorkItemsIndexScreen() {
  return (
    <RouteScreen
      title="Work Items"
      description="Action queue for quality follow-up and service remediation."
      links={[
        { href: '/work-items/open', label: 'Open' },
        { href: '/work-items/closed', label: 'Closed' },
        { href: '/work-items/overdue', label: 'Overdue' },
        { href: '/work-items/mine', label: 'Mine' },
        { href: '/work-items/new', label: 'New Work Item' },
      ]}
    />
  );
}
