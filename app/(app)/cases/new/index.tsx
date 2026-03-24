import { RouteScreen } from '@/src/components/modules/RouteScreen';

export default function NewCaseIndexScreen() {
  return (
    <RouteScreen
      title="New Case"
      description="Select a case type to begin intake."
      links={[
        { href: '/cases/new/incident', label: 'Incident' },
        { href: '/cases/new/property-damage', label: 'Property Damage' },
        { href: '/cases/new/near-miss', label: 'Near Miss' },
        { href: '/cases/new/facility-catch', label: 'Facility Catch' },
        { href: '/cases/new/safety-concern', label: 'Safety Concern' },
        { href: '/cases/new/complaint', label: 'Complaint' },
        { href: '/cases/new/compliment', label: 'Compliment' },
        { href: '/cases/new/service-request', label: 'Service Request' },
        { href: '/cases/new/hr-request', label: 'HR Request' },
        { href: '/cases/new/resignation', label: 'Resignation' },
        { href: '/cases/new/fleet-request', label: 'Fleet Request' },
        { href: '/cases/new/help-desk', label: 'Help Desk' },
        { href: '/cases/new/ehs-question', label: 'EHS Question' },
      ]}
    />
  );
}
