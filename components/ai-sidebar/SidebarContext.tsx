import React, { createContext, useContext, useEffect, useState } from 'react';

type SidebarContextType = {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  isMobileOpen: boolean;
  setIsMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openSubmenus: Record<string, boolean>;
  toggleCollapse: () => void;
  closeMobileMenu: () => void;
  toggleSubmenu: (name: string) => void;
};

const SidebarContext = createContext<SidebarContextType | null>(null);

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined' && window.innerWidth >= 768) {
        setIsMobileOpen(false);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  const toggleCollapse = () => setIsCollapsed((prev) => !prev);
  const closeMobileMenu = () => setIsMobileOpen(false);

  const toggleSubmenu = (name: string) => {
    if (isCollapsed) {
      setIsCollapsed(false);
    }
    setOpenSubmenus((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <SidebarContext.Provider
      value={{
        isCollapsed,
        setIsCollapsed,
        isMobileOpen,
        setIsMobileOpen,
        openSubmenus,
        toggleCollapse,
        closeMobileMenu,
        toggleSubmenu,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within SidebarProvider');
  }
  return context;
};
