import { RouteScreen } from '@/src/components/modules/RouteScreen';

export default function ServiceRequestCaseScreen() {
  return (
    <RouteScreen
      title="New Case: Service Request"
      description="Service Request intake form scaffold for prototype demos."
      bullets={['Capture reporter and location', 'Attach photos/documents', 'Assign owner and severity', 'Submit to case workflow']}
    />
  );
}
