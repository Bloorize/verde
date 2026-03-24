import AISidebar from '@/components/ai-sidebar/Sidebar';
import type { SidebarMenuGroup } from '@/components/ai-sidebar/types';
import { usePathname, useRouter } from 'expo-router';
import {
  BarChart3,
  Briefcase,
  ClipboardCheck,
  FileText,
  FolderOpen,
  Home,
  QrCode,
  Settings,
  ShieldCheck,
  Sparkles,
  UserCircle2,
  Users,
} from 'lucide-react';

import { useAppStore } from '@/src/store/appStore';

interface AppSidebarProps {
  compact?: boolean;
  onNavigate?: () => void;
}

const MENU_ITEMS: SidebarMenuGroup[] = [
  {
    title: 'Main',
    list: [
      { name: 'Home', route: '/home', icon: Home },
      { name: 'Inspect', route: '/inspect', icon: ClipboardCheck },
      { name: 'Cases', route: '/cases', icon: FolderOpen },
      { name: 'Work Items', route: '/work-items', icon: Briefcase },
      { name: 'Team', route: '/team', icon: Users },
      { name: 'Analytics', route: '/analytics', icon: BarChart3 },
      { name: 'Settings', route: '/settings', icon: Settings },
    ],
  },
  {
    title: 'Workspace',
    list: [
      { name: 'Ask Sage', route: '/ask-sage', icon: Sparkles },
      { name: 'Surveys', route: '/surveys', icon: ClipboardCheck },
      { name: 'Documents', route: '/documents', icon: FileText },
      { name: 'Service Coverage', route: '/service-coverage', icon: QrCode },
      { name: 'Profile', route: '/profile', icon: UserCircle2 },
      { name: 'Safety Portal', route: '/public/safety', icon: ShieldCheck },
    ],
  },
];

export const AppSidebar = ({ onNavigate }: AppSidebarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const setAskSageOpen = useAppStore((state) => state.setAskSageOpen);

  return (
    <div style={{ display: 'flex', flexShrink: 0, minHeight: '100vh' }}>
      <AISidebar
        menuItems={MENU_ITEMS}
        activePath={pathname}
        onItemClick={(route) => {
          if (route === '/ask-sage') {
            setAskSageOpen(true);
          } else {
            router.push(route as any);
          }
          onNavigate?.();
        }}
      />
    </div>
  );
};
