import { RouteScreen } from '@/src/components/modules/RouteScreen';

export default function RegionDashboardScreen() {
  return (
    <RouteScreen
      title="Region Dashboard"
      description="Regional rollup for executive visibility."
      stats={[
        { label: 'Region sites', value: '6' },
        { label: 'Avg sage score', value: '82' },
        { label: 'Inspection coverage', value: '89%' },
      ]}
    />
  );
}
