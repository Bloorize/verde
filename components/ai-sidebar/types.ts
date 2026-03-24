import type { LucideIcon } from 'lucide-react';

export type SidebarMenuChild = {
  name: string;
  route: string;
};

export type SidebarMenuItem = {
  name: string;
  icon: LucideIcon;
  route?: string;
  badge?: string;
  children?: SidebarMenuChild[];
};

export type SidebarMenuGroup = {
  title: string;
  list: SidebarMenuItem[];
};
