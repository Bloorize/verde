import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { SupportedLanguage } from '@/src/lib/language';
import { mockSupabase } from '@/src/lib/mockSupabase';
import { queryKeys } from '@/src/lib/queryKeys';
import { useAppStore } from '@/src/store/appStore';

const languageLabels: Record<SupportedLanguage, { native: string; flag: string }> = {
  en: { native: 'English', flag: '🇺🇸' },
  es: { native: 'Español', flag: '🇪🇸' },
};

interface TopBarProps {
  onOpenNav?: () => void;
  isDesktop: boolean;
}

export const TopBar = ({ onOpenNav, isDesktop }: TopBarProps) => {
  const router = useRouter();
  const [siteMenuOpen, setSiteMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const selectedSiteId = useAppStore((state) => state.selectedSiteId);
  const setSelectedSiteId = useAppStore((state) => state.setSelectedSiteId);
  const currentUser = useAppStore((state) => state.currentUser);
  const notificationCount = useAppStore((state) => state.notificationCount);
  const setAskSageOpen = useAppStore((state) => state.setAskSageOpen);
  const language = useAppStore((state) => state.language);
  const setLanguage = useAppStore((state) => state.setLanguage);

  const sitesQuery = useQuery({
    queryKey: queryKeys.sites(),
    queryFn: () => mockSupabase.listSites(),
  });

  const selectedSite = sitesQuery.data?.find((site) => site.id === selectedSiteId);

  return (
    <View className="z-20 border-b border-brand-100 bg-white px-4 py-3">
      <View className="flex-row items-center justify-between gap-3">
        <View className="flex-row items-center gap-3">
          {!isDesktop ? (
            <Pressable onPress={onOpenNav} className="h-10 w-10 items-center justify-center rounded-lg border border-brand-200">
              <Ionicons name="menu" size={20} color="#1d4d38" />
            </Pressable>
          ) : null}

          <View>
            <Pressable
              onPress={() => {
                setSiteMenuOpen((prev) => !prev);
                setLangMenuOpen(false);
              }}
              className="min-h-10 flex-row items-center gap-2 rounded-lg border border-brand-200 bg-brand-50 px-3"
            >
              <Text className="text-sm font-semibold text-brand-800">{selectedSite?.name ?? 'Select Site'}</Text>
              <Ionicons name="chevron-down" size={16} color="#245f45" />
            </Pressable>

            {siteMenuOpen ? (
              <View className="absolute left-0 top-11 w-72 rounded-lg border border-brand-100 bg-white p-2 shadow-sm">
                {sitesQuery.data?.map((site) => (
                  <Pressable
                    key={site.id}
                    onPress={() => {
                      setSelectedSiteId(site.id);
                      setSiteMenuOpen(false);
                    }}
                    className={`rounded-lg px-3 py-2 ${site.id === selectedSiteId ? 'bg-brand-50' : ''}`}
                  >
                    <Text className="text-sm font-semibold text-slate-700">{site.name}</Text>
                  </Pressable>
                ))}
              </View>
            ) : null}
          </View>
        </View>

        <View className="flex-row items-center gap-2">
          <View>
            <Pressable
              onPress={() => {
                setLangMenuOpen((prev) => !prev);
                setSiteMenuOpen(false);
              }}
              className="h-10 w-10 items-center justify-center rounded-lg border border-brand-200"
            >
              <Ionicons name="language-outline" size={19} color="#245f45" />
            </Pressable>

            {langMenuOpen ? (
              <View className="absolute right-0 top-11 w-44 rounded-lg border border-brand-100 bg-white p-2 shadow-sm">
                {(Object.keys(languageLabels) as SupportedLanguage[]).map((lang) => (
                  <Pressable
                    key={lang}
                    onPress={() => {
                      void setLanguage(lang);
                      setLangMenuOpen(false);
                    }}
                    className={`flex-row items-center gap-2 rounded-lg px-3 py-2 ${lang === language ? 'bg-brand-50' : ''}`}
                  >
                    <Text className="text-sm">{languageLabels[lang].flag}</Text>
                    <Text className={`text-sm font-semibold ${lang === language ? 'text-brand-700' : 'text-slate-700'}`}>
                      {languageLabels[lang].native}
                    </Text>
                    {lang === language ? <Ionicons name="checkmark" size={14} color="#245f45" /> : null}
                  </Pressable>
                ))}
              </View>
            ) : null}
          </View>

          <Pressable className="h-10 w-10 items-center justify-center rounded-lg border border-brand-200">
            <Ionicons name="notifications-outline" size={19} color="#245f45" />
            {notificationCount > 0 ? (
              <View className="absolute right-1 top-1 h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1">
                <Text className="text-[10px] font-bold text-white">{notificationCount}</Text>
              </View>
            ) : null}
          </Pressable>

          <Pressable
            onPress={() => setAskSageOpen(true)}
            className="min-h-10 flex-row items-center gap-1 rounded-lg border border-brand-200 bg-brand-50 px-3"
          >
            <Ionicons name="sparkles-outline" size={16} color="#1f5b41" />
            <Text className="text-sm font-semibold text-brand-800">Ask Sage</Text>
          </Pressable>

          <Pressable
            onPress={() => router.push('/inspect/new/setup')}
            className="min-h-10 flex-row items-center gap-1 rounded-lg bg-brand-600 px-3"
          >
            <Ionicons name="add-circle-outline" size={16} color="#fff" />
            <Text className="text-sm font-semibold text-white">New Inspection</Text>
          </Pressable>

          <Pressable onPress={() => router.push('/profile')} className="h-10 w-10 items-center justify-center rounded-lg bg-brand-800">
            <Text className="text-xs font-bold text-white">{currentUser.avatar}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};
