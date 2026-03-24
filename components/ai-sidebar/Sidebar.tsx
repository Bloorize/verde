import { SidebarProvider } from './SidebarContext';
import SidebarContent from './SidebarContent';
import type { SidebarMenuGroup } from './types';

interface SidebarProps {
  menuItems: SidebarMenuGroup[];
  activePath: string;
  onItemClick: (route: string) => void;
}

export default function Sidebar({ menuItems, activePath, onItemClick }: SidebarProps) {
  return (
    <SidebarProvider>
      <SidebarContent menuItems={menuItems} activePath={activePath} onItemClick={onItemClick} />
    </SidebarProvider>
  );
}
