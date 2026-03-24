import { AnimatePresence, motion } from 'framer-motion';
import { Asset } from 'expo-asset';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';

import { useSidebar } from './SidebarContext';

export default function SidebarHeader() {
  const { isCollapsed, toggleCollapse } = useSidebar();
  const logoUri = Asset.fromModule(
    isCollapsed ? require('../../assets/images/verde_logo_square.png') : require('../../assets/images/verde_logo.png'),
  ).uri;

  return (
    <div className={`ai-header ${isCollapsed ? 'is-collapsed' : ''}`}>
      <div className="ai-brand">
        <div className={`ai-brand-logo-wrap ${isCollapsed ? 'is-collapsed' : ''}`}>
          <img src={logoUri} alt="HeySage logo" className="ai-brand-logo" />
        </div>

        <AnimatePresence initial={false}>
          {!isCollapsed && (
            <motion.div
              key="title"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.16 }}
              className="ai-brand-copy"
            >
              <p className="ai-brand-title">HeySage</p>
              <p className="ai-brand-subtitle">Enterprise Operations Platform</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <button onClick={toggleCollapse} className="ai-collapse-btn" aria-label="Toggle sidebar">
        {isCollapsed ? <PanelLeftOpen size={13} /> : <PanelLeftClose size={13} />}
      </button>
    </div>
  );
}
