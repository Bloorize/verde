import { RouteScreen } from '@/src/components/modules/RouteScreen';

export default function HrRequestCaseScreen() {
  return (
    <RouteScreen
      title="New Case: Hr Request"
      description="Hr Request intake form scaffold for prototype demos."
      bullets={['Capture reporter and location', 'Attach photos/documents', 'Assign owner and severity', 'Submit to case workflow']}
    />
  );
}
