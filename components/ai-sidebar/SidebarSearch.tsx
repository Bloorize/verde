import { AnimatePresence, motion } from 'framer-motion';
import { Search } from 'lucide-react';

import { useSidebar } from './SidebarContext';

export default function SidebarSearch() {
  const { isCollapsed } = useSidebar();

  return (
    <div className="ai-search-wrap">
      <AnimatePresence initial={false} mode="wait">
        {isCollapsed ? (
          <motion.button
            key="search-icon"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="ai-search-icon-only"
            aria-label="Search"
          >
            <Search size={16} />
          </motion.button>
        ) : (
          <motion.div
            key="search-input"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="ai-search-input-wrap"
          >
            <Search size={16} className="ai-search-leading-icon" />
            <input type="text" placeholder="Search navigation" className="ai-search-input" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
