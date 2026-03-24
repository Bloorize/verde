import { RouteScreen } from '@/src/components/modules/RouteScreen';

export default function PropertyDamageCaseScreen() {
  return (
    <RouteScreen
      title="New Case: Property Damage"
      description="Property Damage intake form scaffold for prototype demos."
      bullets={['Capture reporter and location', 'Attach photos/documents', 'Assign owner and severity', 'Submit to case workflow']}
    />
  );
}
