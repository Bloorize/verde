import { PropsWithChildren } from 'react';
import { View, ViewProps } from 'react-native';

export const PrototypeSectionCard = ({
  children,
  className,
  ...rest
}: PropsWithChildren<ViewProps & { className?: string }>) => {
  return (
    <View className={`rounded-lg border border-brand-100 bg-white p-4 ${className ?? ''}`.trim()} {...rest}>
      {children}
    </View>
  );
};
