import { RouteScreen } from '@/src/components/modules/RouteScreen';

export default function NearMissCaseScreen() {
  return (
    <RouteScreen
      title="New Case: Near Miss"
      description="Near Miss intake form scaffold for prototype demos."
      bullets={['Capture reporter and location', 'Attach photos/documents', 'Assign owner and severity', 'Submit to case workflow']}
    />
  );
}
