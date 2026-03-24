import { Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import { Image, Pressable, Text, View } from 'react-native';

import { useAppStore } from '@/src/store/appStore';

const primaryNav = [
  { label: 'Home', route: '/home', icon: 'home-outline' },
  { label: 'Inspect', route: '/inspect', icon: 'checkmark-done-outline' },
  { label: 'Cases', route: '/cases', icon: 'folder-open-outline' },
  { label: 'Work Items', route: '/work-items', icon: 'construct-outline' },
  { label: 'Team', route: '/team', icon: 'people-outline' },
  { label: 'Analytics', route: '/analytics', icon: 'stats-chart-outline' },
  { label: 'Settings', route: '/settings', icon: 'settings-outline' },
] as const;

const secondaryNav = [
  { label: 'Ask Sage', route: '/ask-sage', icon: 'sparkles-outline' },
  { label: 'Surveys', route: '/surveys', icon: 'clipboard-outline' },
  { label: 'Documents', route: '/documents', icon: 'document-text-outline' },
  { label: 'Service Coverage', route: '/service-coverage', icon: 'qr-code-outline' },
  { label: 'Profile', route: '/profile', icon: 'person-circle-outline' },
  { label: 'Safety Portal', route: '/public/safety', icon: 'shield-checkmark-outline' },
] as const;

interface AppSidebarProps {
  compact?: boolean;
  onNavigate?: () => void;
}

export const AppSidebar = ({ compact = false, onNavigate }: AppSidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const setAskSageOpen = useAppStore((state) => state.setAskSageOpen);

  const renderNavItem = (item: { label: string; route: string; icon: keyof typeof Ionicons.glyphMap }) => {
    const active = pathname === item.route || pathname.startsWith(`${item.route}/`);
    return (
      <Pressable
        key={item.route}
        onPress={() => {
          if (item.route === '/ask-sage') {
            setAskSageOpen(true);
          } else {
            router.push(item.route as any);
          }
          onNavigate?.();
        }}
        className={`min-h-11 flex-row items-center gap-3 rounded-xl px-3 ${active ? 'bg-brand-700' : 'bg-transparent'}`}
      >
        <Ionicons name={item.icon} size={18} color={active ? '#ffffff' : '#c3d7cc'} />
        <Text className={`text-sm font-semibold ${active ? 'text-white' : 'text-brand-100'}`}>{item.label}</Text>
      </Pressable>
    );
  };

  return (
    <View className={`bg-brand-900 ${compact ? 'w-72' : 'w-64'} px-4 py-5`}>
      <View className="mb-6 flex-row items-center gap-3 px-2">
        <View className="h-10 w-14 items-center justify-center">
          <Image source={require('../../../assets/ruxton_logo_clear.png')} style={{ width: 48, height: 30 }} resizeMode="contain" />
        </View>
        <View>
          <Text className="text-base font-bold text-white">HeySage</Text>
          <Text className="text-xs text-brand-200">Enterprise Operations Platform</Text>
        </View>
      </View>

      <View className="gap-1">{primaryNav.map(renderNavItem)}</View>

      <View className="my-4 h-px bg-brand-700" />

      <View className="gap-1">{secondaryNav.map(renderNavItem)}</View>
    </View>
  );
};
