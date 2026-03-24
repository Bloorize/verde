import { RouteScreen } from '@/src/components/modules/RouteScreen';

export default function IncidentCaseScreen() {
  return (
    <RouteScreen
      title="New Case: Incident"
      description="Incident intake form scaffold for prototype demos."
      bullets={['Capture reporter and location', 'Attach photos/documents', 'Assign owner and severity', 'Submit to case workflow']}
    />
  );
}
