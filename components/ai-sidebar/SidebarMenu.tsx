import { AnimatePresence, motion } from 'framer-motion';

import { useSidebar } from './SidebarContext';
import SidebarSection from './SidebarSection';
import type { SidebarMenuGroup } from './types';

interface SidebarMenuProps {
  menuItems: SidebarMenuGroup[];
  activePath: string;
  onItemClick: (route: string) => void;
}

export default function SidebarMenu({ menuItems, activePath, onItemClick }: SidebarMenuProps) {
  const { isCollapsed } = useSidebar();

  return (
    <nav className="ai-menu">
      {menuItems.map((group) => (
        <section className="ai-menu-group" key={group.title}>
          <AnimatePresence initial={false}>
            {!isCollapsed && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.16 }}
                className="ai-group-title"
              >
                {group.title}
              </motion.p>
            )}
          </AnimatePresence>

          <ul className="ai-group-list">
            {group.list.map((item) => (
              <SidebarSection key={item.name} item={item} activePath={activePath} onItemClick={onItemClick} />
            ))}
          </ul>
        </section>
      ))}
    </nav>
  );
}
