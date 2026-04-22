import { Text, View } from 'react-native';

import { Badge } from '@/src/components/ui/Badge';
import { useLocalizedText } from '@/src/hooks/useLocalizedText';

interface PrototypeHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
}

export const PrototypeHeader = ({ title, subtitle, badge }: PrototypeHeaderProps) => {
  const localizedTitle = useLocalizedText(title);
  const localizedSubtitle = useLocalizedText(subtitle);
  const localizedBadge = useLocalizedText(badge);

  return (
    <View className="gap-2">
      {badge ? <Badge label={localizedBadge} /> : null}
      <Text className="text-2xl font-bold text-slate-900">{localizedTitle}</Text>
      {subtitle ? <Text className="text-sm leading-5 text-slate-600">{localizedSubtitle}</Text> : null}
    </View>
  );
};
