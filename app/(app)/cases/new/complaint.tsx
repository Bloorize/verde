import { RouteScreen } from '@/src/components/modules/RouteScreen';

export default function ComplaintCaseScreen() {
  return (
    <RouteScreen
      title="New Case: Complaint"
      description="Complaint intake form scaffold for prototype demos."
      bullets={['Capture reporter and location', 'Attach photos/documents', 'Assign owner and severity', 'Submit to case workflow']}
    />
  );
}
