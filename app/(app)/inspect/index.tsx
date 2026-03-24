import { RouteScreen } from '@/src/components/modules/RouteScreen';

export default function InspectIndexScreen() {
  return (
    <RouteScreen
      title="Inspect"
      description="Inspection-first workflow for quality management and accountability."
      links={[
        { href: '/inspect/feed', label: 'Inspection Feed' },
        { href: '/inspect/history', label: 'Inspection History' },
        { href: '/inspect/new/setup', label: 'Start New Inspection' },
        { href: '/inspect/templates', label: 'Inspection Templates' },
      ]}
      bullets={['Capture checklist outcomes, room scores, photos, and notes.', 'Convert failed findings into work items.']}
    />
  );
}
