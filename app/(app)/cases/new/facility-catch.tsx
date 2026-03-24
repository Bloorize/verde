import { RouteScreen } from '@/src/components/modules/RouteScreen';

export default function FacilityCatchCaseScreen() {
  return (
    <RouteScreen
      title="New Case: Facility Catch"
      description="Facility Catch intake form scaffold for prototype demos."
      bullets={['Capture reporter and location', 'Attach photos/documents', 'Assign owner and severity', 'Submit to case workflow']}
    />
  );
}
