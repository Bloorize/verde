import { PropsWithChildren } from 'react';
import { ScrollView, View } from 'react-native';

interface PrototypePageShellProps {
  testID?: string;
}

export const PrototypePageShell = ({ children, testID }: PropsWithChildren<PrototypePageShellProps>) => {
  return (
    <ScrollView
      testID={testID}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="w-full self-center" style={{ maxWidth: 880 }}>
        {children}
      </View>
    </ScrollView>
  );
};
