import { RouteScreen } from '@/src/components/modules/RouteScreen';

export default function FleetRequestCaseScreen() {
  return (
    <RouteScreen
      title="New Case: Fleet Request"
      description="Fleet Request intake form scaffold for prototype demos."
      bullets={['Capture reporter and location', 'Attach photos/documents', 'Assign owner and severity', 'Submit to case workflow']}
    />
  );
}
