import { Redirect } from 'expo-router';
import { useEffect } from 'react';

import { useAppStore } from '@/src/store/appStore';

export default function AskSageScreen() {
  const setAskSageOpen = useAppStore((state) => state.setAskSageOpen);

  useEffect(() => {
    setAskSageOpen(true);
  }, [setAskSageOpen]);

  return <Redirect href="/home" />;
}
