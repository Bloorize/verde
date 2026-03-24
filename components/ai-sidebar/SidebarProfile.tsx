import { AnimatePresence, motion } from 'framer-motion';
import { ChevronUp, LogOut, Settings } from 'lucide-react';

import { useSidebar } from './SidebarContext';

export default function SidebarProfile() {
  const { isCollapsed } = useSidebar();

  return (
    <div className="ai-profile-wrap">
      <button onClick={() => console.log('[AI Sidebar] Clicked: Profile')} className="ai-profile-main">
        <div className="ai-avatar">BD</div>

        <AnimatePresence initial={false}>
          {!isCollapsed && (
            <motion.div
              key="profile-content"
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -6 }}
              transition={{ duration: 0.15 }}
              className="ai-menu-item-label-wrap"
            >
              <div className="ai-profile-copy">
                <p className="ai-profile-name">Brandon Dastrup</p>
                <p className="ai-profile-role">Chief Operating Officer</p>
              </div>
              <ChevronUp size={14} className="ai-chevron" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      <AnimatePresence initial={false}>
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className="ai-profile-actions"
          >
            <button onClick={() => console.log('[AI Sidebar] Clicked: Settings')} className="ai-profile-action-btn">
              <Settings size={13} />
              Settings
            </button>
            <button onClick={() => console.log('[AI Sidebar] Clicked: Log Out')} className="ai-profile-action-btn">
              <LogOut size={13} />
              Log Out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
