import { RouteScreen } from '@/src/components/modules/RouteScreen';

export default function SafetyPortalScreen() {
  return (
    <RouteScreen
      title="Public Safety Portal"
      description="Quick-access safety resources for on-site teams and visitors."
      links={[
        { href: '/public/safety/sds', label: 'SDS Sheets' },
        { href: '/public/safety/insurance-card', label: 'Insurance Card' },
        { href: '/public/safety/claim-card', label: 'Claim Card' },
        { href: '/public/safety/incident-response', label: 'Incident Response' },
        { href: '/public/safety/incident-intake', label: 'Incident Intake' },
      ]}
      bullets={['No authentication required for emergency access', 'Mobile-friendly quick action flow']}
    />
  );
}
