import { Asset } from 'expo-asset';
import { X } from 'lucide-react';

import { useSidebar } from './SidebarContext';

export default function MobileHeader() {
  const { closeMobileMenu } = useSidebar();
  const logoUri = Asset.fromModule(require('../../assets/images/verde_logo.png')).uri;

  return (
    <div className="ai-mobile-header">
      <div className="ai-mobile-brand">
        <img src={logoUri} alt="HeySage logo" className="ai-mobile-brand-logo" />
        <span className="ai-brand-title">HeySage</span>
      </div>
      <button onClick={closeMobileMenu} className="ai-collapse-btn" aria-label="Close mobile menu">
        <X size={16} />
      </button>
    </div>
  );
}
