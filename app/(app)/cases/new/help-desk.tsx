import { RouteScreen } from '@/src/components/modules/RouteScreen';

export default function HelpDeskCaseScreen() {
  return (
    <RouteScreen
      title="New Case: Help Desk"
      description="Help Desk intake form scaffold for prototype demos."
      bullets={['Capture reporter and location', 'Attach photos/documents', 'Assign owner and severity', 'Submit to case workflow']}
    />
  );
}
