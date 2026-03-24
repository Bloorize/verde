import { RouteScreen } from '@/src/components/modules/RouteScreen';

export default function NewWorkItemScreen() {
  return (
    <RouteScreen
      title="New Work Item"
      description="Create a new remediation or service follow-up action."
      bullets={['Title', 'Site/space', 'Assignee', 'Due date', 'Priority', 'Notes + photos']}
    />
  );
}
