import { PropsWithChildren, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ActivityIndicator, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import '@/src/i18n';

import { useAppStore } from '@/src/store/appStore';

export const AppProviders = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 30,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );
  const hydrateLanguage = useAppStore((state) => state.hydrateLanguage);
  const isLanguageHydrated = useAppStore((state) => state.isLanguageHydrated);

  useEffect(() => {
    void hydrateLanguage();
  }, [hydrateLanguage]);

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        {isLanguageHydrated ? (
          children
        ) : (
          <View className="flex-1 items-center justify-center bg-white">
            <ActivityIndicator size="small" color="#2f7a58" />
          </View>
        )}
      </QueryClientProvider>
    </SafeAreaProvider>
  );
};
