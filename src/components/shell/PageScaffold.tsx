import { PropsWithChildren } from 'react';
import { ScrollView, Text, View } from 'react-native';

interface PageScaffoldProps {
  title: string;
  description: string;
}

export const PageScaffold = ({ title, description, children }: PropsWithChildren<PageScaffoldProps>) => {
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
      <Text className="text-xl font-bold text-slate-900">{title}</Text>
      <Text className="mb-4 text-sm text-slate-500">{description}</Text>
      <View className="gap-3">{children}</View>
    </ScrollView>
  );
};
