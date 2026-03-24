import { RouteScreen } from '@/src/components/modules/RouteScreen';

export default function InspectTemplatesScreen() {
  return (
    <RouteScreen
      title="Inspection Templates"
      description="Reusable checklist templates for site-specific quality programs."
      links={[
        { href: '/inspect/templates/template_lobby', label: 'Lobby Quality Baseline' },
        { href: '/inspect/templates/template_restroom', label: 'Restroom Daily QA' },
      ]}
    />
  );
}
