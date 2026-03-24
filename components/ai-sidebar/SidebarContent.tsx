import { motion } from 'framer-motion';

import MobileHeader from './MobileHeader';
import SidebarHeader from './SidebarHeader';
import SidebarMenu from './SidebarMenu';
import SidebarProfile from './SidebarProfile';
import SidebarSearch from './SidebarSearch';
import { useSidebar } from './SidebarContext';
import type { SidebarMenuGroup } from './types';

import './sidebar.css';

interface SidebarContentProps {
  menuItems: SidebarMenuGroup[];
  activePath: string;
  onItemClick: (route: string) => void;
}

export default function SidebarContent({ menuItems, activePath, onItemClick }: SidebarContentProps) {
  const { isCollapsed } = useSidebar();

  return (
    <motion.div
      initial={false}
      animate={{ width: isCollapsed ? '5rem' : '18rem' }}
      transition={{ width: { type: 'spring', stiffness: 280, damping: 30 } }}
      className="ai-sidebar-shell"
    >
      <aside className="ai-sidebar">
        <MobileHeader />
        <SidebarHeader />
        <SidebarSearch />
        <SidebarMenu menuItems={menuItems} activePath={activePath} onItemClick={onItemClick} />
        <SidebarProfile />
      </aside>
    </motion.div>
  );
}
