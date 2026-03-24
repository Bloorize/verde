import { RouteScreen } from '@/src/components/modules/RouteScreen';

export default function ForgotPasswordScreen() {
  return (
    <RouteScreen
      title="Forgot Password"
      description="Password reset link workflow placeholder for prototype demos."
      bullets={['Enter email address', 'Receive reset link', 'Set new password']}
    />
  );
}
