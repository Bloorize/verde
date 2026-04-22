import { Text, View } from 'react-native';

import { useLocalizedText } from '@/src/hooks/useLocalizedText';

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

export const Badge = ({ label, tone = 'neutral' }: BadgeProps) => {
  const localizedLabel = useLocalizedText(label);

  return (
    <View className={`self-start rounded px-2.5 py-1 ${toneClass[tone]}`}>
      <Text className="text-xs font-semibold">{localizedLabel}</Text>
    </View>
  );
};
