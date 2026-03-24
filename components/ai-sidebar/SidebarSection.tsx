import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

import { useSidebar } from './SidebarContext';
import SidebarIcon, { SidebarBadge } from './SidebarUtils';
import type { SidebarMenuItem } from './types';

interface SidebarSectionProps {
  item: SidebarMenuItem;
  activePath: string;
  onItemClick: (route: string) => void;
}

const isRouteActive = (itemRoute: string | undefined, activePath: string) => {
  if (!itemRoute) return false;
  if (itemRoute === activePath) return true;
  return activePath.startsWith(`${itemRoute}/`);
};

export default function SidebarSection({ item, activePath, onItemClick }: SidebarSectionProps) {
  const { isCollapsed, openSubmenus, toggleSubmenu } = useSidebar();

  const hasChildren = Boolean(item.children?.length);
  const isOpen = Boolean(openSubmenus[item.name]);
  const isActive = isRouteActive(item.route, activePath);

  const handleClick = () => {
    console.log(`[AI Sidebar] Clicked: ${item.name}`);

    if (item.route) {
      onItemClick(item.route);
    }

    if (hasChildren) {
      toggleSubmenu(item.name);
    }
  };

  return (
    <li>
      <button onClick={handleClick} className={`ai-menu-item ${isCollapsed ? 'is-collapsed' : ''} ${isActive ? 'is-active' : ''}`}>
        <SidebarIcon Icon={item.icon} color="currentColor" />

        <AnimatePresence initial={false}>
          {!isCollapsed && (
            <motion.span
              key="label"
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -6 }}
              transition={{ duration: 0.15 }}
              className="ai-menu-item-label-wrap"
            >
              <span className="ai-menu-item-label">{item.name}</span>
              <span className="ai-menu-item-right">
                {item.badge ? <SidebarBadge value={item.badge} /> : null}
                {hasChildren ? (
                  <motion.span className="ai-chevron" animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronRight size={14} />
                  </motion.span>
                ) : null}
              </span>
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      <AnimatePresence initial={false}>
        {!isCollapsed && hasChildren && isOpen ? (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="ai-submenu"
          >
            {item.children?.map((child) => (
              <li key={child.name}>
                <button
                  onClick={() => {
                    console.log(`[AI Sidebar] Clicked: ${item.name} > ${child.name}`);
                    onItemClick(child.route);
                  }}
                  className="ai-submenu-item"
                >
                  {child.name}
                </button>
              </li>
            ))}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </li>
  );
}
