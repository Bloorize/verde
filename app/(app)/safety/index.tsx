import { RouteScreen } from '@/src/components/modules/RouteScreen';

export default function SafetyPortalScreen() {
  return (
    <RouteScreen
      title="Public Safety Portal"
      description="Quick-access safety resources for on-site teams and visitors."
      links={[
        { href: '/safety/sds', label: 'SDS Sheets' },
        { href: '/safety/insurance-card', label: 'Insurance Card' },
        { href: '/safety/claim-card', label: 'Claim Card' },
        { href: '/safety/incident-response', label: 'Incident Response' },
        { href: '/safety/incident-intake', label: 'Incident Intake' },
      ]}
      bullets={['No authentication required for emergency access', 'Mobile-friendly quick action flow']}
    />
  );
}
