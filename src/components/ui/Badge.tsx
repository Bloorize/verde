import { Text, View } from 'react-native';

interface BadgeProps {
  label: string;
  tone?: 'neutral' | 'success' | 'warning' | 'danger';
}

const toneClass: Record<NonNullable<BadgeProps['tone']>, string> = {
  neutral: 'bg-slate-100 text-slate-700',
  success: 'bg-brand-100 text-brand-700',
  warning: 'bg-amber-100 text-amber-700',
  danger: 'bg-rose-100 text-rose-700',
};

export const Badge = ({ label, tone = 'neutral' }: BadgeProps) => (
  <View className={`self-start rounded-full px-2.5 py-1 ${toneClass[tone]}`}>
    <Text className="text-xs font-semibold">{label}</Text>
  </View>
);
