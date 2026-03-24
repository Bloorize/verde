import { useQueryClient } from '@tanstack/react-query';
import { PropsWithChildren, useEffect } from 'react';
import { Platform, Pressable, Text, useWindowDimensions, View } from 'react-native';

import { mockSupabase } from '@/src/lib/mockSupabase';
import { queryKeys } from '@/src/lib/queryKeys';
import { useAppStore } from '@/src/store/appStore';

import { AskSageWindow } from '../ask-sage/AskSageWindow';
import { AppSidebar } from './AppSidebar';
import { TopBar } from './TopBar';

export const AppShell = ({ children }: PropsWithChildren) => {
  const { width } = useWindowDimensions();
  const queryClient = useQueryClient();
  const isDesktop = Platform.OS === 'web' || width >= 1024;
  const selectedSiteId = useAppStore((state) => state.selectedSiteId);
  const isMobileNavOpen = useAppStore((state) => state.isMobileNavOpen);
  const setMobileNavOpen = useAppStore((state) => state.setMobileNavOpen);

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.dashboard(selectedSiteId),
      queryFn: () => mockSupabase.getDashboardMetrics(selectedSiteId),
    });

    queryClient.prefetchQuery({
      queryKey: queryKeys.inspections(selectedSiteId),
      queryFn: async () => (await mockSupabase.listInspections(selectedSiteId)).data,
    });

    queryClient.prefetchQuery({
      queryKey: queryKeys.workItems(selectedSiteId, 'Open'),
      queryFn: async () => (await mockSupabase.listWorkItems(selectedSiteId, { filter: 'Open' })).data,
    });
  }, [queryClient, selectedSiteId]);

  useEffect(() => {
    if (isDesktop && isMobileNavOpen) {
      setMobileNavOpen(false);
    }
  }, [isDesktop, isMobileNavOpen, setMobileNavOpen]);

  return (
    <View className="flex-1 bg-[#f4f7f5]">
      <View className="flex-1 flex-row">
        {isDesktop ? <AppSidebar /> : null}

        <View className="flex-1">
          <TopBar isDesktop={isDesktop} onOpenNav={() => setMobileNavOpen(true)} />
          <View className="flex-1 px-4 pb-4 pt-4">{children}</View>
        </View>
      </View>

      {!isDesktop && isMobileNavOpen ? (
        <View className="absolute inset-0 z-50 flex-row bg-black/35">
          <AppSidebar compact onNavigate={() => setMobileNavOpen(false)} />
          <Pressable className="flex-1" onPress={() => setMobileNavOpen(false)}>
            <Text />
          </Pressable>
        </View>
      ) : null}

      <AskSageWindow />
    </View>
  );
};
