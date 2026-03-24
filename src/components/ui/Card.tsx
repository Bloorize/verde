import { PropsWithChildren } from 'react';
import { View, ViewProps } from 'react-native';

export const Card = ({ children, style, ...rest }: PropsWithChildren<ViewProps>) => {
  return (
    <View
      className="rounded-2xl border border-brand-100 bg-white p-4"
      style={[
        {
          shadowColor: '#0d2118',
          shadowOpacity: 0.08,
          shadowRadius: 14,
          shadowOffset: { width: 0, height: 6 },
          elevation: 3,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
};
