import { RouteScreen } from '@/src/components/modules/RouteScreen';

export default function ResignationCaseScreen() {
  return (
    <RouteScreen
      title="New Case: Resignation"
      description="Resignation intake form scaffold for prototype demos."
      bullets={['Capture reporter and location', 'Attach photos/documents', 'Assign owner and severity', 'Submit to case workflow']}
    />
  );
}
