import { PropsWithChildren } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { useLocalizedText } from '@/src/hooks/useLocalizedText';

interface PageScaffoldProps {
  title: string;
  description: string;
}

export const PageScaffold = ({ title, description, children }: PropsWithChildren<PageScaffoldProps>) => {
  const localizedTitle = useLocalizedText(title);
  const localizedDescription = useLocalizedText(description);

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
      <Text className="text-xl font-bold text-slate-900">{localizedTitle}</Text>
      <Text className="mb-4 text-sm text-slate-500">{localizedDescription}</Text>
      <View className="gap-3">{children}</View>
    </ScrollView>
  );
};
