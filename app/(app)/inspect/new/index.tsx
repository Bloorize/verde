import { RouteScreen } from '@/src/components/modules/RouteScreen';

export default function NewInspectionIndexScreen() {
  return (
    <RouteScreen
      title="New Inspection"
      description="Guided multi-step inspection flow for demo walkthroughs."
      links={[
        { href: '/inspect/new/setup', label: 'Step 1: Setup' },
        { href: '/inspect/new/location', label: 'Step 2: Location' },
        { href: '/inspect/new/checklist', label: 'Step 3: Checklist' },
        { href: '/inspect/new/room-score', label: 'Step 4: Room Score' },
        { href: '/inspect/new/summary', label: 'Step 5: Summary' },
      ]}
    />
  );
}
