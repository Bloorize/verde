import { Redirect, Slot } from 'expo-router';

import { AppShell } from '@/src/components/layout/AppShell';
import { useAppStore } from '@/src/store/appStore';

export default function AuthenticatedAppLayout() {
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Redirect href="/auth/sign-in" />;
  }

  return (
    <AppShell>
      <Slot />
    </AppShell>
  );
}
