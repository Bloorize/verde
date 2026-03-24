import { RouteScreen } from '@/src/components/modules/RouteScreen';

export default function SageScoreScreen() {
  return (
    <RouteScreen
      title="Sage Score"
      description="Composite quality score and trend context for the selected site."
      stats={[
        { label: 'Current score', value: '84' },
        { label: '30-day trend', value: '+5%' },
        { label: 'Risk level', value: 'Moderate' },
      ]}
      bullets={['Score blends inspections, work item aging, and service coverage completion.']}
    />
  );
}
