import { RouteScreen } from '@/src/components/modules/RouteScreen';

export default function StatsScreen() {
  return (
    <RouteScreen
      title="Stats"
      description="Coverage and trend stats for leadership standups."
      stats={[
        { label: 'Inspection coverage', value: '91%' },
        { label: 'Joint inspection coverage', value: '62%' },
        { label: 'Failed items', value: '14' },
        { label: 'Open escalations', value: '3' },
      ]}
    />
  );
}
