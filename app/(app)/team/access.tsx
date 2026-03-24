import { RouteScreen } from '@/src/components/modules/RouteScreen';

export default function TeamAccessScreen() {
  return (
    <RouteScreen
      title="Access"
      description="Site access controls and permission placeholders."
      bullets={['Assign site visibility', 'Grant module-level permissions', 'Export access audit']}
    />
  );
}
