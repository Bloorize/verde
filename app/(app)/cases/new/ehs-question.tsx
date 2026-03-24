import { RouteScreen } from '@/src/components/modules/RouteScreen';

export default function EhsQuestionCaseScreen() {
  return (
    <RouteScreen
      title="New Case: Ehs Question"
      description="Ehs Question intake form scaffold for prototype demos."
      bullets={['Capture reporter and location', 'Attach photos/documents', 'Assign owner and severity', 'Submit to case workflow']}
    />
  );
}
