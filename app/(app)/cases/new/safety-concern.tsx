import { RouteScreen } from '@/src/components/modules/RouteScreen';

export default function SafetyConcernCaseScreen() {
  return (
    <RouteScreen
      title="New Case: Safety Concern"
      description="Safety Concern intake form scaffold for prototype demos."
      bullets={['Capture reporter and location', 'Attach photos/documents', 'Assign owner and severity', 'Submit to case workflow']}
    />
  );
}
