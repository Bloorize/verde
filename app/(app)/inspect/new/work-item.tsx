import { RouteScreen } from '@/src/components/modules/RouteScreen';

export default function CreateWorkItemFromInspectionScreen() {
  return (
    <RouteScreen
      title="Create Work Item"
      description="Convert failed room findings into tracked work items."
      bullets={['Select failed room', 'Set assignee and due date', 'Attach photos and notes', 'Submit to Work Items queue']}
    />
  );
}
