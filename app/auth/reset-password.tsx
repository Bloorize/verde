import { RouteScreen } from '@/src/components/modules/RouteScreen';

export default function ResetPasswordScreen() {
  return (
    <RouteScreen
      title="Reset Password"
      description="Reset confirmation flow placeholder."
      bullets={['Validate token', 'Set new password', 'Return to sign in']}
    />
  );
}
