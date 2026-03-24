import type { LucideIcon } from 'lucide-react';

type SidebarIconProps = {
  Icon: LucideIcon;
  color?: string;
  size?: number;
  className?: string;
};

export default function SidebarIcon({ Icon, color = 'currentColor', size = 18, className = '' }: SidebarIconProps) {
  return <Icon size={size} color={color} className={className} />;
}

export function SidebarBadge({ value }: { value: string }) {
  return <span className="ai-badge">{value}</span>;
}
