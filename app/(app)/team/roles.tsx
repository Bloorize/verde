import { RouteScreen } from '@/src/components/modules/RouteScreen';

export default function TeamRolesScreen() {
  return (
    <RouteScreen
      title="Roles"
      description="Role definitions and responsibilities."
      bullets={['Chief Operating Officer', 'Quality Manager', 'Shift Supervisor', 'Facilities Specialist']}
    />
  );
}
