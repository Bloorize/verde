import { RouteScreen } from '@/src/components/modules/RouteScreen';

export default function ManagerDashboardScreen() {
  return (
    <RouteScreen
      title="Manager Dashboard"
      description="Site manager view for staffing, quality, and open actions."
      stats={[
        { label: 'Sites managed', value: '4' },
        { label: 'Open work items', value: '19' },
        { label: 'Cases in review', value: '7' },
      ]}
    />
  );
}
